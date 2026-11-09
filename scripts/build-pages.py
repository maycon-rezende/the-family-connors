#!/usr/bin/env python3
"""Prepare a compact GitHub Pages artifact without changing source assets."""

from __future__ import annotations

import os
import re
import shutil
import subprocess
import sys
from pathlib import Path, PurePosixPath
from urllib.parse import quote

from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "_site"
MAX_SITE_BYTES = 900 * 1024 * 1024
TEXT_SUFFIXES = {".html", ".css", ".js", ".mjs", ".json", ".svg", ".xml", ".webmanifest", ".map"}
EXCLUDED_PREFIXES = (
    ".git/",
    ".github/",
    ".vscode/",
    ".agents/",
    ".codex-attachments/",
    "resumo-do-projeto/",
    "scripts/",
)
EXCLUDED_FILES = {
    ".gitattributes",
    ".gitignore",
    ".prettierignore",
    ".prettierrc.json",
    "README.md",
    "server.js",
    "error.log",
}


def tracked_paths() -> list[Path]:
    output = subprocess.check_output(["git", "ls-files", "-z"], cwd=ROOT)
    result: list[Path] = []
    for raw_path in output.split(b"\0"):
        if not raw_path:
            continue
        relative = os.fsdecode(raw_path).replace("\\", "/")
        if relative in EXCLUDED_FILES or relative.startswith(EXCLUDED_PREFIXES):
            continue
        source = ROOT / Path(relative)
        if source.is_file():
            result.append(source)
    return result


def relative_posix(path: Path) -> str:
    return path.relative_to(ROOT).as_posix()


def optimize_png(source: Path, target: Path, webp_target: Path) -> bool:
    """Write a high-quality WebP beside the copied PNG; keep PNG if it wins."""
    try:
        with Image.open(source) as opened:
            if getattr(opened, "n_frames", 1) > 1:
                return False  # Keep animated PNGs unchanged.

            icc_profile = opened.info.get("icc_profile")
            has_alpha = "A" in opened.getbands() or "transparency" in opened.info
            source_is_palette = opened.mode in {"1", "P"}
            converted = opened.convert("RGBA" if has_alpha else "RGB")
            converted.save(
                webp_target,
                format="WEBP",
                quality=88,
                method=6,
                lossless=source_is_palette,
                alpha_quality=100,
                icc_profile=icc_profile,
            )

        if webp_target.stat().st_size >= target.stat().st_size:
            webp_target.unlink(missing_ok=True)
            return False
        target.unlink()
        return True
    except Exception as exc:  # Preserve an original if an image cannot be converted.
        webp_target.unlink(missing_ok=True)
        print(f"WARN: kept {relative_posix(source)} ({exc})", file=sys.stderr)
        return False


def reference_variants(asset: str, text_file: Path) -> set[str]:
    variants = {asset, f"./{asset}", f"/{asset}"}
    try:
        relative = os.path.relpath(ROOT / Path(asset), text_file.parent).replace("\\", "/")
        variants.update({relative, quote(relative, safe="/-_.~")})
    except ValueError:
        pass
    variants.add(quote(asset, safe="/-_.~"))
    return {variant for variant in variants if variant and ".png" in variant.lower()}


def rewrite_references(site_files: list[Path], converted_assets: dict[str, str]) -> int:
    assets_by_name: dict[str, list[str]] = {}
    for asset in converted_assets:
        assets_by_name.setdefault(PurePosixPath(asset).name.lower(), []).append(asset)

    total_replacements = 0
    for site_file in site_files:
        if site_file.suffix.lower() not in TEXT_SUFFIXES:
            continue
        try:
            original = site_file.read_text(encoding="utf-8")
        except (UnicodeDecodeError, OSError):
            continue

        updated = original
        source_rel = relative_posix(ROOT / site_file.relative_to(OUTPUT))
        replacements: dict[str, str] = {}
        for asset, webp_asset in converted_assets.items():
            for variant in reference_variants(asset, ROOT / Path(source_rel)):
                if variant == f"/{asset}":
                    replacements[variant] = f"/{webp_asset}"
                elif variant == f"./{asset}":
                    replacements[variant] = f"./{webp_asset}"
                elif variant == quote(asset, safe="/-_.~"):
                    replacements[variant] = quote(webp_asset, safe="/-_.~")
                elif variant == asset:
                    replacements[variant] = webp_asset
                else:
                    # Relative stylesheet references must remain relative to the stylesheet.
                    relative_webp = os.path.relpath(ROOT / Path(webp_asset), (ROOT / Path(source_rel)).parent).replace("\\", "/")
                    replacements[variant] = quote(relative_webp, safe="/-_.~") if "%" in variant else relative_webp

        # Attribute selectors such as [src$="/portrait.png"] identify a unique file by basename.
        for basename, matches in assets_by_name.items():
            if len(matches) == 1:
                asset = matches[0]
                old_name = PurePosixPath(asset).name
                new_name = PurePosixPath(converted_assets[asset]).name
                if old_name.lower() in updated.lower() and re.search(
                    r"(?:src|href)\s*\$?=\s*[\"'][^\"']*" + re.escape(old_name) + r"[\"']",
                    updated,
                    re.I,
                ):
                    replacements[old_name] = new_name

        # Replace longest paths first so a basename cannot preempt its full path.
        replacement_by_lower: dict[str, str] = {}
        for old in sorted(replacements, key=len, reverse=True):
            replacement_by_lower.setdefault(old.lower(), replacements[old])
        if replacement_by_lower:
            pattern = re.compile(
                "|".join(re.escape(old) for old in replacement_by_lower),
                re.IGNORECASE,
            )
            updated, count = pattern.subn(
                lambda match: replacement_by_lower[match.group(0).lower()], updated
            )
            total_replacements += count
        if updated != original:
            site_file.write_text(updated, encoding="utf-8", newline="")
    return total_replacements


