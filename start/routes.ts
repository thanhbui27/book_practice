/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const UsersController = () => import('#controllers/users_controller')
const SwaggersController = () => import('#controllers/swaggers_controller')
const AuthController = () => import('#controllers/auth_controller')
const BooksController = () => import('#controllers/books_controller')
import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

router.get('/swagger', [SwaggersController, 'swaggerFun'])
router.get('/docs', [SwaggersController, 'swaggerUi'])

router.post('/auth/login', [AuthController, 'login'])
router.post('/auth/register', [AuthController, 'register'])

router
  .group(() => {
    router.get('/user', [UsersController, 'index'])
    router.post('/auth/logout', [AuthController, 'logout'])

    router.resource('book', BooksController).only(['index', 'store', 'update', 'destroy', 'show'])
  })
  .use(middleware.auth({ guards: ['api'] }))
