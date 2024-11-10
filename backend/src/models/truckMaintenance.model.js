"use strict";
import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/configDB.js";
import Truck from "./truck.model.js";

class TruckMaintenance extends Model {}

TruckMaintenance.init(
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
    maintenanceDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    nextMaintenance: {
      type: DataTypes.DATE,
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
    modelName: "TruckMaintenance",
    timestamps: true,
  }
);

export default TruckMaintenance;
