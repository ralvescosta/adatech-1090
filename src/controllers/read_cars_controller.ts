import { Request, Response } from "express";
import { ICarsRepository } from "./interfaces";

export class ReadCarsController {
  constructor(private readonly carsRepository: ICarsRepository){}

  public async getById(req: Request, res: Response): Promise<void> {
    const { id } = req.params

    try {
      const car = await this.carsRepository.findById(id)
      if(!car){
        res.status(204).send()
        return
      }  
  
      res.status(200).json(car)
      return
    }catch(err) {
      res.status(500).json({ message: 'failed, try again latter!' })
      return
    }
  }

  public async list(req: Request, res: Response): Promise<void> {
    try {
      const cars = await this.carsRepository.findAll()

      res.status(200).json(cars)
    }catch(err) {
      res.status(500).json({ message: 'failed, try again latter!' })
      return
    }
  }
}