import client from '../service/postgres.js';
import Express from "express";
import { RequestWithBody, RequestWithParams } from '../types.js';

export class ServiceController {
  async getServices(req: RequestWithParams<{ id: string}>, res: Express.Response) {
    const id = req.params.id;
    const data = await client.query(
      'SELECT * FROM rented_services INNER JOIN services ON rented_services.service_id = services.id WHERE client_id = $1 ORDER BY rented_services.timestamp DESC',
      [id],
    );
    res.status(200).json(data.rows);
  }

  async createService(req: RequestWithBody<{id: string, clientId: string, serviceId: string}>, res: Express.Response) {
    const { id, clientId, serviceId } = req.body;
    const data = await client.query(
      `INSERT INTO rented_services(timestamp, client_id, service_id ) VALUES ($1, $2, $3)`,
      [id, clientId, serviceId],
    );
    res.status(200).json(data.rows);
  }
}
