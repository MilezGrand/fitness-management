import { DataTypes } from 'sequelize';
import db from '../db';
import ServiceModel from './service.model';

const OrderModel = db.define(
  'order',
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
    },
    client_id: {
      type: DataTypes.BIGINT,
    },
    service_id: {
      type: DataTypes.INTEGER,
    },
  },
  {
    tableName: 'rented_services',
  },
);

OrderModel.hasOne(ServiceModel, {
  sourceKey: 'service_id',
  foreignKey: 'id',
  as: 'service_info',
  onDelete: 'CASCADE'
});

export default OrderModel;
