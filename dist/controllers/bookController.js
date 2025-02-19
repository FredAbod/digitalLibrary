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
exports.BookController = void 0;
const asyncHandler_1 = require("../utils/asyncHandler");
const bookService_1 = __importDefault(require("../services/bookService"));
class BookController {
    constructor() {
        this.getAllBooks = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const result = yield bookService_1.default.getAllBooks(req.query);
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
        }));
        this.getBookById = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const book = yield bookService_1.default.getBookById(req.params.id);
            res.status(200).json({
                success: true,
                data: book,
            });
        }));
        this.createBook = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const book = yield bookService_1.default.createBook(req.body);
            res.status(201).json({
                success: true,
                data: book,
            });
        }));
        this.updateBook = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const book = yield bookService_1.default.updateBook(req.params.id, req.body);
            res.status(200).json({
                success: true,
                data: book,
            });
        }));
        this.deleteBook = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(this, void 0, void 0, function* () {
            yield bookService_1.default.deleteBook(req.params.id);
            res.status(200).json({
                success: true,
                data: {},
            });
        }));
        this.searchBooks = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const searchTerm = req.query.q;
            const books = yield bookService_1.default.searchBooks(searchTerm);
            res.status(200).json({
                success: true,
                count: books.length,
                data: books,
            });
        }));
    }
}
exports.BookController = BookController;
exports.default = new BookController();
