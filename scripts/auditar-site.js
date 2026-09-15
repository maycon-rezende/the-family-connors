#!/usr/bin/env node

const fs = require('node:fs');
const path = require('node:path');

const root = process.cwd();
const ignored = new Set(['.git', 'node_modules']);

function walk(directory) {
  const result = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (ignored.has(entry.name)) continue;
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) result.push(...walk(target));
    else if (entry.isFile() && entry.name.toLowerCase().endsWith('.html')) result.push(target);
  }
  return result;
}

const pages = walk(root);
const report = {
  pages: pages.length,
  missingLang: [],
  missingViewport: [],
  missingDescription: [],
  imagesWithoutAlt: [],
  emptyAltWarnings: [],
  emptyHrefs: [],
  missingReferences: []
};

const external = /^(?:https?:|mailto:|tel:|#|data:|javascript:|\/\/|\$\{)/i;
const references = /(?:href|src|poster)=["']([^"']+)["']/gi;

for (const file of pages) {
  const relative = path.relative(root, file).replaceAll(path.sep, '/');
  const html = fs.readFileSync(file, 'utf8');
  if (!/<html\b[^>]*\blang=["'][^"']+["']/i.test(html)) report.missingLang.push(relative);
  if (!/<meta\b[^>]*\bname=["']viewport["']/i.test(html)) report.missingViewport.push(relative);
  if (!/<meta\b[^>]*\bname=["']description["']/i.test(html)) report.missingDescription.push(relative);

  for (const match of html.matchAll(/<img\b[^>]*>/gi)) {
    if (!/\balt=["']/i.test(match[0])) report.imagesWithoutAlt.push(relative);
    else if (/\balt=["']\s*["']/i.test(match[0])) report.emptyAltWarnings.push(`${relative}: ${match[0]}`);
  }
  for (const match of html.matchAll(/<a\b[^>]*\bhref=["']\s*["']/gi)) {
    report.emptyHrefs.push(relative);
  }
  for (const match of html.matchAll(references)) {
    const value = match[1].split(/[?#]/, 1)[0].replaceAll('&amp;', '&');
    if (!value || external.test(value)) continue;
    const target = path.resolve(path.dirname(file), value);
    if (!fs.existsSync(target) || !fs.statSync(target).isFile()) {
      report.missingReferences.push(`${relative} -> ${value}`);
    }
  }
}

const failures = Object.entries(report).filter(([key, value]) => !['pages', 'emptyAltWarnings'].includes(key) && value.length);
console.log(JSON.stringify(report, null, 2));
if (failures.length) process.exitCode = 1;
