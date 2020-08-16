const db = require('../database/db-config');

const orderUsers = async (req, res) => {
  db('order_details')
    .where('cpf', req.params.cpf)
    .andWhere('purchase_code', req.params.purchase_code)
    .orderBy('updated_at', 'desc')
    .then((result) => {
      if (result.length) {
        return res.status(200).json(result);
      } else {
        res.status(400).send('Purchase Code not found!');
      }
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
};

module.exports = {
  orderUsers,
};
