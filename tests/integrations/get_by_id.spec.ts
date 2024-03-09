import { fakerEN } from '@faker-js/faker'
import request from 'supertest'
import { CarsModel } from '../../src/db/models/cars'
import { Cars } from '../../src/models/cars'
import { HttpServer } from '../../src/http_server'
import { sequelize } from '../../src/db/sequelize'

describe('GET /cars/:id', () => {
  const car: Cars = { 
    id: fakerEN.string.uuid(), 
    name: fakerEN.lorem.word(),
    model: fakerEN.company.name(), 
    year: fakerEN.date.anytime() 
  }


  beforeEach(() => {
    jest.clearAllMocks()
  })

  beforeAll( async() => {
    await CarsModel.sequelize?.sync({ force: true })
    await CarsModel.create(car)
  })

  function sut() {
    const httpServer = new HttpServer()
    httpServer.setup()

    return { app: httpServer.app }
  }


  it('should return a car with this car id exist in the database', async () => {
    //arrange
    const { app } = sut()

    //act
    const response = await request(app)
      .get('/cars/' + car.id);

    //assert
    expect(response.status).toEqual(200)
    expect(response.body.name).toEqual(car.name)
    expect(response.body.model).toEqual(car.model)
  })

  it('should return empty body with status code 204 with the id provided is not present in the database', async () => {
    //arrange
    const { app } = sut()

    //act
    const response = await request(app)
      .get('/cars/' + fakerEN.string.uuid());

    //assert
    expect(response.status).toEqual(204)
    expect(response.body).toEqual({})
  })

  // MUST BE THE LAST TEST
  it('should return error if something happens to database connection', async () => {
    await sequelize.close()

    const { app } = sut()

    const response = await request(app)
      .get('/cars/' + car.id);

    expect(response.status).toEqual(500)
    expect(response.body.message).toEqual('failed, try again latter!')
  })
})