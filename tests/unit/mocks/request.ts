import { Request } from 'express'

export const requestMock = { } as Request

export const responseMock: any = {
  statusCode: 0,
  status: (status: number) => {
    responseMock.statusCode = status
    return {
      json: jest.fn(),
      send: jest.fn(),
    }
  },
}