const request = require('request');
const store = require('store');
const fs = require('fs');
const { resolve } = require('path');
const { client, MessageMedia } = require('../../server');

const downloadNoteClienteUser = async (msg) => {

  const nomeDatabase = await store.get('@database_nome');
  store.set('@input_purchase_code', msg.body);
  const cnpj = await store.get('@input_cnpj');
  const purchaseCode = await store.get('@input_purchase_code');

  switch (true) {
    case purchaseCode.length == '' || isNaN(cnpj):
      client.sendMessage(
        msg.from,
        `*${nomeDatabase}* Type only * numbers * without dashes or periods. 😅`
      );
      break;
    case purchaseCode.length > 0:
      request(
        `http://localhost:4001/api/order-user/${cnpj}/${purchaseCode}`,
        async (error, result) => {

          if (error || result.statusCode !== 200)
            return msg.reply(`😥 ${purchaseCode} *${result.body}*`);

          const res = JSON.parse(result.body);
          const { fiscal_note_pdf_64 } = res[0];
          const buff = new Buffer.from(fiscal_note_pdf_64, 'base64');

          if (fiscal_note_pdf_64 == '') {
            return 'Invoice, has not yet been generated!';
          }

          fs.writeFile(
            resolve(`public/documents/${purchaseCode}.pdf`),buff,
            (err) => {
            
              if (err) throw new Error('Error Saving!');

              const media = MessageMedia.fromFilePath(
                `public/documents/${purchaseCode}.pdf`
              );

              msg.reply('Wait, processing your PDF ... 😙');
              
              client.sendMessage(msg.from, media,
                '\n\n*WANT MORE INFORMATION?*' +
                '\n\n*1* - Consult new order' +
                '\n*2* - Consult Registration Details' +
                '\n*3* - Download 2 via Nota Fiscal' +
                '\n*0* - Exit'
                );
              
                
              client.setPrevMessage('result');
            }
          );
        }
      );
      break;
    default:
      store.clearAll();
      client.sendMessage(
        msg.from,
        'OPSS! 😅 I apologize. but you typed something invalid, type *BACK* if you have any questions'
      );
  }
};


module.exports = {
  downloadNoteClienteUser
};
