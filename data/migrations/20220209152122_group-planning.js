

exports.up = function(knex) {
    return knex.schema
    .createTable("users", (tbl) => {
        tbl.increments();
        tbl.string("username", 128).notNullable().unique();
        tbl.string("password", 128).notNullable();
        tbl.string("email", 128).notNullable();
    })

    .createTable("groups", (tbl) => {
        tbl.increments();
        tbl.string("name", 128).notNullable();
        tbl.string("description");
        tbl.string("password", 128);
        tbl
            .integer("creator")
            .unsigned()
            .notNullable()
            .references("id")
            .inTable("users")
            .onUpdate("CASCADE")
            .onDelete("CASCADE");
    })

    .createTable("usersgroupslink", (tbl) => {
        tbl
            .integer("user_id")
            .unsigned()
            .notNullable()
            .references("id")
            .inTable("users")
            .onUpdate("CASCADE")
            .onDelete("CASCADE");
        tbl
            .integer("group_id")
            .unsigned()
            .notNullable()
            .references("id")
            .inTable("groups")
            .onUpdate("CASCADE")
            .onDelete("CASCADE");
    })
    
    .createTable("events", (tbl) => {
      tbl.increments();
      tbl.string("what", 256);
      tbl.datetime("when", {precision: 6});
      tbl.string("where");
      tbl.specificType("attending", "text ARRAY");
      tbl.boolean("poll").notNullable();
      tbl
        .integer("group_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("groups")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    })

    .createTable("polls", (tbl) => {
        tbl.increments();
        tbl.timestamp("created at").notNullable();
        tbl.datetime("expiration", {precision: 6}).notNullable();
        tbl.boolean("active").notNullable();
        tbl
            .integer("event_id")
            .unsigned()
            .notNullable()
            .references("id")
            .inTable("events")
            .unique()
            .onUpdate("CASCADE")
            .onDelete("CASCADE");
    })
    
    .createTable("choices", (tbl) => {
        tbl.increments()
        tbl.string("what", 256);
        tbl.datetime("when", {precision: 6});
        tbl.string("where");
        tbl
            .integer("poll_id")
            .unsigned()
            .notNullable()
            .references("id")
            .inTable("polls")
            .onUpdate("CASCADE")
            .onDelete("CASCADE");
    });
};

exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists("choices")
    .dropTableIfExists("polls")
    .dropTableIfExists("events")
    .dropTableIfExists("usersgroupslink")
    .dropTableIfExists("groups")
    .dropTableIfExists("users");
};
