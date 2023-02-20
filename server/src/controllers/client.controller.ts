import client from '../service/postgres.js';
import { Request, Response } from 'express';
import { RequestWithBody, RequestWithParams, ResponseData } from '../types.js';
// import { Client } from '../models/client.model.js';
import { QueryResult } from 'pg';

export class ClientController {
  async createClient(req: Request, res: Response) {
    const { id, name, passport, phone, abonementType, expires } = req.body;
    await client.query(
      `INSERT INTO clients(id, name, passport, contact, abonement, expires) VALUES ($1, $2, $3, $4, $5, $6)`,
      [id, name, passport, phone, abonementType, expires],
    );
    res.status(200);
  }
  
  async getClients(req: RequestWithBody<{ id: string }>, res: Response) {
    const data = await client.query('SELECT name,id FROM clients');
    console.log(client.eventNames())
    res.send(data.rows);
  }

  async getClient(req: RequestWithParams<{ id: string }>, res: Response) {
    const id = req.params.id;
    const data = await client.query(
      'SELECT * FROM clients INNER JOIN abonements ON clients.abonement = abonements.id WHERE clients.id = $1 ',
      [id],
    );
    res.status(200).json(data.rows);
  }

  async updateClient(req: RequestWithBody<{ clientId: string; serviceId: string }>, res: Response) {
    const { clientId, serviceId } = req.body;
    const data = await client.query(
      `UPDATE clients SET expires = expires + (services.period::text||' days')::interval FROM services WHERE services.id = $2 AND clients.id = $1 `,
      [clientId, serviceId],
    );
    res.status(200).json(data.rows);
  }

  async deleteClient(req: RequestWithParams<{ id: string }>, res: Response) {
    const id = req.params.id;
    const data = await client.query('DELETE FROM clients WHERE clients.id = $1', [id]);
    res.status(200).json(data.rows);
  }
}
