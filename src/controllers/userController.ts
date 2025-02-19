import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import userService from '../services/userService';

export class UserController {
  register = asyncHandler(async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    const result = await userService.register({ name, email, password });

    res.status(201).json({
      success: true,
      token: result.token,
      data: result.user,
    });
  });

  login = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const result = await userService.login(email, password);

    res.status(200).json({
      success: true,
      token: result.token,
      data: result.user,
    });
  });

  getProfile = asyncHandler(async (req: Request, res: Response) => {
    const user = await userService.getUserProfile(req.user!._id);

    res.status(200).json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  });

  addFavoriteBook = asyncHandler(async (req: Request, res: Response) => {
    const { bookId } = req.body;
    const user = await userService.addFavoriteBook(req.user!._id, bookId);

    res.status(200).json({
      success: true,
      message: 'Book added to favorites',
      data: {
        favorites: user.favorites,
      },
    });
  });

  removeFavoriteBook = asyncHandler(async (req: Request, res: Response) => {
    const { bookId } = req.params;
    const user = await userService.removeFavoriteBook(req.user!._id, bookId);

    res.status(200).json({
      success: true,
      message: 'Book removed from favorites',
      data: {
        favorites: user.favorites,
      },
    });
  });

  getFavoriteBooks = asyncHandler(async (req: Request, res: Response) => {
    const books = await userService.getFavoriteBooks(req.user!._id);

    res.status(200).json({
      success: true,
      count: books.length,
      data: books,
    });
  });
}

export default new UserController();