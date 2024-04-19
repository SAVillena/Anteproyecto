"use strict";
import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/configDB.js";

class Data extends Model {}

Data.init(
    {
        serial: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        latitude: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        longitude: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        ts: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        ad_2: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        ad_3: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: "Data",
        timestamps: true,
    }
);

export default Data;

        