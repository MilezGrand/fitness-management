import { DataTypes } from 'sequelize';
import db from '../db';

const ServiceModel = db.define(
  'service',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    service_name: {
      type: DataTypes.STRING,
    },
    period: {
      type: DataTypes.SMALLINT,
    },
    price: {
      type: DataTypes.INTEGER,
    },
  },
  {
    tableName: 'services',
  },
);

export default ServiceModel;
