import { ReadCarsController } from '../../../src/controllers/read_cars_controller'
import { Cars } from '../../../src/models/cars'
import { carsRepositoryMock } from '../mocks/cars_repository'
import { requestMock, responseMock } from '../mocks/request'
import { fakerEN } from '@faker-js/faker'

describe('ReadCarsController', () => {
  function sut() {
    const controller = new ReadCarsController(carsRepositoryMock)
    const carMock: Cars = { id: fakerEN.string.uuid(), model: fakerEN.company.name(), name: fakerEN.lorem.words(), year: fakerEN.date.anytime() }
    const request = requestMock
    request.params = { id: carMock.id }

    return { controller, carMock, request }
  }

  describe('getById', () => {
    it('should return a car if there is car in database with the same id', async () => {
      //arrange
      const { controller, carMock, request } = sut()
      jest.spyOn(carsRepositoryMock, 'findById').mockResolvedValueOnce(carMock)

      //act
      const promise = controller.getById(request, responseMock)

      //assert
      await expect(promise).resolves.not.toThrow()
      expect(carsRepositoryMock.findById).toHaveBeenCalledWith(carMock.id)
      expect(responseMock.statusCode).toEqual(200)
    })

    it('should return um empty body and status code 204 when there is no car with the id provided', async () => {
      //arrange
      const { controller, carMock, request } = sut()
      jest.spyOn(carsRepositoryMock, 'findById').mockResolvedValueOnce(undefined)

      //act
      const promise = controller.getById(request, responseMock)

      //assert
      await expect(promise).resolves.not.toThrow()
      expect(carsRepositoryMock.findById).toHaveBeenCalledWith(carMock.id)
      expect(responseMock.statusCode).toEqual(204)
    })

    it('should return status code 5xx if some error occur in the database layer', async () => {
      //arrange
      const { controller, carMock, request } = sut()
      jest.spyOn(carsRepositoryMock, 'findById').mockRejectedValueOnce(new Error('some error'))

      //act
      const promise = controller.getById(request, responseMock)

      //assert
      await expect(promise).resolves.not.toThrow()
      expect(carsRepositoryMock.findById).toHaveBeenCalledWith(carMock.id)
      expect(responseMock.statusCode).toEqual(500)
    })
  })

  describe('listAll', () => {
    it.todo('should return all cars in the table')

    it.todo('should return status code 5xx if some error occur in the database layer')
  })
})