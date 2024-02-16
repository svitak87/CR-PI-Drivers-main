const { DataTypes } = require("sequelize");
const path = require("path");


module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("Driver", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, 
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING, 
      allowNull: false,
      defaultValue: path.join(__dirname, "../assets/defaultImage.png")
    },
    nationality: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dob: { 
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  }, {
    timestamps: false,
  });
};
