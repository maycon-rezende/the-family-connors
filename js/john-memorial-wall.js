(() => {
  const wall = document.querySelector('[data-john-wall]');
  const index = wall?.querySelector('[data-john-wall-index]');
  const count = wall?.querySelector('[data-john-wall-count]');
  const title = wall?.querySelector('[data-john-wall-title]');
  const channel = wall?.querySelector('[data-john-wall-channel]');
  const message = wall?.querySelector('[data-john-wall-message]');
  const signoff = wall?.querySelector('[data-john-wall-signoff]');
  const reactions = wall?.querySelector('[data-john-wall-reactions]');
  const reply = wall?.querySelector('[data-john-wall-reply]');
  const records = window.JOHN_MEMORIAL_RECORDS;

  if (!wall || !index || !count || !title || !channel || !message || !signoff || !reactions || !reply || !Array.isArray(records)) return;

  const makeButton = (record, position) => {
    const button = document.createElement('button');
    button.className = 'john-memory-voice';
    button.type = 'button';
    button.setAttribute('aria-pressed', 'false');
    button.dataset.johnVoice = String(position);

    const number = document.createElement('span');
    number.textContent = `F-${String(position + 1).padStart(2, '0')}`;
    const name = document.createElement('b');
    name.textContent = record.name;
    const source = document.createElement('small');
    source.textContent = record.channel;
    button.append(number, name, source);
    button.addEventListener('click', () => selectRecord(position));
    return button;
  };

  const voices = [];
  const entries = [];
  let activeSection = '';
  records.forEach((record, position) => {
    if (record.section !== activeSection) {
      activeSection = record.section || 'VOZES PRESERVADAS';
      const heading = document.createElement('h3');
      heading.className = 'john-memory-voice-group';
      heading.textContent = activeSection;
      entries.push(heading);
    }
    const button = makeButton(record, position);
    voices.push(button);
    entries.push(button);
  });
  index.replaceChildren(...entries);

  const selectRecord = (position) => {
    const record = records[position];
    voices.forEach((button, buttonIndex) => button.setAttribute('aria-pressed', String(buttonIndex === position)));
    count.textContent = `VOZ ${String(position + 1).padStart(2, '0')} / ${String(records.length).padStart(2, '0')}`;
    title.textContent = record.title;
    channel.textContent = `${record.name} // ${record.role}`;
    message.textContent = `“${record.message}”`;
    signoff.textContent = record.signoff;

    reactions.replaceChildren(...record.reactions.map((reaction) => {
      const tag = document.createElement('span');
      const icon = document.createElement('b');
      icon.setAttribute('aria-hidden', 'true');
      icon.textContent = reaction.icon;
      const author = document.createElement('small');
      author.textContent = reaction.by;
      tag.append(icon, author);
      return tag;
    }));

    const replyAuthor = document.createElement('b');
    replyAuthor.textContent = record.reply.by;
    const replyRole = document.createElement('small');
    replyRole.textContent = record.reply.role;
    const replyText = document.createElement('p');
    replyText.textContent = record.reply.text;
    reply.replaceChildren(replyAuthor, replyRole, replyText);
  };

  selectRecord(0);
})();
