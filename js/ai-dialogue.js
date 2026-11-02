(() => {
  const profile = (role, avatar, glyph) => ({ role, avatar, glyph });
  const shared = {
    "Jack Connor": profile("JC-01 // COMANDO", "img-presente/personagens/jack-presente1.png", "JC"),
    "Mark Connor": profile("COMANDO TÁTICO", "img-presente/personagens/mark-presente2.png", "MC"),
    "Naomi Yagami": profile("N-05 // INTELIGÊNCIA", "img-hellsing/naomi-presente.png", "NY"),
    "Hellen Wren": profile("H-10 // INFILTRAÇÃO", "img-hellsing/hellen-presente.png", "HW"),
    "Alice Connor": profile("COMANDO MÉDICO", "img-presente/personagens/alice-presente1.png", "AC"),
    "Jully Connor": profile("FORMAÇÃO H // PRESENTE", "img-presente/personagens/jully-presente1.png", "JC"),
    "Britney Connor": profile("FORMAÇÃO H // PRESENTE", "img-presente/personagens/britney-presente1.png", "BC"),
    "Luke": profile("H-06 // CAMPO", "img-hellsing/luke-presente.png", "LK")
  };
  const profiles = {
    home_route: shared,
    home_bunker: shared,
    memorial_brian: shared,
    memorial_john: shared,
    hellsings_rota: shared,
    hellsings_bunker: shared,
    cobras: {
      "Helena “Naja” Voss": profile("COBRA-01 // AUTORIDADE MÁXIMA", "img-faccoes/cobras/helena-naja-voss.png", "HV"),
      "Silas “Cascavel” Ramires": profile("COBRA-02 // MESTRE DAS ROTAS", "img-faccoes/cobras/silas-cascavel-ramires.png", "SR")
    },
    fogo: {
      "Aurelia Cinerária Varga": profile("FIRE-01 // LIDERANÇA DO CINTURÃO", "img-faccoes/fogo/aurelia-cineraria-varga.png", "AV"),
      "Dário “Fornalha” Cruz": profile("FIRE-02 // COMANDO INDUSTRIAL", "img-faccoes/fogo/dario-fornalha-cruz.png", "DC")
    },
    sal: {
      "Samira “Maré Branca” Nasser": profile("SALT-01 // GUARDIÃ DA PRIMEIRA FONTE", "img-faccoes/sal/samira-mare-branca-nasser.png", "SN"),
      "Elias “Poço Fundo” Moura": profile("SALT-02 // GUARDIÃO DAS PROFUNDEZAS", "img-faccoes/sal/elias-poco-fundo-moura.png", "EM")
    },
    ferro: {
      "Augusto “Atlas” Ferraz": profile("IRON-01 // CONDUTOR-GERAL", "img-faccoes/ferro/augusto-atlas-ferraz.png", "AF"),
      "Mecânica do Eixo": profile("OFICINA MÓVEL // TURNO B", "", "ME")
    },
    dominus: {
      "SINAL 01": profile("ORIGEM NÃO ATRIBUÍDA", "", "01"),
      "SINAL 02": profile("ORIGEM NÃO ATRIBUÍDA", "", "02")
    }
  };

  function nowTime() {
    return new Intl.DateTimeFormat("pt-BR", { hour: "2-digit", minute: "2-digit", hour12: false }).format(new Date());
  }

  function getHistory(feed) {
    return [...feed.querySelectorAll("li")]
      .filter((item) => !item.classList.contains("malha-chat-typing") && !item.classList.contains("faction-chat__message--typing") && !item.classList.contains("malha-typing"))
      .slice(-8)
      .map((item) => ({
        speaker: item.querySelector("header b")?.textContent?.trim() || "Voz do canal",
        text: item.querySelector("p")?.textContent?.trim() || ""
      }))
      .filter((message) => message.text);
  }

  function buildMessage(message, channel, kind) {
    const item = document.createElement("li");
    const person = profiles[channel]?.[message.speaker] || profile("REGISTRO DO CANAL", "", "··");
    const timeValue = nowTime();
    const avatar = document.createElement(person.avatar ? "img" : "span");
    avatar.setAttribute("aria-hidden", "true");

    if (kind === "faction") {
      item.className = "faction-chat__message faction-chat__message--ai";
      avatar.className = "faction-chat__avatar";
      if (person.avatar) { avatar.src = person.avatar; avatar.alt = ""; }
      else avatar.textContent = person.glyph;
      const bubble = document.createElement("div");
      bubble.className = "faction-chat__bubble";
      const header = document.createElement("header");
      const identity = document.createElement("div");
      const name = document.createElement("b");
      name.textContent = message.speaker;
      const role = document.createElement("small");
      role.textContent = person.role;
      const time = document.createElement("time");
      time.dateTime = timeValue;
      time.textContent = timeValue;
      identity.append(name, role);
      header.append(identity, time);
      const text = document.createElement("p");
      text.textContent = message.text;
      const origin = document.createElement("small");
      origin.className = "faction-chat__origin";
      origin.textContent = "DIÁLOGO GERADO POR IA";
      bubble.append(header, text, origin);
      item.append(avatar, bubble);
      return item;
    }

    if (kind === "hellsings") {
      item.className = "malha-message malha-message--ai";
      avatar.src = person.avatar;
      avatar.alt = "";
      const content = document.createElement("div");
      content.className = "malha-message__content";
      const header = document.createElement("header");
      const name = document.createElement("b");
      name.textContent = message.speaker;
      const role = document.createElement("span");
      role.textContent = person.role;
      const time = document.createElement("time");
      time.dateTime = timeValue;
      time.textContent = timeValue;
      header.append(name, role, time);
      const text = document.createElement("p");
      text.textContent = message.text;
      const origin = document.createElement("small");
      origin.className = "malha-ai-origin";
      origin.textContent = "DIÁLOGO GERADO POR IA";
      content.append(header, text, origin);
      item.append(avatar, content);
      return item;
    }

    item.className = "malha-chat-message malha-chat-message--ai";
    avatar.src = person.avatar;
    avatar.alt = "";
    const content = document.createElement("div");
    const header = document.createElement("header");
    const name = document.createElement("b");
    name.textContent = message.speaker;
    const time = document.createElement("time");
    time.dateTime = timeValue;
    time.textContent = timeValue;
    header.append(name, time);
    const text = document.createElement("p");
    text.textContent = message.text;
    const origin = document.createElement("small");
    origin.className = "malha-ai-origin";
    origin.textContent = "DIÁLOGO GERADO POR IA";
    content.append(header, text, origin);
    item.append(avatar, content);
    return item;
  }

  function attachControl({ root, container, feed, channel, kind, statusTarget }) {
    if (!root || !container || !feed || !profiles[channel]) return;
    const controls = document.createElement("div");
    controls.className = "malha-ai-controls";
    const button = document.createElement("button");
    button.type = "button";
    button.className = "malha-ai-button";
    button.textContent = "CONTINUAR CONVERSA COM IA";
    button.disabled = true;
    const status = document.createElement("span");
    status.className = "malha-ai-status";
    status.setAttribute("role", "status");
    status.setAttribute("aria-live", "polite");
    status.textContent = "CONECTANDO AO SERVIDOR DE IA…";
    controls.append(button, status);
    feed.before(controls);

    let configured = false;
    fetch("/api/status", { cache: "no-store" })
      .then((response) => response.ok ? response.json() : Promise.reject(new Error("status unavailable")))
      .then((data) => {
        configured = data.configured === true;
        button.disabled = !configured;
        status.textContent = configured ? "DUAS FALAS POR SOLICITAÇÃO // IA PRONTA" : "IA DESATIVADA // OPENAI_API_KEY NÃO CONFIGURADA NO SERVIDOR";
      })
      .catch(() => {
        status.textContent = "SERVIDOR DE IA NÃO CONECTADO // ABRA O SITE PELA PORTA 8787";
      });

    button.addEventListener("click", async () => {
      if (!configured || button.disabled) return;
      const nearBottom = feed.scrollHeight - feed.scrollTop - feed.clientHeight < 110;
      button.disabled = true;
      button.textContent = "GERANDO DIÁLOGO…";
      status.textContent = "A IA ESTÁ OUVINDO O CONTEXTO DESTE CANAL…";
      if (statusTarget) statusTarget.textContent = "DIÁLOGO COM IA EM ANDAMENTO";
      root.dispatchEvent(new CustomEvent("malha-ai:start"));
      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ channel, history: getHistory(feed) })
        });
        const data = await response.json().catch(() => ({}));
        if (!response.ok) throw new Error(data.error || "Falha ao gerar diálogo.");
        for (const [index, message] of data.messages.entries()) {
          if (index) await new Promise((resolve) => window.setTimeout(resolve, 420));
          feed.appendChild(buildMessage(message, channel, kind));
          if (nearBottom) feed.scrollTop = feed.scrollHeight;
        }
        status.textContent = "DUAS FALAS ADICIONADAS // DIÁLOGO GERADO POR IA";
        if (statusTarget) statusTarget.textContent = "DIÁLOGO GERADO POR IA // CANAL ATIVO";
      } catch (error) {
        status.textContent = error.message || "Não foi possível gerar agora. Tente novamente.";
        if (statusTarget) statusTarget.textContent = "CANAL RETOMADO // AGUARDANDO NOVA SOLICITAÇÃO";
      } finally {
        button.textContent = "CONTINUAR CONVERSA COM IA";
        button.disabled = !configured;
        root.dispatchEvent(new CustomEvent("malha-ai:finish"));
      }
    });
  }

  document.querySelectorAll("[data-malha-chat]").forEach((root) => {
    const scope = root.dataset.aiChatScope || (location.pathname.endsWith("memorial.html") ? "memorial" : "home");
    root.querySelectorAll("[data-chat-thread]").forEach((thread) => {
      const suffix = thread.dataset.chatThread;
      const channel = `${scope}_${suffix}`;
      attachControl({ root, container: thread, feed: thread.querySelector(".malha-chat-messages"), channel, kind: "floating", statusTarget: root.querySelector("[data-chat-status]") });
    });
  });

  document.querySelectorAll("[data-malha]").forEach((root) => {
    root.querySelectorAll("[data-malha-panel]").forEach((panel) => {
      const channel = `hellsings_${panel.dataset.malhaPanel}`;
      attachControl({ root, container: panel, feed: panel.querySelector(".malha-feed"), channel, kind: "hellsings", statusTarget: root.querySelector("[data-malha-status]") });
    });
  });

  document.querySelectorAll("[data-faction-chat]").forEach((root) => {
    const channel = root.dataset.factionChat;
    const feed = root.querySelector("[data-faction-feed]");
    attachControl({ root, container: root.querySelector(".faction-chat-console"), feed, channel, kind: "faction", statusTarget: root.querySelector("[data-faction-status]") });
  });
})();
