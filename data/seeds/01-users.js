const bcrypt = require("bcryptjs")

const password = "defaultpassword"

const hash = bcrypt.hashSync(password, 8)

exports.seed = function(knex) {

  return knex('users')
    .del()
    .then(function () {
      return knex('users').insert([
        {username: "auntieCherie", password: hash, email: "Cherie317@gmail.com"},
        {username: "Granny", password: hash, email: "GrannySmith@gmail.com"},
        {username: "RonaldG", password: hash, email: "Ronnie@gmail.com"}
      ]);
    });
};
