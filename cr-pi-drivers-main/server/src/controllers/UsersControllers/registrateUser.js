const { User } = require("../../db");
const bcrypt = require("bcrypt");

const registrateUser = async (userData) => {
  let { name, lastname, email, password, answerOne, answerTwo } = userData;
  try {
    if (name && lastname && email && password && answerOne && answerTwo) {
      const existingUser = await User.findOne({ where: { email: email } });
      if (existingUser) {
        throw new Error("User already exists");
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({
        name,
        lastname,
        email,
        password: hashedPassword,
        answerOne,
        answerTwo,
      });
      return newUser;
    } else {
      throw new Error("Incomplete data");
    }
  } catch (error) {
    throw error;
  }
};

module.exports = registrateUser;
