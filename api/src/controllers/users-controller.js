const db = require('../database/db-config');

const allUsers = async (req, res) => {
  db('users')
    .where('cpf', req.params.cpf)
    .orderBy('updated_at', 'desc')
    .then((result) => {
      if (result.length) {
        return res.status(200).json(result);
      } else {
        res.status(400).send('CPF not found!');
      }
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
};

module.exports = {
  allUsers,
};
