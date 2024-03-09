import Sequelize, { Model } from 'sequelize'
import { sequelize } from '../sequelize'
import { Cars } from '../../models/cars'

export class CarsModel extends Model<Cars> {}

CarsModel.init(
  {
    id: {
      type: Sequelize.STRING(36),
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING(100),
      allowNull: false
    },
    model: {
      type: Sequelize.STRING(100),
      allowNull: false
    },
    year: {
      type: Sequelize.DATE,
      allowNull: true
    }
  },
  {
    tableName: 'cars',
    sequelize
  }
)