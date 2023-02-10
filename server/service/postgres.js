import pg from 'pg';

export const client = new pg.Client({ 
  user: 'postgres', 
  host: 'localhost', 
  database: 'phone_book', 
  port: 5432,
  password: "123456" 
});

try {
  client.connect();
  console.log('Connected to database');
} catch (error) {
  console.log(error);
}
