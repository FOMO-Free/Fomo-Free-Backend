const db = require("../../data/dbConfig");


const findById = (id) => {
    return db("groups").select("id","name","description","creator","password").where("id", id).first();
};

const add = async (group) => {
    const [newGroup] = await db("groups").insert(group, "*");
    return newGroup;
};
  
const update = async (id, group) => {
    const [updatedGroup] = await db("groups").where("id", id).update(group, "*");
    return updatedGroup;
};
  
const remove = async (id) => {
    const [deletedGroup] = await db("groups").where("id", id).del("*");
    return `${deletedGroup.group_name} has been deleted`;
};

module.exports = {
    findById,
    add,
    update,
    remove,
};