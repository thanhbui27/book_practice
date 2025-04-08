import AutoSwagger from 'adonis-autoswagger';
import router from '@adonisjs/core/services/router';
import swagger from '#config/swagger';
class SwaggersController {
    async swaggerFun() {
        return AutoSwagger.default.docs(router.toJSON(), swagger);
    }
    async swaggerUi() {
        return AutoSwagger.default.ui('/swagger', swagger);
    }
}
export default SwaggersController;
//# sourceMappingURL=swaggers_controller.js.map