def main() -> int:
    if OUTPUT.exists():
        shutil.rmtree(OUTPUT)
    OUTPUT.mkdir(parents=True)

    sources = tracked_paths()
    for source in sources:
        target = OUTPUT / Path(relative_posix(source))
        target.parent.mkdir(parents=True, exist_ok=True)
        if source.suffix.lower() != ".png":
            shutil.copy2(source, target)

    png_sources = [source for source in sources if source.suffix.lower() == ".png"]
    converted_assets: dict[str, str] = {}
    reserved_names = {relative_posix(path).lower() for path in sources}
    source_total = 0
    webp_total = 0
    for index, source in enumerate(png_sources, start=1):
        target = OUTPUT / Path(relative_posix(source))
        target.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(source, target)
        source_total += source.stat().st_size
        asset = relative_posix(source)
        candidate = PurePosixPath(asset).with_suffix(".webp")
        webp_asset = candidate.as_posix()
        if webp_asset.lower() in reserved_names:
            candidate = candidate.with_name(candidate.stem + "-pages.webp")
            suffix = 2
            while candidate.as_posix().lower() in reserved_names:
                candidate = candidate.with_name(candidate.stem.rsplit("-", 1)[0] + f"-{suffix}.webp")
                suffix += 1
            webp_asset = candidate.as_posix()
        reserved_names.add(webp_asset.lower())
        webp_target = OUTPUT / Path(webp_asset)
        webp_target.parent.mkdir(parents=True, exist_ok=True)
        if optimize_png(source, target, webp_target):
            converted_assets[asset] = webp_asset
            webp_total += webp_target.stat().st_size
        if index % 100 == 0 or index == len(png_sources):
            print(f"Processed PNGs: {index}/{len(png_sources)}")

    site_files = [path for path in OUTPUT.rglob("*") if path.is_file()]
    replacements = rewrite_references(site_files, converted_assets)
    (OUTPUT / ".nojekyll").write_text("", encoding="utf-8")

    # Preserve local PNGs for any leftover code path that still refers to them.
    # This catches uncommon generated/template references the explicit rewrite did not match.
    content_files = [path for path in OUTPUT.rglob("*") if path.is_file() and path.suffix.lower() in TEXT_SUFFIXES]
    remaining_text = "\n".join(
        path.read_text(encoding="utf-8", errors="ignore") for path in content_files
    ).lower()
    preserved_dynamic = 0
    for asset, webp_asset in converted_assets.items():
        original = PurePosixPath(asset)
        if original.name.lower() in remaining_text or asset.lower() in remaining_text:
            webp = OUTPUT / Path(webp_asset)
            png = OUTPUT / Path(asset)
            if webp.exists() and not png.exists():
                shutil.copy2(ROOT / Path(asset), png)
                preserved_dynamic += 1

    total_bytes = sum(path.stat().st_size for path in OUTPUT.rglob("*") if path.is_file())
    print(f"PNG source size: {source_total / 1024 / 1024:.1f} MiB")
    print(f"PNG converted: {len(converted_assets)}; WebP size: {webp_total / 1024 / 1024:.1f} MiB")
    print(f"Updated image references: {replacements}")
    print(f"Kept originals for remaining references: {preserved_dynamic}")
    print(f"Pages artifact: {total_bytes / 1024 / 1024:.1f} MiB")
    if total_bytes > MAX_SITE_BYTES:
        print("ERROR: Pages artifact is above the 900 MiB safety target.", file=sys.stderr)
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
