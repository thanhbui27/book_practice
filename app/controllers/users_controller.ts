import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

class UsersController {
  public async index({ response }: HttpContext) {
    const users = await User.all()
    return response.json(users)
  }
}
export default UsersController
