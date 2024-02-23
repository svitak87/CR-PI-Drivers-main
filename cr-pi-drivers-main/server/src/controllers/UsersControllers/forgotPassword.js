const {User} = require('../../db')
const bcrypt = require("bcrypt");

const forgotPassword = async (recoverData) => {
  const { answerOne, answerTwo, email, password} = recoverData;
  try {
    if (email && answerOne && answerTwo && password) {
      const existingUser = await User.findOne({ where: { email: email } });
      if (existingUser) {
        if (
          existingUser.answerOne === answerOne &&
          existingUser.answerTwo === answerTwo
        ) {
          if(password){
            const hashedPassword = await bcrypt.hash(password, 10);
          const updatedUser = await User.update(
            { password: hashedPassword },
            { where: { email: email } }
          );
          return updatedUser;
          }
        } else {
          throw new Error("Incorrect answers");
        }
      } else {
        throw new Error("Email doesn't exist");
      }
    } else {
      throw new Error("Incomplete data provided");
    }
  } catch (error) {
    throw error;
  }
};

module.exports = forgotPassword;