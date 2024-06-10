"use strict";
import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/configDB.js";

class Data extends Model {}

Data.init(
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
        lat: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        lng: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        timestamp: {
            type: DataTypes.DATE,
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
        // ad_4: {
        //     type: DataTypes.FLOAT,
        //     allowNull: false,
        // },
        // ad_7: {
        //     type: DataTypes.FLOAT,
        //     allowNull: false,
        // },
        // ad_16: {
        //     type: DataTypes.FLOAT,
        //     allowNull: false,
        // },
        // ad_25: {
        //     type: DataTypes.FLOAT,
        //     allowNull: false,
        // },
    },
    {
        sequelize,
        modelName: "Data",
        timestamps: true,
    },
);

export default Data;
