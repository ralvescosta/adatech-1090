import { Sequelize } from 'sequelize'
import sequelizeConfig from './configs'

export const sequelize = new Sequelize(
  {
    ...sequelizeConfig as any,
    define: {
      timestamps: true,
      underscored: true,
      underscoredAll: true,
      freezeTableName: true,
      paranoid: true,
    }
  }
)
