"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = __importDefault(require("pg"));
const sequelize_1 = require("sequelize");
const dbConfig = {
    user: 'postgres',
    host: 'localhost',
    database: 'phone_book',
    port: 5432,
    password: '123456'
};
// const dbConfig = {
//   user: 'postgres', 
//   host: '82.146.54.93', 
//   port: 5432,
//   password: '123456' 
// }
const client = new pg_1.default.Client(dbConfig);
const sequelize = new sequelize_1.Sequelize('phone_book', 'postgres', '123456', {
    dialect: 'postgres',
    host: 'localhost'
});
try {
    client.connect();
    console.log('Connected to database');
}
catch (error) {
    console.log(error);
}
exports.default = client;
