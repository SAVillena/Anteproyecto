"use strict";
import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/configDB.js";

class Serial extends Model {}

Serial.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        serial: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: "Serial",
        timestamps: true,
    },
);

export default Serial;
