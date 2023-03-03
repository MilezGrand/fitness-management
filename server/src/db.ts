import { Sequelize } from 'sequelize';

export const db = new Sequelize({
  dialect: 'postgres',
  host: 'localhost',
  password: '123456',
  username: 'postgres',
  database: 'phone_book',
  port: 5432,
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