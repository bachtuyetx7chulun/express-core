export type RequestMethod = 'get' | 'post' | 'put' | 'delete' | 'patch'
export interface IRouteMethod {
  requestMethod: RequestMethod
  path: string
  query?: {
    [key: string]: string
  }
  methodName: string | symbol
}
