"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../db"));
const abonement_model_1 = __importDefault(require("./abonement.model"));
const ClientModel = db_1.default.define('client', {
    id: {
        type: sequelize_1.DataTypes.BIGINT,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
    },
    passport: {
        type: sequelize_1.DataTypes.STRING,
    },
    contact: {
        type: sequelize_1.DataTypes.STRING,
    },
    abonement: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    expires: {
        type: sequelize_1.DataTypes.TIME,
    },
});
ClientModel.hasOne(abonement_model_1.default, {
    sourceKey: 'abonement',
    foreignKey: 'id',
    as: 'abonement_info',
});
exports.default = ClientModel;
