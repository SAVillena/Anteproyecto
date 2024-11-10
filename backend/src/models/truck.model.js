"use strict";
import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/configDB.js";
import Driver from "./driver.model.js";

class Truck extends Model {}

Truck.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    waterStatus: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    driverId: {
      type: DataTypes.INTEGER,
      references: {
        model: Driver,
        key: "id",
      },
      allowNull: false,
    },
    currentLocation: {
      type: DataTypes.GEOMETRY("POINT"),
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "Truck",
    timestamps: true,
  }
);

export default Truck;
