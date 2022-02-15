const db = require("../../data/dbConfig");


const findByUserId = (id) => {
    return db("usersgroupslink").where("user_id", id).first();
  };

const findByGroupId = (id) => {
    return db("usersgroupslink").where("user_id", id).first()
}

const add = async (user_id, group_id) => {
    const [usergrouplink] = await db("usersgroupslink").insert({user_id:user_id,group_id:group_id},"*")
    const user = db("users").where("user_id",usergrouplink.user_id).first()
    const group = db("groups").where("group_id",usergrouplink.group_id).first()
    return {
        message:`${user.username} and ${group.group_name}`,
        group: group
    }
}

const remove = async (user_id, group_id) => {
    const [usergrouplink] = await db("usersgroupslink").where({user_id:user_id,group_id:group_id}).del("*");
    return `${usergrouplink} has been deleted`;
  };


  module.exports = {
    findByUserId,
    add,
    findByGroupId,
    remove,
};