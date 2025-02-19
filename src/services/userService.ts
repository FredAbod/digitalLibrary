import User, { IUser } from '../models/User';
import Book, { IBook } from '../models/Book';
import { ApiError } from '../utils/ApiError';
import mongoose from 'mongoose';

export interface AuthResponse {
  token: string;
  user: {
    _id: string;
    name: string;
    email: string;
  };
}

export class UserService {
  async register(userData: { name: string; email: string; password: string }): Promise<AuthResponse> {
    const { name, email, password } = userData;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new ApiError(400, 'User with this email already exists');
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password,
    });

    const token = user.generateAuthToken();

    return {
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    };
  }

  async login(email: string, password: string): Promise<AuthResponse> {
    // Find user by email
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      throw new ApiError(401, 'Invalid email or password');
    }

    // Verify password
    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
      throw new ApiError(401, 'Invalid email or password');
    }

    const token = user.generateAuthToken();

    return {
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    };
  }

  async getUserProfile(userId: string): Promise<IUser> {
    const user = await User.findById(userId);
    if (!user) {
      throw new ApiError(404, 'User not found');
    }
    return user;
  }

  async addFavoriteBook(userId: string, bookId: string): Promise<IUser> {
    // Validate if book exists
    const book = await Book.findById(bookId);
    if (!book) {
      throw new ApiError(404, 'Book not found');
    }

    // Find user and update favorites
    const user = await User.findById(userId);
    if (!user) {
      throw new ApiError(404, 'User not found');
    }

    // Check if book is already in favorites
    if (user.favorites.includes(new mongoose.Types.ObjectId(bookId))) {
      throw new ApiError(400, 'Book is already in favorites');
    }

    user.favorites.push(new mongoose.Types.ObjectId(bookId));
    await user.save();

    return user;
  }

  async removeFavoriteBook(userId: string, bookId: string): Promise<IUser> {
    const user = await User.findById(userId);
    if (!user) {
      throw new ApiError(404, 'User not found');
    }

    // Check if book is in favorites
    if (!user.favorites.includes(new mongoose.Types.ObjectId(bookId))) {
      throw new ApiError(400, 'Book is not in favorites');
    }

    user.favorites = user.favorites.filter(
      (id) => id.toString() !== bookId
    );
    await user.save();

    return user;
  }

  async getFavoriteBooks(userId: string): Promise<IBook[]> {
    const user = await User.findById(userId);
    if (!user) {
      throw new ApiError(404, 'User not found');
    }

    // Get all favorite books with populated category
    const favoriteBooks = await Book.find({
      _id: { $in: user.favorites },
    }).populate('category', 'name');

    return favoriteBooks;
  }
}

export default new UserService();
