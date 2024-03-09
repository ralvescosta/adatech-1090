import { CarsModel } from '../../src/db/models/cars'
import { Cars } from '../../src/models/cars'
import { fakerEN } from '@faker-js/faker'
import { HttpServer } from '../../src/http_server'
import request from 'supertest'
import { sequelize } from '../../src/db/sequelize'

describe('GET /cars', () => {
  const cars: Cars[] = [
    {
      id: fakerEN.string.uuid(), 
      name: fakerEN.lorem.word(), 
      model: fakerEN.company.name(), 
      year: fakerEN.date.anytime() 
    },
    {
      id: fakerEN.string.uuid(), 
      name: fakerEN.lorem.word(), 
      model: fakerEN.company.name(), 
      year: fakerEN.date.anytime() 
    }
  ]

  beforeEach(() => {
    jest.clearAllMocks()
  })

  beforeAll(async () => {
    await CarsModel.sequelize?.sync({ force: true })
    await CarsModel.bulkCreate(cars)
  })

  function sut() {
    const httpServer = new HttpServer()
    httpServer.setup()

    return { app: httpServer.app }
  }

  it('should return all cars in the database', async() => {
    const { app } = sut()

    const response = await request(app)
                              .get('/cars');

    expect(response.status).toBe(200)
    expect(response.body).toHaveLength(2)
    expect(response.body[0].name).toEqual(cars[0].name)
    expect(response.body[1].name).toEqual(cars[1].name)
  })

  it('should return error if something happens to database connection', async () => {
    await sequelize.close()

    const { app } = sut()

    const response = await request(app)
                              .get('/cars');

    expect(response.status).toEqual(500)
    expect(response.body.message).toEqual('failed, try again latter!')
  })
})