import User from '#models/user'
import { loginValidator, registerValidator } from '#validators/user'
import type { HttpContext } from '@adonisjs/core/http'

class AuthController {
  /**
   * @login
   * @description Đăng nhập
   * @tags Auth
   *
   * @requestBody {"email": "string", "password": "string"}
   * @responseBody 200 - {"success": true, "data": {"access_token": "string"}, "message": "Đăng nhập thành công"}
   * @responseBody 401 - {"success": false, "message": "Unauthorized"}
   */
  public async login({ auth, request, response }: HttpContext) {
    const data = request.only(['email', 'password'])

    const { email, password } = await loginValidator.validate(data)
    const user = await User.findBy('email', email)

    if (!user) {
      return response.status(401).json({ success: false, message: 'Không tìm thấy user' })
    }
    await User.verifyCredentials(email, password)

    const token = await auth.use('jwt').generate(user)
    return response.status(200).json({
      success: true,
      data: { access_token: token.token },
      message: 'Đăng nhập thành công',
    })
  }

  /**
   * @logout
   * @description logout
   * @tags Auth
   *
   * @responseBody 200 - {"success": true, "message": "Đăng xuất thành công"}
   * @responseBody 401 - {"success": false, "message": "Unauthorized"}
   */
  public async logout({ auth, response }: HttpContext) {
    try {
      return response.status(200).json({ success: true, message: 'Đăng xuất thành công' })
    } catch (error) {
      return response.status(401).json({ success: false, message: 'Unauthorized' })
    }
  }

  /**
   * @register
   * @tags Auth
   * @description đăng ký người dùng
   *
   * @requestBody { "fullName" : "string", "email" : "string", "password" : "string"}
   *
   * @responseBody 201 - {"success": true,"data" : "<User>", "message": "Đăng ký thành công"}
   * @responseBody 400 - {"success": false, "message": "Email đã tồn tại"}
   */
  public async register({ request, response }: HttpContext) {
    const data = request.all()
    const payload = await registerValidator.validate(data)
    const user = await User.create(payload)
    return response.status(201).json({
      success: true,
      data: user,
      message: 'Đăng ký thành công',
    })
  }
}

export default AuthController
