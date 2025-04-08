export default class AuthMiddleware {
    redirectTo = '/login';
    async handle(ctx, next, options = {}) {
        try {
            await ctx.auth.authenticateUsing(options.guards, { loginRoute: this.redirectTo });
            return next();
        }
        catch (error) {
            return ctx.response.status(401).json({
                success: false,
                message: 'Unauthorized',
            });
        }
    }
}
//# sourceMappingURL=auth_middleware.js.map