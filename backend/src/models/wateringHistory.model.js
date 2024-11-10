"use strict";
import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/configDB.js";
import Truck from "./truck.model.js";

class WateringHistory extends Model {}

WateringHistory.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    truckId: {
      type: DataTypes.INTEGER,
      references: {
        model: Truck,
        key: "id",
      },
      allowNull: false,
    },
    timestamp: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    wateringArea: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    waterUsed: {
      type: DataTypes.FLOAT,
      allowNull: false,
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
    modelName: "WateringHistory",
    timestamps: true,
  }
);

export default WateringHistory;
