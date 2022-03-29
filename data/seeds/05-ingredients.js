exports.seed = function(knex) {
  
  return knex('ingredients').del()
    .then(function () {
      
      return knex('ingredients').insert([
        { ingredient_name: "berries", recipe_id: 1, quantity: 6 , units:"cups", step_number:1},
        { ingredient_name: "dough", recipe_id: 1, quantity: 1, units:"box", step_number:1},
        { ingredient_name: "sugar", recipe_id: 1, quantity: .5, units:"cups", step_number:1},
        { ingredient_name: "bisquick mix", recipe_id: 2, quantity: .5, units:"box", step_number:1},
        { ingredient_name: "cinnamon and sugar", recipe_id: 2, quantity: 1, units:"cups", step_number:1},
        { ingredient_name: "butter", recipe_id: 2, quantity: 1, units:"cups", step_number:1},
        { ingredient_name: "tea leaves", recipe_id: 3, quantity: 1, units:"tbsp", step_number:11},
        { ingredient_name: "milk", recipe_id: 3, quantity: .2, units:"cups", step_number:1},
        { ingredient_name: "sugar", recipe_id: 3, quantity: 1, units:"tsp", step_number:1},
        { ingredient_name: "flour", recipe_id: 4, quantity: 1, units:"cups", step_number:1},
        { ingredient_name: "eggs", recipe_id: 4, quantity: 2, step_number:1},
        { ingredient_name: "milk", recipe_id: 4, quantity: .5, units:"cups", step_number:1},
        { ingredient_name: "pretzels", recipe_id: 5, quantity: 2, units:"cups", step_number:1},
        { ingredient_name: "jello", recipe_id: 5, quantity: 1, units:"box", step_number:1},
        { ingredient_name: "cool whip", recipe_id: 5, quantity: 2, step_number:1},
      ]);
    });
};
