import { client } from '../service/postgres.js';

export const getAllClients = async (req, res) => {
  try {
    const data = await client.query('SELECT * FROM clients');
    res.status(200).json(data.rows);
  } catch (error) {
    console.log(error);
  }
};

export const getOneClient = async (req, res) => {
  try {
    const data = await client.query(
      'SELECT * FROM clients INNER JOIN abonements ON clients.abonement = abonements.id WHERE clients.id = $1 ',
      [req.params['id']],
    );
    res.status(200).json(data.rows);
  } catch (error) {
    console.log(error);
  }
};

export const getServices = async (req, res) => {
  try {
    const data = await client.query(
      'SELECT * FROM rented_services INNER JOIN services ON rented_services.service_id = services.id WHERE client_id = $1 ORDER BY rented_services.timestamp DESC',
      [req.params['id']],
    );
    res.status(200).json(data.rows);
  } catch (error) {
    console.log(error);
  }
};

export const addNewClient = async (req, res) => {
  try {
    const data = await client.query(
      `INSERT INTO clients(id, name, passport, contact, abonement, expires) VALUES ($1, $2, $3, $4, $5, $6)`,  [req.body.id, req.body.name, req.body.passport, req.body.phone, req.body.abonementType, req.body.expires],
    );
    res.status(200).json(data.rows);
  } catch (error) {
    console.log(error);
  }
};

export const addServiceToClient = async (req, res) => {
  try {
    const data = await client.query(
      `INSERT INTO rented_services(timestamp, client_id, service_id ) VALUES ($1, $2, $3)`,  [req.body.id, req.body.client_id, req.body.service_id],
    );
    res.status(200).json(data.rows);
  } catch (error) {
    console.log(error);
  }
};

export const deleteClient = async (req, res) => {
  try {
    const data = await client.query(
      'DELETE FROM clients WHERE clients.id = $1',  [req.params['id']],
    );
    res.status(200).json(data.rows);
  } catch (error) {
    console.log(error);
  }
};

export const updateClient = async (req, res) => {
  try {
    const data = await client.query(
      `UPDATE clients SET expires = expires + (services.period::text||' days')::interval FROM services WHERE services.id = $2 AND clients.id = $1 `,  [req.params['id'], req.body.serviceId],
    );
    res.status(200).json(data.rows);
  } catch (error) {
    console.log(error);
  }
}