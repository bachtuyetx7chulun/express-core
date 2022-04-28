import { IRouteMethod, RequestMethod } from '@commons/definitions'

const BaseMethod = (
  path: string,
  requestMethod: RequestMethod
): MethodDecorator => {
  return (target, propertyKey) => {
    if (!Reflect.hasMetadata('routes', target.constructor)) {
      Reflect.defineMetadata('routes', [], target.constructor)
    }

    const routes: IRouteMethod[] = Reflect.getMetadata(
      'routes',
      target.constructor
    )

    routes.push({
      requestMethod,
      path,
      methodName: propertyKey,
    })

    Reflect.defineMetadata('routes', routes, target.constructor)
  }
}

const Get = (path: string) => BaseMethod(path, 'get')
const Post = (path: string) => BaseMethod(path, 'post')
const Put = (path: string) => BaseMethod(path, 'put')
const Patch = (path: string) => BaseMethod(path, 'patch')
const Delete = (path: string) => BaseMethod(path, 'delete')

export { Get, Post, Put, Patch, Delete }
