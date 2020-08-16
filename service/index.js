const { client } = require('./src/server');
const {
  startController,
  clientUser,
  choseClientUser,
  newUser,
  choseNewUser,
  aboutUs,
  choseAboutUs,
  contact,
  choseContact,
} = require('./src/controllers');

const {
  resultClientUser,
  orderClienteUser,
  downloadNoteClienteUser
} = require('./src/controllers/modules');

const join = require('./src/events/event.join');
const left = require('./src/events/event.left');

client.on('message', async (msg) => {
  const message = msg.body.toLowerCase();
  console.log('MESSAGE RECEIVED', msg);

  if (
    message == 'hi' ||
    message == '0' ||
    message == 'back' ||
    message == 'start'
  ) {
    await startController(msg);
  } else if (client.lastMessage == 'start') {
    switch (msg.body) {
      case '1':
        await clientUser(msg);
        break;
      case '2':
        await newUser(msg);
        break;
      case '3':
        await aboutUs(msg);
        break;
      case '4':
        await contact(msg);
        break;
      default:
        client.setPrevMessage('start');
        client.sendMessage(
          msg.from,
          '⚠️ Invalid option, shall we try again? type * BACK * '
        );
    }
  } else if (client.lastMessage == 'clientUser') {
    await choseClientUser(msg);
  } else if (client.lastMessage == 'result') {
    await resultClientUser(msg);
  } else if (client.lastMessage == 'descriptionOrder') {
    await orderClienteUser(msg); 
  } else if (client.lastMessage == 'downloadNote') {
    await downloadNoteClienteUser(msg);  
  } else if (client.lastMessage == 'newUser') {
    await choseNewUser(msg);
  } else if (client.lastMessage == 'aboutUs') {
    await choseAboutUs(msg);
  } else if (client.lastMessage == 'contact') {
    await choseContact(msg);
  } else {
    client.setPrevMessage('start');
    client.sendMessage(
      msg.from,
      'OPSS! 😅 I apologize. the more you typed something invalid, type *START* '
    );
  }
});

client.on('group_join', join);
client.on('group_leave', left);
