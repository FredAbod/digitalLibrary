import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import bookService from '../services/bookService';

export class BookController {
  getAllBooks = asyncHandler(async (req: Request, res: Response) => {
    const result = await bookService.getAllBooks(req.query);
    res.status(200).json({
      success: true,
      count: result.books.length,
      pagination: {
        total: result.total,
        page: result.page,
        limit: result.limit,
        pages: Math.ceil(result.total / result.limit)
      },
      data: result.books,
    });
  });

  getBookById = asyncHandler(async (req: Request, res: Response) => {
    const book = await bookService.getBookById(req.params.id);
    res.status(200).json({
      success: true,
      data: book,
    });
  });

  createBook = asyncHandler(async (req: Request, res: Response) => {
    const book = await bookService.createBook(req.body);
    res.status(201).json({
      success: true,
      data: book,
    });
  });

  updateBook = asyncHandler(async (req: Request, res: Response) => {
    const book = await bookService.updateBook(req.params.id, req.body);
    res.status(200).json({
      success: true,
      data: book,
    });
  });

  deleteBook = asyncHandler(async (req: Request, res: Response) => {
    await bookService.deleteBook(req.params.id);
    res.status(200).json({
      success: true,
      data: {},
    });
  });

  searchBooks = asyncHandler(async (req: Request, res: Response) => {
    const searchTerm = req.query.q as string;
    const books = await bookService.searchBooks(searchTerm);
    
    res.status(200).json({
      success: true,
      count: books.length,
      data: books,
    });
  });
}

export default new BookController();