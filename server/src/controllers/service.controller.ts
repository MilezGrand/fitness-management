import OrderModel from '../models/order.model.js';
import Express from 'express';
import { RequestWithBody, RequestWithParams } from '../types.js';
import ServiceModel from '../models/service.model.js';

export class ServiceController {
  async getServices(req: RequestWithParams<{ id: string }>, res: Express.Response) {
    const id = req.params.id;
    const data = await OrderModel.findAll({
      where: { client_id: id },
      include: { model: ServiceModel, as: 'service_info' },
      order: [['id', 'DESC']]
    });
    res.status(200).send(data);
  }

  async createService(
    req: RequestWithBody<{ id: string; clientId: string; serviceId: string }>,
    res: Express.Response,
  ) {
    const { id, clientId, serviceId } = req.body;
    const data = await OrderModel.create({
      id: id,
      client_id: clientId,
      service_id: serviceId,
    });
    res.status(200).send(data);
  }
}
