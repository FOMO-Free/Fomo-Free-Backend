exports.seed = function(knex) {

  return knex('instructions').del()
    .then(function () {
      return knex('instructions').insert([
          {
            step_number: 1,
            step_instructions: "combine ingredients",
            recipe_id: 1,
          },
          {
            step_number: 2,
            step_instructions: "cook",
            recipe_id: 1,
          },
          { 
            step_number: 3, 
            step_instructions: "serve", 
            recipe_id: 1 
          },
          {
            step_number: 1,
            step_instructions: "combine ingredients",
            recipe_id: 2,
          },
          {
            step_number: 2,
            step_instructions: "cook",
            recipe_id: 2,
          },
          { 
            step_number: 3, 
            step_instructions: "serve", 
            recipe_id: 2 
          },
          {
            step_number: 1,
            step_instructions: "combine ingredients",
            recipe_id: 3,
          },
          {
            step_number: 2,
            step_instructions: "cook",
            recipe_id: 3,
          },
          { 
            step_number: 3, 
            step_instructions: "serve", 
            recipe_id: 3 
          },
          {
            step_number: 1,
            step_instructions: "combine ingredients",
            recipe_id: 4,
          },
          {
            step_number: 2,
            step_instructions: "cook",
            recipe_id: 4,
          },
          { 
            step_number: 3, 
            step_instructions: "serve", 
            recipe_id: 4 
          },
          {
            step_number: 1,
            step_instructions: "combine ingredients",
            recipe_id: 5,
          },
          {
            step_number: 2,
            step_instructions: "cook",
            recipe_id: 5,
          },
          { 
            step_number: 3, 
            step_instructions: "serve", 
            recipe_id: 5 
          },
      ])
    })
}
