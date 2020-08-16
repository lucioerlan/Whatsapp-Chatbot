exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          'name': 'Nicolas Kevin Mendes',
          'cpf': '38581407838',
          'email': 'nicolaskevinmendes-94@hotmaill.com',
          'date_of_birth': '1998-02-03'
        },
        {

          'name': 'Caleb Lucas Pinto',
          'cpf': '67067959330',
          'email': 'caleblucaspinto@cebrace.com.br',
          'date_of_birth': '2001-03-08'
        },
        {

          'name': 'Diego Erick da Cunha',
          'cpf': '97391866105',
          'email': 'diegoerickdacunha_@artedaserra.com.br',
          'date_of_birth': '1993-07-08'
        }
 
      ]);
    });
};


