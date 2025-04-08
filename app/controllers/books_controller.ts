import Book from '#models/book'
import User from '#models/user'
import { createBookValidator, validIdBook } from '#validators/books'
import type { HttpContext } from '@adonisjs/core/http'

class BooksController {
  /**
   * @index
   * @tags Books
   * @description lấy tất cả book
   *
   * @responseBody 200 - {"success" : "true", "data" : "<Book[]>", "message" : "Lấy tất cả sách thành công"}
   * @responseBody 401 - {"success": false, "message": "Unauthorized"}
   * @responseBody 403 - {"success": false, "message": "Forbidden"}
   * @responseBody 422 - {"success": false, "message": "Invalid"}
   */
  async index({ response }: HttpContext) {
    const books = await Book.all()
    return response.status(200).json({
      success: true,
      data: books,
      message: 'Lấy tất cả sách thành công',
    })
  }

  /**
   * @store
   * @tags Books
   * @description lấy tất cả book
   *
   * @requestBody {"title": "Lorem Ipsum","userId":1,"year_of_publicaion": "Lorem Ipsum","abridge": "Lorem Ipsum","price": 10}
   * @responseBody 201 - {"success" : "true", "data" : "<Book>", "message" : "Tạo sách thành công"}
   * @responseBody 400 - {"success": false, "message": "Có lỗi xảy ra"}
   * @responseBody 401 - {"success": false, "message": "Unauthorized"}
   * @responseBody 403 - {"success": false, "message": "Forbidden"}
   * @responseBody 404 - {"success": false, "message": "User not found"}
   * @responseBody 422 - {"success": false, "message": "Invalid"}
   */
  async store({ request, response }: HttpContext) {
    const { userId, ...payload } = await createBookValidator.validate(request.all())
    const user = await User.find(userId)
    if (!user) {
      return response.status(404).json({
        success: false,
        message: 'Tác giả k tồn tại',
      })
    }
    const book = await user.related('books').create(payload)

    return response.status(201).json({
      success: true,
      data: book,
      message: 'Tạo sách thành công',
    })
  }

  /**
   * @show
   * @tags Books
   * @description lấy book theo id
   *
   * @responseBody 201 - {"success" : "true", "data" : "<Book>", "message" : "Lấy sách thành công"}
   * @responseBody 400 - {"success": false, "message": "Có lỗi xảy ra"}
   * @responseBody 401 - {"success": false, "message": "Unauthorized"}
   * @responseBody 403 - {"success": false, "message": "Forbidden"}
   * @responseBody 404 - {"success": false, "message": "Book k ton tai"}
   * @responseBody 422 - {"success": false, "message": "Invalid"}
   */
  async show({ params, response }: HttpContext) {
    const { id } = await validIdBook.validate(params)
    const book = await Book.find(id)
    if (!book) {
      return response.status(404).json({
        success: false,
        message: 'Sách không tồn tại',
      })
    }
    return response.status(201).json({
      success: true,
      data: book,
      message: 'Lấy thông tin sách thành công',
    })
  }

  /**
   * @update
   * @tags Books
   * @description update book theo id
   *
   * @requestBody {"title": "Lorem Ipsum","userId":1,"year_of_publicaion": "Lorem Ipsum","abridge": "Lorem Ipsum","price": 10}
   *
   * @responseBody 201 - {"success" : "true", "data" : "<Book>", "message" : "Lấy sách thành công"}
   * @responseBody 400 - {"success": false, "message": "Có lỗi xảy ra"}
   * @responseBody 401 - {"success": false, "message": "Unauthorized"}
   * @responseBody 403 - {"success": false, "message": "Forbidden"}
   * @responseBody 404 - {"success": false, "message": "Book k ton tai"}
   * @responseBody 422 - {"success": false, "message": "Invalid"}
   */
  async update({ params, request, response }: HttpContext) {
    const { id } = await validIdBook.validate(params)
    const payload = await createBookValidator.validate(request.all())
    const book = await Book.find(id)
    const user = await User.find(payload.userId)
    if (!user) {
      return response.status(404).json({
        success: false,
        message: 'Tác giả k tồn tại',
      })
    }
    if (!book) {
      return response.status(404).json({
        success: false,
        message: 'Sách không tồn tại',
      })
    }
    const bookUpdate = await book.merge(payload).save()
    return response.status(201).json({
      success: true,
      data: bookUpdate,
      message: 'Cập nhật thông tin sách thành công',
    })
  }

  /**
   * @destroy
   * @tags Books
   * @description delete book theo id
   *
   * @requestBody {"title": "Lorem Ipsum","userId":1,"year_of_publicaion": "Lorem Ipsum","abridge": "Lorem Ipsum","price": 10}
   *
   * @responseBody 201 - {"success" : true,  "message" : "Xóa sách thành công"}
   * @responseBody 400 - {"success": false, "message": "Có lỗi xảy ra"}
   * @responseBody 401 - {"success": false, "message": "Unauthorized"}
   * @responseBody 403 - {"success": false, "message": "Forbidden"}
   * @responseBody 404 - {"success": false, "message": "Book k ton tai"}
   * @responseBody 422 - {"success": false, "message": "Invalid"}
   */
  async destroy({ params, response }: HttpContext) {
    const { id } = await validIdBook.validate(params)
    const book = await Book.find(id)
    if (!book) {
      return response.status(404).json({
        success: false,
        message: 'Book khong ton tai',
      })
    }
    await book.delete()
    return response.status(200).json({
      success: true,
      message: 'Xóa sách thành công',
    })
  }
}
export default BooksController
