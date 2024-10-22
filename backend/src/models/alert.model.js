"use strict";
import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/configDB.js";


class Alert extends Model { }

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
    },
    {
        sequelize,
        modelName: "Alert",
        timestamps: true,
    },
);



export default Alert;
