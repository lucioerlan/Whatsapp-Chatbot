const { client } = require('../server');

module.exports = async (msg) => {
  const chat = await msg.getChat();
  chat.sendStateTyping();
  client.setPrevMessage('start');

  client.sendMessage(
    msg.from,
    '\n\nHello Im Morfeu, your *virtual assistant* at *Ftrox Business* 😄' +
    '\n\nI have selected below the main subjects that usually ask me, *type the number* corresponding to the desired option.' +
    '\n\n*1* - I am already a customer at *Ftrox Business* and I want to get Information' +
    '\n*2* - I am not yet a customer at *Ftrox Business*' +
    '\n*3* - Find out more about *Ftrox Business*' +
    '\n*4* - Contacts'
  );
};
