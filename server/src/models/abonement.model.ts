import { DataTypes } from 'sequelize';
import db from '../db';

const AbonementModel = db.define(
  'abonement',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    abonement_name: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: 'abonements',
  },
);

export default AbonementModel;
