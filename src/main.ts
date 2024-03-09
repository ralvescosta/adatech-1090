import { HttpServer } from './http_server';

;(() => {
  const httpServer = new HttpServer()

  httpServer.setup()
  httpServer.start()
})()