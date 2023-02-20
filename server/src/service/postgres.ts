import pg from 'pg';
import { Sequelize } from 'sequelize';

const dbConfig = {
  user: 'postgres', 
  host: 'localhost', 
  database: 'phone_book', 
  port: 5432,
  password: '123456' 
}
// const dbConfig = {
//   user: 'postgres', 
//   host: '82.146.54.93', 
//   port: 5432,
//   password: '123456' 
// }
const client = new pg.Client(dbConfig);
const sequelize = new Sequelize('phone_book','postgres','123456', {
  dialect: 'postgres',
  host: 'localhost'
});


try {
  client.connect();
  console.log('Connected to database');
} catch (error) {
  console.log(error);
}

export default client;