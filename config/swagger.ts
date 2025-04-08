import env from '#start/env'
import path from 'node:path'
import url from 'node:url'

export default {
  path: path.dirname(url.fileURLToPath(import.meta.url)) + '/../',
  title: 'book',
  version: '1.0.0',
  description: 'api for book',
  tagIndex: 2,
  productionEnv: env.get('APP_ENV'),
  info: {
    title: 'book',
    version: '1.0.0',
    description: '',
  },
  snakeCase: true,

  debug: false,
  ignore: ['/swagger', '/docs'],
  preferredPutPatch: 'PUT',
  common: {
    parameters: {}, // OpenAPI conform parameters that are commonly used
    headers: {}, // OpenAPI conform headers that are commonly used
  },
  securitySchemes: {},
  authMiddlewares: ['auth', 'auth:api'],
  defaultSecurityScheme: 'BearerAuth',
  persistAuthorization: true,
  showFullPath: false,
}
