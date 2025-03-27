import { Injectable, NestMiddleware } from '@nestjs/common'
import { NextFunction, Request, Response } from 'express'
import Logging from 'library/Logging'

@Injectable()
export class LoggerMiddleWare implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // Getting the request log
    Logging.info(
      `Incomming -> Method [${req.method}] - URL: [${req.originalUrl}] - HOST: [${req.hostname}] IP: [${res.socket.remoteAddress}]`,
    )
    if (next) {
      next()
    }
  }
}
