const request = require('request');
const store = require('store');
const { client } = require('../server');

const clientUser = async (msg) => {
  client.setPrevMessage('clientUser');
  client.sendMessage(msg.from, 'To get started, enter your *Social Security Number*:');
};


const choseClientUser = async (msg) => {
  const user = await msg.getContact();
  store.set('@input_cnpj', msg.body);
  const cnpj = await store.get('@input_cnpj');

  switch (true) {
    case cnpj.length == '' || isNaN(cnpj):
      client.sendMessage(
        msg.from,
        `@${user.id.user} Enter only *numbers* without dashes or periods. 😅`
      );
      break;
    case cnpj.length > 0:
      request(
        `http://localhost:4001/api/user/${cnpj}`,
        async (error, result) => {
  
          if (error || result.statusCode !== 200)
            return msg.reply(`😥 ${cnpj} *${result.body}*`);

          const res = JSON.parse(result.body);
          const { name, cpf, date_of_birth, email } = res[0];

          store.set('@database_nome', name);
          store.set('@database_cpf', cpf);
          store.set('@database_dateOfBirth', date_of_birth);
          store.set('@database_email', email);
          const nomeDatabase = await store.get('@database_nome');

          const time = new Date().getHours();

          if (time < 13) {
            msg.reply(`🌅 Good Morning *${nomeDatabase}*`);
          } else if (time < 18) {
            msg.reply(`☀️ Good afternoon *${nomeDatabase}*`);
          } else {
            msg.reply(`🌃 Good evening *${nomeDatabase}*`);
          }

          client.sendMessage(
            msg.from,
              'I selected the main subjects below' +
              '\nwho usually ask me *type the number* corresponding to the desired option' +
              '\n\n*1* - See Order Details' +
              '\n*2* - Consult Registration Details' +
              '\n*3* - Download 2 via Nota Fiscal' +
              '\n*0* - Back'
          );
          client.setPrevMessage('result');
        }
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
  clientUser,
  choseClientUser
};
