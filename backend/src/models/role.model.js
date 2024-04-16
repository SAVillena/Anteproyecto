"use strict";
// Importar sequelize
import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/configDB.js";
import ROLES from "../constants/roles.constants.js";

class Role extends Model {}

// Definir el modelo 'Role'
Role.init(
  {
    // Definir la columna 'id'
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    // Definir la columna 'name'
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: {
          args: [ROLES],
          msg: "El rol no es válido",
        },
      },
    },
  },
  {
    sequelize,
    modelName: "Role",
    timestamps: false,
  }
);
export default Role;
