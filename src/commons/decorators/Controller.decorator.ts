export const Controller = (prefix: string): ClassDecorator => {
  return (target) => {
    Reflect.defineMetadata('prefix', prefix, target)
    if (!Reflect.hasMetadata('routes', target)) {
      Reflect.defineMetadata('routes', [], target)
    }
  }
}
