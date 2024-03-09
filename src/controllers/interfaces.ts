import { Cars, NewCar } from "../models/cars";

export interface ICarsRepository {
  create(newCar: NewCar): Promise<Cars>
  findByName(name: string): Promise<Cars | undefined>
  findById(id: string): Promise<Cars | undefined>
  findAll(): Promise<Cars[]>
}