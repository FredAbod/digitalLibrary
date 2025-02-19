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
exports.UserController = void 0;
const asyncHandler_1 = require("../utils/asyncHandler");
const userService_1 = __importDefault(require("../services/userService"));
class UserController {
    constructor() {
        this.register = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const { name, email, password } = req.body;
            const result = yield userService_1.default.register({ name, email, password });
            res.status(201).json({
                success: true,
                token: result.token,
                data: result.user,
            });
        }));
        this.login = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            const result = yield userService_1.default.login(email, password);
            res.status(200).json({
                success: true,
                token: result.token,
                data: result.user,
            });
        }));
        this.getProfile = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const user = yield userService_1.default.getUserProfile(req.user._id);
            res.status(200).json({
                success: true,
                data: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                },
            });
        }));
        this.addFavoriteBook = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const { bookId } = req.body;
            const user = yield userService_1.default.addFavoriteBook(req.user._id, bookId);
            res.status(200).json({
                success: true,
                message: 'Book added to favorites',
                data: {
                    favorites: user.favorites,
                },
            });
        }));
        this.removeFavoriteBook = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const { bookId } = req.params;
            const user = yield userService_1.default.removeFavoriteBook(req.user._id, bookId);
            res.status(200).json({
                success: true,
                message: 'Book removed from favorites',
                data: {
                    favorites: user.favorites,
                },
            });
        }));
        this.getFavoriteBooks = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const books = yield userService_1.default.getFavoriteBooks(req.user._id);
            res.status(200).json({
                success: true,
                count: books.length,
                data: books,
            });
        }));
    }
}
exports.UserController = UserController;
exports.default = new UserController();
