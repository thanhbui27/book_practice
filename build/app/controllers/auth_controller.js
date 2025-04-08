import User from '#models/user';
import { loginValidator, registerValidator } from '#validators/user';
class AuthController {
    async login({ auth, request, response }) {
        const data = request.only(['email', 'password']);
        const { email, password } = await loginValidator.validate(data);
        const user = await User.findBy('email', email);
        if (!user) {
            return response.status(401).json({ success: false, message: 'Không tìm thấy user' });
        }
        await User.verifyCredentials(email, password);
        const token = await auth.use('jwt').generate(user);
        return response.status(200).json({
            success: true,
            data: { access_token: token.token },
            message: 'Đăng nhập thành công',
        });
    }
    async logout({ response }) {
        try {
            return response.status(200).json({ success: true, message: 'Đăng xuất thành công' });
        }
        catch (error) {
            return response.status(401).json({ success: false, message: 'Unauthorized' });
        }
    }
    async register({ request, response }) {
        const data = request.all();
        const payload = await registerValidator.validate(data);
        const user = await User.create(payload);
        return response.status(201).json({
            success: true,
            data: user,
            message: 'Đăng ký thành công',
        });
    }
}
export default AuthController;
//# sourceMappingURL=auth_controller.js.map