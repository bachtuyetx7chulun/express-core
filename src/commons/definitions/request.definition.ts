import { Request } from 'express'

export interface MyRequest extends Request {
  reqId?: string
  blockIp?: string
  ipNotValidated?: boolean
  adminRequestValidated?: boolean
  userInfo?: {
    [key: string]: any
  }
}
