const { client } = require('../server');

const newUser = async (msg) => {
  const chat = await msg.getChat();
  chat.sendStateTyping();

  client.setPrevMessage('newUser');
  client.sendMessage(
    msg.from,
    '*WORK WITH US*' +
      '\n\nWe are always looking for new developers, focused on results!' +
      '\nIf you are differentiated please contact us' +
      '\n\n\n *WANT TO KNOW MORE?*' +
      '\n\n *1* - Yes' +
      '\n *0* - Back'
  );
};

const choseNewUser = async (msg) => {
  switch (msg.body) {
    case '1':
      client.sendMessage(
        msg.from,
        'Hello, we are happy, in your interest to work with us! 💕 ' +
          '\n\nIf you want to consult the vacancies available or register, speak to our president' +
          '\nAccess the *LINK* below ' +
          '\nhttps://www.linkedin.com/in/erlanlucio/' 
      );
      break;
    default:
      client.sendMessage(
        msg.from,
        'OPSS! 😅 I apologize. but you typed something invalid, type *BACK* if you have any questions'
      );
  }
};

module.exports = {
  newUser,
  choseNewUser
};
