const { Client, MessageMedia } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const fs = require('fs');
const {resolve} = require('path');

const sessionFile = resolve('src', 'data', 'session.json');
const sessionData = fs.existsSync(sessionFile) ? require(sessionFile) : null;

const client = new Client({
  session: sessionData,
});

client.on('qr', (qr) => {
  qrcode.generate(qr, {
    small: true,
  });
});

client.on('authenticated', (session) => {
  fs.writeFile(sessionFile, JSON.stringify(session), (err) => {
    if (err) console.log(err);
  });
});

client.on('ready', () => {
  console.log('WhatsApp bot successfully connected!');
});

client.on('auth_failure', () => {
  fs.unlink(sessionFile, () =>
    console.log('Authentication failed, try again.')
  );
});

client.on('disconnected', () => {
  fs.unlink(sessionFile, () =>
    console.log('WhatsApp session lost the connection.')
  );
});

client.initialize();

module.exports = {
  client,
  MessageMedia,
};
