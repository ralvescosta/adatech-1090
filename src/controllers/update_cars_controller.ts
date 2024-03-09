import { Request, Response } from 'express'
import { NewCar } from '../models/cars'
import { ICarsRepository } from './interfaces'

export class CreateCarsController {
  constructor(
    private readonly carsRepository: ICarsRepository
  ){}

  public async update(req: Request, res: Response) {
    const newCar = req.body as NewCar
    
    try {
      const registeredCar = await this.carsRepository.findByName(newCar.name)
      if(registeredCar) {
        return res.status(409).json({ message: 'already exist a car with the same name' })
      }

      const car = await this.carsRepository.create(newCar)

      return res.status(201).json(car)
    }catch(err) {
      return res.status(500).json({ message: 'failed try again latter' })
    }
  }
}