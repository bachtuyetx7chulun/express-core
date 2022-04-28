import convict from 'convict'

const config = convict({
  env: {
    format: ['production', 'development', 'test'],
    default: 'development',
    env: 'NODE_ENV',
  },
  port: {
    format: 'port',
    default: 3000,
    env: 'PORT',
  },
})

// Perform validation
config.validate({ allowed: 'strict' })

export { config }
