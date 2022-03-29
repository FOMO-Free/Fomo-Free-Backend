exports.seed = function (knex) {

  return knex("categories")
    .del()
    .then(function () {
      return knex("personalevents").insert([
        { what: "game night", where: "donnie's house", starttime: "2021-04-17 01:25:00" },
      ]);
    });
};
