const { table } = require("console");


exports.up = function(knex) {
    return knex.schema
    .createTable("users", (tbl) => {
        tbl.increments();
        tbl.string("username", 128).notNullable().unique();
        tbl.string("password", 128).notNullable();
        tbl.string("email", 128).notNullable();
    })

    .createTable("personalEvents", (tbl) => {
        tbl.increments();
        tbl.string("what").notNullable();
        tbl.string("where");
        tbl.datetime("starttime", { precision: 6, useTz: true }).notNullable();
        tbl.datetime("endtime", { precision: 6, useTz: true }).notNullable();
        tbl
            .integer("user_id")
            .unsigned()
            .notNullable()
            .references("id")
            .inTable("users")
            .onUpdate("CASCADE")
            .onDelete("CASCADE");
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
      tbl.datetime("starttime", { precision: 6, useTz: true });
      tbl.datetime("endtime", { precision: 6, useTz: true });
      tbl.string("where");
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
        tbl.datetime("created at", { precision: 6, useTz: true }).notNullable().defaultTo(knex.fn.now(6));
        tbl.datetime("expiration", { precision: 6, useTz: true });
        tbl.boolean("active").notNullable().defaultTo(true);
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
        tbl.datetime("starttime", { precision: 6, useTz: true });
        tbl.datetime("endtime", { precision: 6, useTz: true });
        tbl.string("where");
        tbl
            .integer("poll_id")
            .unsigned()
            .notNullable()
            .references("id")
            .inTable("polls")
            .onUpdate("CASCADE")
            .onDelete("CASCADE");
    })

    .createTable("attending", (tbl) => {
        tbl
            .integer("user_id")
            .unsigned()
            .notNullable()
            .references("id")
            .inTable("users")
            .onUpdate("CASCADE")
            .onDelete("CASCADE");
        tbl
            .integer("event_id")
            .unsigned()
            .notNullable()
            .references("id")
            .inTable("events")
            .onUpdate("CASCADE")
            .onDelete("CASCADE");
    });
};

exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists("attending")
    .dropTableIfExists("choices")
    .dropTableIfExists("polls")
    .dropTableIfExists("events")
    .dropTableIfExists("usersgroupslink")
    .dropTableIfExists("groups")
    .dropTableIfExists("personalEvents")
    .dropTableIfExists("users");
};
