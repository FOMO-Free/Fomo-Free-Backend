
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
        tbl.string("group_name", 128).notNullable();
        tbl.string("group_description");
        tbl.string("group_password", 128);
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
      tbl.string("event_what", 256).notNullable();
      tbl.timestamp("event_when").notNullable();
      tbl.string("event_where").notNullable();
      tbl
        .integer("group_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("groups")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    });
};

exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists("events")
    .dropTableIfExists("usersgroupslink")
    .dropTableIfExists("groups")
    .dropTableIfExists("users");
};
