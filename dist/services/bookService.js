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
exports.BookService = void 0;
const Book_1 = __importDefault(require("../models/Book"));
const Category_1 = __importDefault(require("../models/Category"));
const ApiError_1 = require("../utils/ApiError");
class BookService {
    getAllBooks() {
        return __awaiter(this, arguments, void 0, function* (query = {}) {
            const page = parseInt(query.page) || 1;
            const limit = parseInt(query.limit) || 10;
            const skip = (page - 1) * limit;
            let filterQuery = {};
            // Filter by category if provided
            if (query.category) {
                filterQuery.category = query.category;
            }
            // Filter by published year if provided
            if (query.year) {
                filterQuery.publishedYear = query.year;
            }
            const total = yield Book_1.default.countDocuments(filterQuery);
            const books = yield Book_1.default.find(filterQuery)
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
        });
    }
    getBookById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const book = yield Book_1.default.findById(id).populate('category', 'name description');
            if (!book) {
                throw new ApiError_1.ApiError(404, 'Book not found');
            }
            return book;
        });
    }
    createBook(bookData) {
        return __awaiter(this, void 0, void 0, function* () {
            // Validate if category exists
            const category = yield Category_1.default.findById(bookData.category);
            if (!category) {
                throw new ApiError_1.ApiError(404, 'Category not found');
            }
            // Validate ISBN uniqueness
            if (bookData.isbn) {
                const existingBook = yield Book_1.default.findOne({ isbn: bookData.isbn });
                if (existingBook) {
                    throw new ApiError_1.ApiError(400, 'Book with this ISBN already exists');
                }
            }
            return yield Book_1.default.create(bookData);
        });
    }
    updateBook(id, bookData) {
        return __awaiter(this, void 0, void 0, function* () {
            // Validate if category exists if it's being updated
            if (bookData.category) {
                const category = yield Category_1.default.findById(bookData.category);
                if (!category) {
                    throw new ApiError_1.ApiError(404, 'Category not found');
                }
            }
            // Validate ISBN uniqueness if it's being updated
            if (bookData.isbn) {
                const existingBook = yield Book_1.default.findOne({
                    isbn: bookData.isbn,
                    _id: { $ne: id }
                });
                if (existingBook) {
                    throw new ApiError_1.ApiError(400, 'Book with this ISBN already exists');
                }
            }
            const book = yield Book_1.default.findByIdAndUpdate(id, bookData, {
                new: true,
                runValidators: true,
            }).populate('category', 'name description');
            if (!book) {
                throw new ApiError_1.ApiError(404, 'Book not found');
            }
            return book;
        });
    }
    deleteBook(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const book = yield Book_1.default.findById(id);
            if (!book) {
                throw new ApiError_1.ApiError(404, 'Book not found');
            }
            yield Book_1.default.findByIdAndDelete(id);
        });
    }
    searchBooks(searchTerm) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!searchTerm || searchTerm.trim() === '') {
                throw new ApiError_1.ApiError(400, 'Search term is required');
            }
            // Using text search for indexed fields (title and description)
            return yield Book_1.default.find({ $text: { $search: searchTerm } }, { score: { $meta: 'textScore' } })
                .sort({ score: { $meta: 'textScore' } })
                .populate('category', 'name');
        });
    }
}
exports.BookService = BookService;
exports.default = new BookService();
