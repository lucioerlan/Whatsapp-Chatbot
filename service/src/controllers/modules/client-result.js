const store = require('store');
const { client } = require('../../server');

const resultClientUser = async (msg) => {
  
  const nomeDatabase = await store.get('@database_nome');
  const cpfDatabase = await store.get('@database_cpf');
  const dateBirthDatabase = await store.get('@database_dateOfBirth');
  const emailDatabase = await store.get('@database_email');

  switch (msg.body) {
    case '1':
      client.sendMessage(
        msg.from,
        `*${nomeDatabase}*  What is the order number?`
      );
      client.setPrevMessage('descriptionOrder');
      break;
    case '2':
      msg.reply(
        `Olá *${nomeDatabase}* Here are all the details of your registration!` +
          `\n\n*Name*: ${nomeDatabase}` +
          `\n*Cpf*: ${cpfDatabase}` +
          `\n*Date Of Birth*: ${dateBirthDatabase}` +
          `\n*E-mail*: ${emailDatabase}`
      );
      break;
      case '3':
        client.sendMessage(
          msg.from,
          `*${nomeDatabase}*  What is the order number?`
        );
        client.setPrevMessage('downloadNote');
        break;
    default:
      client.sendMessage(
        msg.from,
        'OPSS! 😅 I apologize. but you typed something invalid, type *BACK* if you have any questions'
      );
  }
};

module.exports = {
  resultClientUser
};

