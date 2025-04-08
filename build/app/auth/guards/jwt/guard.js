import { errors } from '@adonisjs/auth';
import jwt from 'jsonwebtoken';
export class JwtGuard {
    #ctx;
    #userProvider;
    #options;
    constructor(ctx, userProvider, options) {
        this.#ctx = ctx;
        this.#userProvider = userProvider;
        this.#options = options;
    }
    driverName = 'jwt';
    authenticationAttempted = false;
    isAuthenticated = false;
    user;
    async generate(user, options) {
        const providerUser = await this.#userProvider.createUserForGuard(user);
        const token = jwt.sign({ userId: providerUser.getId() }, this.#options.secret, {
            expiresIn: options?.expiresIn || '1h',
        });
        return {
            type: 'bearer',
            token: token,
        };
    }
    async authenticate() {
        if (this.authenticationAttempted) {
            return this.getUserOrFail();
        }
        this.authenticationAttempted = true;
        const authHeader = this.#ctx.request.header('authorization');
        if (!authHeader) {
            throw new errors.E_UNAUTHORIZED_ACCESS('Unauthorized access', {
                guardDriverName: this.driverName,
            });
        }
        const [, token] = authHeader.split('Bearer ');
        if (!token) {
            throw new errors.E_UNAUTHORIZED_ACCESS('Unauthorized access', {
                guardDriverName: this.driverName,
            });
        }
        const payload = jwt.verify(token, this.#options.secret);
        if (typeof payload !== 'object' || !('userId' in payload)) {
            throw new errors.E_UNAUTHORIZED_ACCESS('Unauthorized access', {
                guardDriverName: this.driverName,
            });
        }
        const providerUser = await this.#userProvider.findById(payload.userId);
        if (!providerUser) {
            throw new errors.E_UNAUTHORIZED_ACCESS('Unauthorized access', {
                guardDriverName: this.driverName,
            });
        }
        this.user = providerUser.getOriginal();
        return this.getUserOrFail();
    }
    async check() {
        try {
            await this.authenticate();
            return true;
        }
        catch {
            return false;
        }
    }
    getUserOrFail() {
        if (!this.user) {
            throw new errors.E_UNAUTHORIZED_ACCESS('Unauthorized access', {
                guardDriverName: this.driverName,
            });
        }
        return this.user;
    }
    async authenticateAsClient(user) {
        const token = await this.generate(user);
        return {
            headers: {
                authorization: `Bearer ${token.token}`,
            },
        };
    }
}
//# sourceMappingURL=guard.js.map