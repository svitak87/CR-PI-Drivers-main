const { DataTypes } = require("sequelize");

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
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING, // Tipo de dato STRING para almacenar URLs de imágenes
      allowNull: false,
      defaultValue: "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg"
    },
    nationality: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dob: { //fecha de nacimiento
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  }, {
    timestamps: false,
  });
};
