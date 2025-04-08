import Book from '#models/book';
import User from '#models/user';
import { createBookValidator, validIdBook } from '#validators/books';
class BooksController {
    async index({ response }) {
        const books = await Book.all();
        return response.status(200).json({
            success: true,
            data: books,
            message: 'Lấy tất cả sách thành công',
        });
    }
    async store({ request, response }) {
        const { userId, ...payload } = await createBookValidator.validate(request.all());
        const user = await User.find(userId);
        if (!user) {
            return response.status(404).json({
                success: false,
                message: 'Tác giả k tồn tại',
            });
        }
        const book = await user.related('books').create(payload);
        return response.status(201).json({
            success: true,
            data: book,
            message: 'Tạo sách thành công',
        });
    }
    async show({ params, response }) {
        const { id } = await validIdBook.validate(params);
        const book = await Book.find(id);
        if (!book) {
            return response.status(404).json({
                success: false,
                message: 'Sách không tồn tại',
            });
        }
        return response.status(201).json({
            success: true,
            data: book,
            message: 'Lấy thông tin sách thành công',
        });
    }
    async update({ params, request, response }) {
        const { id } = await validIdBook.validate(params);
        const payload = await createBookValidator.validate(request.all());
        const book = await Book.find(id);
        const user = await User.find(payload.userId);
        if (!user) {
            return response.status(404).json({
                success: false,
                message: 'Tác giả k tồn tại',
            });
        }
        if (!book) {
            return response.status(404).json({
                success: false,
                message: 'Sách không tồn tại',
            });
        }
        const bookUpdate = await book.merge(payload).save();
        return response.status(201).json({
            success: true,
            data: bookUpdate,
            message: 'Cập nhật thông tin sách thành công',
        });
    }
    async destroy({ params, response }) {
        const { id } = await validIdBook.validate(params);
        const book = await Book.find(id);
        if (!book) {
            return response.status(404).json({
                success: false,
                message: 'Book khong ton tai',
            });
        }
        await book.delete();
        return response.status(200).json({
            success: true,
            message: 'Xóa sách thành công',
        });
    }
}
export default BooksController;
//# sourceMappingURL=books_controller.js.map