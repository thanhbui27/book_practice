import app from '@adonisjs/core/services/app';
import { ExceptionHandler } from '@adonisjs/core/http';
import { errors } from '@vinejs/vine';
export default class HttpExceptionHandler extends ExceptionHandler {
    debug = !app.inProduction;
    async handle(error, ctx) {
        if (error instanceof errors.E_VALIDATION_ERROR) {
            ctx.response.status(422).json({
                success: false,
                message: error.messages
                    .map((e) => e.message)
                    .reduce((pre, curr) => `${pre} ${curr}`, ''),
            });
            return;
        }
        return super.handle(error, ctx);
    }
    async report(error, ctx) {
        return super.report(error, ctx);
    }
}
//# sourceMappingURL=handler.js.map