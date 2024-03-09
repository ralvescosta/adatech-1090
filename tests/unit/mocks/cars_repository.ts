import { ICarsRepository } from "../../../src/controllers/interfaces"
import { Cars, NewCar } from "../../../src/models/cars"

export const carsRepositoryMock: ICarsRepository = {
  create: (newCar: NewCar): Promise<Cars> => {
    return jest.fn as any
  },

  findByName: (name: string): Promise<Cars | undefined> => {
    return jest.fn as any
  },

  findById: (id: string): Promise<Cars | undefined> => jest.fn as any,

  findAll: (): Promise<Cars[]> => jest.fn as any
}