import express from 'express'
import helmet from 'helmet'
import cors from 'cors'

import { Routes } from './routes'
import { CarsRepository } from './repositories/cars_repository'
import { CreateCarsController } from './controllers/create_cars_controller'
import { ReadCarsController } from './controllers/read_cars_controller'

export class HttpServer {
  private _app: express.Express

  constructor() {
    this._app = express()
  }

  public setup() {
    this._app.use(express.json())
    this._app.use(helmet())
    this._app.use(cors())

    const carsRepository = new CarsRepository()
    const createCarsController = new CreateCarsController(carsRepository)
    const readCarsController = new ReadCarsController(carsRepository)

    this._app.use(Routes({ createCarsController, readCarsController }))
  }

  public start() {
    this._app.listen(3000, () => console.log('running'))
  }

  get app(): express.Express {
    return this._app
  }
}
