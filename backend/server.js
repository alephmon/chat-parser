const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const rtf2text = require('rtf2text');
const app = express();
const PORT = 3000;

app.use(cors());

const lineRegex = /^\[(.+?)\]\s+([^\n]+?)\s*$/;

function parseChat(text) {
  const lines = text.split('\n').filter(line => line.trim() !== '');
  let messages = [];
  let current = null;

  for (const line of lines) {
    const match = line.match(lineRegex);
    if (match) {
      if (current) messages.push(current);
      const [_, timestamp, rest] = match;
      const splitIndex = rest.indexOf('\t');
      if (splitIndex !== -1) {
        const sender = rest.substring(0, splitIndex).trim();
        const message = rest.substring(splitIndex + 1).trim();
        current = { timestamp, sender, message };
      } else {
        const sender = rest.trim();
        current = { timestamp, sender, message: '' };
      }
    } else if (current) {
      current.message += ' ' + line.trim();
    }
  }

  if (current) messages.push(current);
  return messages;
}

app.get('/chat', (req, res) => {
  const filename = req.query.file || 'chat.txt';
  const filepath = path.join(__dirname, filename);
  const ext = path.extname(filename).toLowerCase();

  console.log(filepath)

  if (!fs.existsSync(filepath)) {
    return res.status(404).json({ error: 'File not found' });
  }

  if (ext === '.rtf') {
    const rtf = fs.readFileSync(filepath, 'utf-8');
    rtf2text.string(rtf, (err, text) => {
      if (err) return res.status(500).json({ error: 'Failed to parse RTF', details: err.message });
      const parsed = parseChat(text);
      res.json(parsed);
    });
  } else if (ext === '.txt') {
    const text = fs.readFileSync(filepath, 'utf-8');
    const parsed = parseChat(text);
    res.json(parsed);
  } else {
    res.status(400).json({ error: 'Unsupported file type. Use .txt or .rtf' });
  }
});

app.listen(PORT, () => {
  console.log(`Chat parser microservice listening at http://localhost:${PORT}`);
});
