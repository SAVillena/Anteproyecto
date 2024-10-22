"use strict";
import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/configDB.js";
import Data from "./data.model.js";
import Serial from "./serial.model.js";

class Alert extends Model {}

Alert.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    timestamp: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    alert_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    alert_value: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    dataId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Data, // Referencia al modelo Data
        key: "id",
      },
      onDelete: "CASCADE", // Eliminar las alertas si el dato relacionado es eliminado
    },
    serialId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Serial, // Referencia al modelo Serial
        key: "id",
      },
      onDelete: "CASCADE", // Eliminar las alertas si el serial relacionado es eliminado
    },
  },
  {
    sequelize,
    modelName: "Alert",
    timestamps: true,
  }
);

// Establecer las relaciones
Alert.belongsTo(Data, {
  foreignKey: "dataId",
  onDelete: "CASCADE",
});

Alert.belongsTo(Serial, {
  foreignKey: "serialId",
  onDelete: "CASCADE",
});

export default Alert;
