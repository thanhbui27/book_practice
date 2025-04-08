import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

class UsersController {
  /**
   * @index
   * @tags User
   * @description lấy tất cả book
   *
   * @responseBody 200 - {"success" : "true", "data" : "<User[]>", "message" : "Lấy tất cả User thành công"}
   * @responseBody 401 - {"success": false, "message": "Unauthorized"}
   * @responseBody 403 - {"success": false, "message": "Forbidden"}
   * @responseBody 422 - {"success": false, "message": "Invalid"}
   */
  public async index({ response }: HttpContext) {
    const users = await User.all()
    return response.status(200).json({
      success: true,
      data: users,
      message: 'Lấy tất cả User thành công',
    })
  }
}
export default UsersController
