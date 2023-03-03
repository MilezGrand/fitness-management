import { DataTypes } from 'sequelize';
import db from '../db';
import AbonementModel from './abonement.model';

const ClientModel = db.define('client', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
  },
  passport: {
    type: DataTypes.STRING,
  },
  contact: {
    type: DataTypes.STRING,
  },
  abonement: {
    type: DataTypes.INTEGER,
  },
  expires: {
    type: DataTypes.TIME,
  },
});

ClientModel.hasOne(AbonementModel, {
  sourceKey: 'abonement',
  foreignKey: 'id',
  as: 'abonement_info',
});

export default ClientModel;
