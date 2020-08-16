const { client, MessageMedia } = require('../server');
const { resolve } = require('path');

const aboutUs = async (msg) => {
  const chat = await msg.getChat();
  chat.sendStateTyping();

  client.setPrevMessage('aboutUs');
  client.sendMessage(
    msg.from,
    '*FTROX BUSINESS*' +
      '\n\nCreated in 2003, with a mission to pass' +
      '\non as much knowledge as possible to other people' +
      '\ninnovative technology and processes' +
      '\n\n\n *WANT TO KNOW MORE?*' +
      '\n\n *1* - Yes' +
      '\n *0* - Back'
  );
};

const choseAboutUs = async (msg) => {
  const media = MessageMedia.fromFilePath(resolve('public/images/linha.jpg'));
  switch (msg.body) {
    case '1':
      msg.reply('Wait, processing the image... 😙');
      client.sendMessage(msg.from, media);
      break;
    default:
      client.sendMessage(
        msg.from,
        'OPSS! 😅 I apologize. but you typed something invalid, type *BACK* if you have any questions'
      );
  }
};

module.exports = {
  aboutUs,
  choseAboutUs,
};
