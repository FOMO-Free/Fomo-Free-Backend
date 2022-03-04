const db = require("../../data/dbConfig");


const findById = (id) => {
    return db("events").select("id","what","when","where","poll","group_id").where("id", id).first();
};

<<<<<<< HEAD
const findByGroup = (id) => {
    return db("events").select("id","what","when","where","poll").where("group_id", id);
}
=======
const findByGroupId = (id) => {
    return db("events").select("id","what","when","where","poll").where("group_id", id);
};
>>>>>>> e41456e585e16241ba0214dc5e69111a9fb94862

const add = async (event) => {
    const [newEvent] = await db("events").insert(event, "*");
    return newEvent;
};
<<<<<<< HEAD

const update = async (id, event) => {
    const [updatednewEvent] = await db("events").where("id", id).update(event, "*");
    return updatednewEvent;
};

const remove = async (id) => {
    const [deletedEvent] = await db("groups").where("id", id).del("*");
    return `${deletedEvent.group_name} has been deleted`;
};

module.exports = {
    findById,
    findByGroup,
=======
  
const update = async (id, event) => {
    const [updatedEvent] = await db("events").where("id", id).update(event, "*");
    return updatedEvent;
};
  
const remove = async (id) => {
    const [deletedEvent] = await db("events").where("id", id).del("*");
    return `${deletedEvent.what} has been deleted`;
};


module.exports = {
    findById,
    findByGroupId,
>>>>>>> e41456e585e16241ba0214dc5e69111a9fb94862
    add,
    update,
    remove,
};