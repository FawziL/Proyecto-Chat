const DaoUser = require("../daos/userDaoMongoDb.js");
const User = DaoUser.getInstance();

const createUser = async (newUser) => {
  try {
    const existingUser = await User.create(newUser);
    return existingUser;
  } catch (err) {
    console.log(err);
  }
};
module.exports = { createUser };
