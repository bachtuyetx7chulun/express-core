/* eslint-disable @typescript-eslint/no-explicit-any */
import { IRouteMethod, MyRequest } from '@commons/definitions'
import { chalkLog, logger } from '@commons/index'
import AuthController from '@components/auth/auth.controller'
import { RootController } from '@components/root/root.controller'
import { config } from '@config/index'
import { STATUS_CODE } from '@constant/index'
import { infoLog } from '@utils/index'
import express, { Response, NextFunction } from 'express'
import helmet from 'helmet'
import { STATUS_CODES } from 'http'
import { v4 as uuidv4 } from 'uuid'
import expressOasGenerator from 'express-oas-generator'
import * as basicAuth from 'express-basic-auth'

export class Server {
  public app: express.Application

  constructor() {
    this.app = express()
    this.config()
    this.routes()
    this.documentation()
  }

  public config(): void {
    this.app.set('port', config.get('port'))
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: false }))
    this.app.use(helmet())
    this.app.use((_: MyRequest, res: Response, next: NextFunction) => {
      res.header('Access-Control-Allow-Origin', '*')
      res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
      res.header('Access-Control-Allow-Headers', '*')
      next()
    })
  }

  public routes(): void {
    const controllers = [RootController, AuthController]
    controllers.forEach((controller) => {
      const instance = new controller()
      const prefix = Reflect.getMetadata('prefix', controller)
      const routes: IRouteMethod[] = Reflect.getMetadata('routes', controller)
      routes.forEach((route) => {
        const endpoint = `${prefix}${route.path}`
        this.app[route.requestMethod](
          endpoint,
          async (req: MyRequest, res: Response) => {
            const reqId = uuidv4()
            const startTime = new Date().getTime()
            try {
              req.reqId = reqId
              const data = await (instance as any)[route.methodName](req, res)
              logger.info(infoLog(reqId, endpoint, startTime))
              return res.json({
                ...data,
                ...{ request_id: reqId },
              })
            } catch (error: any) {
              logger.error(error)
              const statusCode =
                error.statusCode || STATUS_CODE.INTERNAL_SERVER_ERROR
              return res.status(statusCode).json({
                error:
                  error.message ||
                  STATUS_CODES[STATUS_CODE.INTERNAL_SERVER_ERROR],
                request_id: reqId,
              })
            }
          }
        )
      })
    })
  }

  public documentation(): void {
    expressOasGenerator.init(this.app as any, {})
    const basic_auth_user = config.get('basic_auth_user')
    const basic_auth_password = config.get('basic_auth_password')
    this.app.use(
      '/api-docs',
      basicAuth.default({
        challenge: true,
        users: {
          [basic_auth_user]: basic_auth_password,
        },
      })
    )
  }

  public start(): void {
    this.app.listen(this.app.get('port'), () => {
      logger.info(
        `${chalkLog('Server', 'yellow')} ${chalkLog('on', 'blue')} ${chalkLog(
          'port',
          'magenta'
        )} ${chalkLog(`${this.app.get('port')}`, 'green')}`
      )
    })
  }
}
