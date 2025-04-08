// import type { HttpContext } from '@adonisjs/core/http'

import AutoSwagger from 'adonis-autoswagger'
import router from '@adonisjs/core/services/router'
import swagger from '#config/swagger'

class SwaggersController {
  public async swaggerFun() {
    return AutoSwagger.default.docs(router.toJSON(), swagger)
  }
  public async swaggerUi() {
    return AutoSwagger.default.ui('/swagger', swagger)
    // return AutoSwagger.default.scalar("/swagger"); to use Scalar instead. If you want, you can pass proxy url as second argument here.
    // return AutoSwagger.default.rapidoc("/swagger", "view"); to use RapiDoc instead (pass "view" default, or "read" to change the render-style)
  }
}
export default SwaggersController
