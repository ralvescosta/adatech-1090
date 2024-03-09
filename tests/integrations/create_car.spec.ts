import { fakerEN } from '@faker-js/faker'
import { CarsModel } from '../../src/db/models/cars'
import { Cars, NewCar } from '../../src/models/cars'
import { HttpServer } from '../../src/http_server'
import { sequelize } from '../../src/db/sequelize'
import request from 'supertest'

describe('POST /cars', () => {
  const car: Cars = { 
    id: fakerEN.string.uuid(), 
    name: fakerEN.lorem.word(),
    model: fakerEN.company.name(), 
    year: fakerEN.date.anytime() 
  }

  const newCar: NewCar = {
    name: fakerEN.lorem.word(),
    model: fakerEN.company.name(), 
    year: fakerEN.date.anytime() 
  }
  
  beforeEach(() => {
    jest.clearAllMocks()
  })

  beforeAll(async() => {
    await CarsModel.sequelize?.sync({ force: true })
    await CarsModel.create(car)
  })

  function sut() {
    const httpServer = new HttpServer()
    httpServer.setup()

    return { app: httpServer.app }
  }

  it('should create car and return the correctly values', async() => {
    const { app } = sut()

    const response = await request(app)
      .post('/cars')
      .send(newCar);

    expect(response.status).toEqual(201)
    expect(response.body.name).toEqual(newCar.name)
  })

  it('should return 409 if there is already a car with the same name', async () => {
    const { app } = sut()

    const response = await request(app)
      .post('/cars')
      .send({ name: car.name, model: car.model, year: car.year });

    expect(response.status).toEqual(409)
    expect(response.body.message).toEqual('already exist a car with the same name')
  })

  it('should return error if something happens to database connection', async () => {
    await sequelize.close()

    const { app } = sut()

    const response = await request(app)
      .post('/cars')
      .send(newCar);

    expect(response.status).toEqual(500)
    expect(response.body.message).toEqual('failed try again latter')
  })
})