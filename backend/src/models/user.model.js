"use strict";
// Import the 'mongoose' module to create the database connection
import { Model, DataTypes } from "sequelize";
import Role from "./role.model.js";
import { sequelize } from "../config/configDB.js";
import bcrypt from "bcryptjs";

class User extends Model {
  //metodo para verificar la contraseña
  async validPassword(password) {
    return await bcrypt.compare(password, this.password);
  }
}

// Define the 'User' model
User.init(
  {
    // Define the 'id' column
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    // Define the 'username' column
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: {
          args: [4, 20],
          msg: "El nombre de usuario debe tener entre 4 y 20 caracteres",
        },
      },
    },
    // Define the 'email' column
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          args: true,
          msg: "El email no es válido",
        },
      },
    },
    // Define the 'password' column
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rut: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      // Esta validacion creo que hay que quitarla
      validate: {
        is: {
          args: /^(\d{7,8})-([\dkK])$/,
          msg: "El rut no es válido",
        },
      },
    },
    // Define the 'role' column

  },
  {
    sequelize,
    modelName: "User",
    hooks: {
      beforeCreate: async (user, options) => {
        try {
        if (user.password) {
          user.password = await bcrypt.genSalt(10).then((salt) => bcrypt.hash(user.password, salt));
        }
        }catch (error) {
          console.error('Error hashing password(beforeCreate): ',error);
        }
      },
      beforeUpdate: async (user, options) => {
        try {
          if (user.changed("password")){
            user.password = await bcrypt.genSalt(10).then((salt) => bcrypt.hash(user.password, salt));
          }
        }catch (error) {
          console.error('Error hashing password (beforeUpdate): ',error);
        }
      }
    }
  }
);

// Relationship
User.belongsTo(Role, {
  foreignKey: {
    name: "roleId",
    allowNull: false,
  },
  onDelete: "RESTRICT",
  onUpdate: "RESTRICT",
});
// Export the 'User' data model
export default User;
