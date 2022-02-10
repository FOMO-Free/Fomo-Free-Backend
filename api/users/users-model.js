const db = require("../../data/dbConfig");

const findAll = () => {
  return db("users").select("id", "username","email");
};

const findById = (id) => {
  return db("users").where("id", id).first();
};


const findByUsername = (username) => {
  return db("users").where("username", username).first();
};

const findByEmail = (email) => {
  return db("users").where("email", email).first();
};

const add = async (user) => {
  const [newUser] = await db("users").insert(user, "*");
  return newUser;
};

const update = async (id, user) => {
  const [updatedUser] = await db("users").where("id", id).update(user, "*");
  return updatedUser;
};

const remove = async (id) => {
  const [deletedUser] = await db("users").where("id", id).del("*");
  return `${deletedUser.username} has been deleted`;
};

module.exports = {
  findAll,
  findById,
  findByUsername,
  findByEmail,
  add,
  update,
  remove,
};
