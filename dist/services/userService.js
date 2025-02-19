"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const User_1 = __importDefault(require("../models/User"));
const Book_1 = __importDefault(require("../models/Book"));
const ApiError_1 = require("../utils/ApiError");
const mongoose_1 = __importDefault(require("mongoose"));
class UserService {
    register(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, password } = userData;
            // Check if user already exists
            const existingUser = yield User_1.default.findOne({ email });
            if (existingUser) {
                throw new ApiError_1.ApiError(400, 'User with this email already exists');
            }
            // Create user
            const user = yield User_1.default.create({
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
        });
    }
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            // Find user by email
            const user = yield User_1.default.findOne({ email }).select('+password');
            if (!user) {
                throw new ApiError_1.ApiError(401, 'Invalid email or password');
            }
            // Verify password
            const isPasswordMatch = yield user.comparePassword(password);
            if (!isPasswordMatch) {
                throw new ApiError_1.ApiError(401, 'Invalid email or password');
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
        });
    }
    getUserProfile(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.default.findById(userId);
            if (!user) {
                throw new ApiError_1.ApiError(404, 'User not found');
            }
            return user;
        });
    }
    addFavoriteBook(userId, bookId) {
        return __awaiter(this, void 0, void 0, function* () {
            // Validate if book exists
            const book = yield Book_1.default.findById(bookId);
            if (!book) {
                throw new ApiError_1.ApiError(404, 'Book not found');
            }
            // Find user and update favorites
            const user = yield User_1.default.findById(userId);
            if (!user) {
                throw new ApiError_1.ApiError(404, 'User not found');
            }
            // Check if book is already in favorites
            if (user.favorites.includes(new mongoose_1.default.Types.ObjectId(bookId))) {
                throw new ApiError_1.ApiError(400, 'Book is already in favorites');
            }
            user.favorites.push(new mongoose_1.default.Types.ObjectId(bookId));
            yield user.save();
            return user;
        });
    }
    removeFavoriteBook(userId, bookId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.default.findById(userId);
            if (!user) {
                throw new ApiError_1.ApiError(404, 'User not found');
            }
            // Check if book is in favorites
            if (!user.favorites.includes(new mongoose_1.default.Types.ObjectId(bookId))) {
                throw new ApiError_1.ApiError(400, 'Book is not in favorites');
            }
            user.favorites = user.favorites.filter((id) => id.toString() !== bookId);
            yield user.save();
            return user;
        });
    }
    getFavoriteBooks(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.default.findById(userId);
            if (!user) {
                throw new ApiError_1.ApiError(404, 'User not found');
            }
            // Get all favorite books with populated category
            const favoriteBooks = yield Book_1.default.find({
                _id: { $in: user.favorites },
            }).populate('category', 'name');
            return favoriteBooks;
        });
    }
}
exports.UserService = UserService;
exports.default = new UserService();
