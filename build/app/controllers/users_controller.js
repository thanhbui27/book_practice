import User from '#models/user';
class UsersController {
    async index({ response }) {
        const users = await User.all();
        return response.status(200).json({
            success: true,
            data: users,
            message: 'Lấy tất cả User thành công',
        });
    }
}
export default UsersController;
//# sourceMappingURL=users_controller.js.map