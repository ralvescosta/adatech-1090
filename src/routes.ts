import { Router }  from 'express'
import { CreateCarsController } from './controllers/create_cars_controller'
import { ReadCarsController } from './controllers/read_cars_controller'

type Args = {
  createCarsController: CreateCarsController
  readCarsController: ReadCarsController
}

export function Routes({ createCarsController, readCarsController }: Args) {
  const routes = Router()

  routes.post('/cars', createCarsController.create.bind(createCarsController))

  routes.get('/cars', readCarsController.list.bind(readCarsController))
  routes.get('/cars/:id', readCarsController.getById.bind(readCarsController))

  return routes
}