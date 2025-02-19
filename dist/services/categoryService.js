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
exports.CategoryService = void 0;
const Category_1 = __importDefault(require("../models/Category"));
const ApiError_1 = require("../utils/ApiError");
class CategoryService {
    getAllCategories() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Category_1.default.find();
        });
    }
    getCategoryById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const category = yield Category_1.default.findById(id);
            if (!category) {
                throw new ApiError_1.ApiError(404, 'Category not found');
            }
            return category;
        });
    }
    createCategory(categoryData) {
        return __awaiter(this, void 0, void 0, function* () {
            // Check if category with same name already exists
            const existingCategory = yield Category_1.default.findOne({ name: categoryData.name });
            if (existingCategory) {
                throw new ApiError_1.ApiError(400, 'Category with this name already exists');
            }
            return yield Category_1.default.create(categoryData);
        });
    }
    updateCategory(id, categoryData) {
        return __awaiter(this, void 0, void 0, function* () {
            const category = yield Category_1.default.findByIdAndUpdate(id, categoryData, {
                new: true,
                runValidators: true,
            });
            if (!category) {
                throw new ApiError_1.ApiError(404, 'Category not found');
            }
            return category;
        });
    }
    deleteCategory(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const category = yield Category_1.default.findById(id);
            if (!category) {
                throw new ApiError_1.ApiError(404, 'Category not found');
            }
            // Check if category is being used by books
            const Book = require('../models/Book').default;
            const hasBooks = yield Book.exists({ category: id });
            if (hasBooks) {
                throw new ApiError_1.ApiError(400, 'Cannot delete category that contains books');
            }
            yield Category_1.default.deleteOne({ _id: id });
        });
    }
}
exports.CategoryService = CategoryService;
exports.default = new CategoryService();
