export type Cars = {
  id: string,
  name: string,
  model: string,
  year: Date
}

export type NewCar = Omit<Cars, 'id'>