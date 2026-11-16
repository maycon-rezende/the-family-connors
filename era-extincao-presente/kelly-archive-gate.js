(() => {
  const puzzleForm = document.querySelector("[data-vault-puzzle-form]");
  const passwordForm = document.querySelector("[data-vault-password-form]");
  const puzzleStatus = document.querySelector("[data-vault-puzzle-status]");
  const passwordStatus = document.querySelector("[data-vault-password-status]");
  const vaultPanel = document.querySelector(".vault-panel");
  const gallery = document.querySelector("[data-vault-gallery]");
  const grid = document.querySelector("[data-vault-grid]");
  const passwordInput = document.querySelector("#vault-password");
  const archiveFiles = Array.from({ length: 9 }, (_, index) => {
    const number = String(index + 1).padStart(2, "0");
    return `img-kelly/arquivo-ks09/fragmento-${number}.bin`;
  });
  const objectUrls = [];
  let unlocking = false;

  if (!puzzleForm || !passwordForm || !gallery || !grid) return;

  puzzleForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const answer = new FormData(puzzleForm).get("answer")?.toString().trim();
    if (answer !== "5") {
      puzzleStatus.textContent = "O selo não reconhece esse número. Refaça a conta entre os dois arquivos.";
      return;
    }

    puzzleStatus.textContent = "Primeira camada liberada. Falta a senha da autora.";
    puzzleForm.hidden = true;
    passwordForm.hidden = false;
    passwordInput?.focus();
  });

  passwordForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (unlocking) return;

    const password = new FormData(passwordForm).get("password")?.toString() || "";
    if (!password) return;
    unlocking = true;
    const submitButton = passwordForm.querySelector('button[type="submit"]');
    if (submitButton) submitButton.disabled = true;
    passwordStatus.textContent = "Verificando a chave criptográfica…";

    try {
      if (!window.isSecureContext || !window.crypto?.subtle) {
        throw new Error("Secure context required");
      }

      const records = await Promise.all(archiveFiles.map(async (url) => {
        const response = await fetch(url, { cache: "no-store" });
        if (!response.ok) throw new Error("Encrypted record unavailable");
        return new Uint8Array(await response.arrayBuffer());
      }));
      const firstRecord = records[0];
      const magic = new TextDecoder().decode(firstRecord.subarray(0, 4));
      if (magic !== "KLY1" || firstRecord.length <= 48) throw new Error("Invalid archive format");

      const salt = firstRecord.slice(4, 20);
      const passwordMaterial = await window.crypto.subtle.importKey(
        "raw",
        new TextEncoder().encode(password),
        "PBKDF2",
        false,
        ["deriveKey"],
      );
      const key = await window.crypto.subtle.deriveKey(
        { name: "PBKDF2", salt, iterations: 310000, hash: "SHA-256" },
        passwordMaterial,
        { name: "AES-GCM", length: 256 },
        false,
        ["decrypt"],
      );

      const clearRecords = await Promise.all(records.map(async (record) => {
        const recordMagic = new TextDecoder().decode(record.subarray(0, 4));
        const sameSalt = salt.every((value, index) => value === record[index + 4]);
        if (recordMagic !== "KLY1" || !sameSalt || record.length <= 48) {
          throw new Error("Invalid encrypted record");
        }

        const iv = record.slice(20, 32);
        const tag = record.slice(32, 48);
        const ciphertext = record.slice(48);
        const authenticatedCiphertext = new Uint8Array(ciphertext.length + tag.length);
        authenticatedCiphertext.set(ciphertext);
        authenticatedCiphertext.set(tag, ciphertext.length);
        const clear = await window.crypto.subtle.decrypt(
          { name: "AES-GCM", iv, tagLength: 128 },
          key,
          authenticatedCiphertext,
        );
        return new Blob([clear], { type: "image/jpeg" });
      }));

      clearRecords.forEach((blob, index) => {
        const url = URL.createObjectURL(blob);
        objectUrls.push(url);
        const figure = document.createElement("figure");
        const image = document.createElement("img");
        const caption = document.createElement("figcaption");
        image.src = url;
        image.alt = `Registro pessoal protegido ${String(index + 1).padStart(2, "0")}`;
        image.loading = "lazy";
        caption.textContent = `FRAGMENTO // ${String(index + 1).padStart(2, "0")}`;
        figure.append(image, caption);
        grid.append(figure);
      });

      passwordInput.value = "";
      vaultPanel.hidden = true;
      gallery.hidden = false;
      gallery.scrollIntoView({ behavior: "smooth", block: "start" });
    } catch {
      passwordStatus.textContent = "Senha incorreta ou registro indisponível. O arquivo continua selado.";
    } finally {
      unlocking = false;
      if (submitButton) submitButton.disabled = false;
    }
  });

  window.addEventListener("pagehide", () => objectUrls.forEach((url) => URL.revokeObjectURL(url)));
})();
