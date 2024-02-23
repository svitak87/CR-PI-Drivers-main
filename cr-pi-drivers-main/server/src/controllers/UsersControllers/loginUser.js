const { User } = require('../../db');
const bcrypt = require("bcrypt");

const loginUser = async (credentialData) => {
  const { email, password } = credentialData;
  try {
    if (email && password) {
      const userFound = await User.findOne({ where: { email: email } });
      if (userFound) {
        const passwordMatch = await bcrypt.compare(password, userFound.password);
        if (passwordMatch) {
          return userFound;
        } else {
          throw new Error("Password doesn't match");
        }
      } else {
        throw new Error("Email doesn't exist");
      }
    } else {
      throw new Error("Email and password are required");
    }
  } catch (error) {
    throw error;
  }
};

module.exports = loginUser;