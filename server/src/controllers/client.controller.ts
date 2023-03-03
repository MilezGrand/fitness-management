import { Request, Response } from 'express';
import { RequestWithBody, RequestWithParams } from '../types.js';
import ClientModel from '../models/client.model.js';
import AbonementModel from '../models/abonement.model.js';
import ServiceModel from '../models/service.model.js';

export class ClientController {
  async createClient(req: Request, res: Response) {
    const { id, name, passport, phone, abonementType, expires } = req.body;
    const data = await ClientModel.create({
      id: id,
      name: name,
      passport: passport,
      contact: phone,
      abonement: abonementType,
      expires: expires,
    });
    res.status(200).send(data);
  }

  async getClients(req: RequestWithBody<{ id: string }>, res: Response) {
    const data = await ClientModel.findAll({ order: [['name', 'ASC']] });
    res.status(200).send(data);
  }

  async getClient(req: RequestWithParams<{ id: string }>, res: Response) {
    const id = req.params.id;
    const data = await ClientModel.findOne({
      where: { id: id },
      include: { model: AbonementModel, as: 'abonement_info' },
    });
    res.status(200).send(data);
  }

  async updateClient(req: RequestWithBody<{ clientId: string; serviceId: string }>, res: Response) {
    const { clientId, serviceId } = req.body;

    const service = await ServiceModel.findOne({ where: { id: serviceId } });
    const client = await ClientModel.findOne({ where: { id: clientId } });
    const actualExpires = new Date(client?.dataValues.expires).getTime();

    const data = await client?.update({
      expires: new Date(actualExpires + service?.dataValues.period * 86400 * 1000),
    });

    res.status(200).send(data);
  }

  async deleteClient(req: RequestWithParams<{ id: string }>, res: Response) {
    const id = req.params.id;
    await ClientModel.destroy({ where: { id: id } });
    res.status(200).json({});
  }
}
