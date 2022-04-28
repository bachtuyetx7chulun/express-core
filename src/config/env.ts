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
  basic_auth_user: {
    format: '*',
    default: '',
    env: 'BASIC_AUTH_USER',
  },
  basic_auth_password: {
    format: '*',
    default: '',
    env: 'BASIC_AUTH_PASSWORD',
  },
})

// Perform validation
config.validate({ allowed: 'strict' })

export { config }
