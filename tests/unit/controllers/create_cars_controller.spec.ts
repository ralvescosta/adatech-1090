import { CreateCarsController } from '../../../src/controllers/create_cars_controller'
import { Request } from 'express'
import { NewCar } from '../../../src/models/cars'
import { carsRepositoryMock } from '../mocks/cars_repository'
import { responseMock, requestMock } from '../mocks/request'

describe('CreateCarsController', () => {
  function sut() {
    const controller = new CreateCarsController(carsRepositoryMock)
    const newCar: NewCar = { name: 'name', model: 'my-model', year: new Date() }
    const request = responseMock
    request.body = newCar

    return { carsRepositoryMock, controller, newCar, request }
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })
  
  it('should create a new car if there is no other car with the same name', async () => {
    //arrange
    const { carsRepositoryMock, controller, newCar, request  } = sut()
    jest.spyOn(carsRepositoryMock, 'findByName').mockResolvedValueOnce(undefined)
    jest.spyOn(carsRepositoryMock, 'create').mockResolvedValueOnce({ id: 'id', ...newCar })

    //act
    const promise = controller.create(request, responseMock)

    //assert
    await expect(promise).resolves.not.toThrow()
    expect(carsRepositoryMock.findByName).toHaveBeenCalledWith(newCar.name)
    expect(responseMock.statusCode).toEqual(201)
  })

  it('should failure if there is a car with the same name', async() => {
    //arrange
    const { carsRepositoryMock, controller, newCar, request  } = sut()
    jest.spyOn(carsRepositoryMock, 'findByName').mockResolvedValueOnce({ id: 'id', ...newCar })
    jest.spyOn(carsRepositoryMock, 'create')

    //act
    const promise = controller.create(request, responseMock)

    //assert
    await expect(promise).resolves.not.toThrow()
    expect(carsRepositoryMock.create).not.toHaveBeenCalled()
    expect(responseMock.statusCode).toEqual(409)
  })

  it('should return statusCode 500 repository throw an error', async() => {
    //arrange
    const { carsRepositoryMock, controller, request  } = sut()
    jest.spyOn(carsRepositoryMock, 'findByName').mockRejectedValueOnce(new Error('internal error'))
    jest.spyOn(carsRepositoryMock, 'create')

    //act
    const promise = controller.create(request, responseMock)

    //assert
    await expect(promise).resolves.not.toThrow()
    expect(carsRepositoryMock.create).not.toHaveBeenCalled()
    expect(responseMock.statusCode).toEqual(500)
  })
})