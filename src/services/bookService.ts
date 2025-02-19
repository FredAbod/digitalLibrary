import Book, { IBook } from '../models/Book';
import Category from '../models/Category';
import { ApiError } from '../utils/ApiError';
import mongoose from 'mongoose';

export class BookService {
  async getAllBooks(query: any = {}): Promise<{ books: IBook[], total: number, page: number, limit: number }> {
    const page = parseInt(query.page as string) || 1;
    const limit = parseInt(query.limit as string) || 10;
    const skip = (page - 1) * limit;
    
    let filterQuery: any = {};
    
    // Filter by category if provided
    if (query.category) {
      filterQuery.category = query.category;
    }
    
    // Filter by published year if provided
    if (query.year) {
      filterQuery.publishedYear = query.year;
    }

    const total = await Book.countDocuments(filterQuery);
    const books = await Book.find(filterQuery)
      .populate('category', 'name')
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });
      
    return {
      books,
      total,
      page,
      limit
    };
  }

  async getBookById(id: string): Promise<IBook> {
    const book = await Book.findById(id).populate('category', 'name description');
    if (!book) {
      throw new ApiError(404, 'Book not found');
    }
    return book;
  }

  async createBook(bookData: Partial<IBook>): Promise<IBook> {
    // Validate if category exists
    const category = await Category.findById(bookData.category);
    if (!category) {
      throw new ApiError(404, 'Category not found');
    }

    // Validate ISBN uniqueness
    if (bookData.isbn) {
      const existingBook = await Book.findOne({ isbn: bookData.isbn });
      if (existingBook) {
        throw new ApiError(400, 'Book with this ISBN already exists');
      }
    }

    return await Book.create(bookData);
  }

  async updateBook(id: string, bookData: Partial<IBook>): Promise<IBook> {
    // Validate if category exists if it's being updated
    if (bookData.category) {
      const category = await Category.findById(bookData.category);
      if (!category) {
        throw new ApiError(404, 'Category not found');
      }
    }

    // Validate ISBN uniqueness if it's being updated
    if (bookData.isbn) {
      const existingBook = await Book.findOne({ 
        isbn: bookData.isbn,
        _id: { $ne: id }
      });
      
      if (existingBook) {
        throw new ApiError(400, 'Book with this ISBN already exists');
      }
    }

    const book = await Book.findByIdAndUpdate(id, bookData, {
      new: true,
      runValidators: true,
    }).populate('category', 'name description');

    if (!book) {
      throw new ApiError(404, 'Book not found');
    }

    return book;
  }

  async deleteBook(id: string): Promise<void> {
    const book = await Book.findById(id);
    if (!book) {
      throw new ApiError(404, 'Book not found');
    }

    await Book.findByIdAndDelete(id);
  }

  async searchBooks(searchTerm: string): Promise<IBook[]> {
    if (!searchTerm || searchTerm.trim() === '') {
      throw new ApiError(400, 'Search term is required');
    }

    // Using text search for indexed fields (title and description)
    return await Book.find(
      { $text: { $search: searchTerm } },
      { score: { $meta: 'textScore' } }
    )
      .sort({ score: { $meta: 'textScore' } })
      .populate('category', 'name');
  }
}

export default new BookService();
