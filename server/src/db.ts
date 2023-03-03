import { Sequelize } from 'sequelize';
import * as dotenv from 'dotenv';

dotenv.config();

export const db = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  username: process.env.DB_USERNAME,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
  define: {
    timestamps: false,
  },
  logging: false
})


export const openConnection = () => {
  try {
    console.log('Connected to database');
    return db.authenticate();
  } catch (error) {
    console.log(error);
  }
}

export const closeConnection = () => {
  return db.close();
}

export default db;