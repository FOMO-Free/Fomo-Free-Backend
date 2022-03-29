exports.seed = function (knex) {

  return knex("recipes")
    .del()
    .then(function () {
      return knex("recipes").insert([
        {
          recipe_name: "berry cobbler",
          recipe_source: "Agnis",
          category_id: 4,
          user_id: 1,
        },
        {
          recipe_name: "cinnamon roll pancakes",
          recipe_source: "Sue",
          category_id: 1,
          user_id: 1,
        },
        {
          recipe_name: "tea",
          recipe_source: "Mother",
          category_id: 6,
          user_id: 2,
        },
        {
          recipe_name: "crepes",
          recipe_source: "Nick",
          category_id: 3,
          user_id: 3,
        },
        {
          recipe_name: "pretzel salad",
          recipe_source: "Mom",
          category_id: 5,
          user_id: 3,
        },
      ]);
    });
};
