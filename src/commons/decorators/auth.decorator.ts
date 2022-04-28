import { MyRequest } from '@commons/definitions'

const Authentiacte = (): MethodDecorator => {
  return (_, __, descriptor: any) => {
    const original = descriptor.value
    descriptor.value = function (...args: any[]) {
      const request: MyRequest = args[0]
      request.blockIp = '171.238.75.217'
      return original.apply(this, args)
    }
    return descriptor
  }
}

export { Authentiacte }
