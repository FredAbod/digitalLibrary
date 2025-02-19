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
exports.CategoryController = void 0;
const asyncHandler_1 = require("../utils/asyncHandler");
const categoryService_1 = __importDefault(require("../services/categoryService"));
class CategoryController {
    constructor() {
        this.getAllCategories = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const categories = yield categoryService_1.default.getAllCategories();
            res.status(200).json({
                success: true,
                count: categories.length,
                data: categories,
            });
        }));
        this.getCategoryById = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const category = yield categoryService_1.default.getCategoryById(req.params.id);
            res.status(200).json({
                success: true,
                data: category,
            });
        }));
        this.createCategory = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const category = yield categoryService_1.default.createCategory(req.body);
            res.status(201).json({
                success: true,
                data: category,
            });
        }));
        this.updateCategory = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const category = yield categoryService_1.default.updateCategory(req.params.id, req.body);
            res.status(200).json({
                success: true,
                data: category,
            });
        }));
        this.deleteCategory = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(this, void 0, void 0, function* () {
            yield categoryService_1.default.deleteCategory(req.params.id);
            res.status(200).json({
                success: true,
                data: {},
            });
        }));
    }
}
exports.CategoryController = CategoryController;
exports.default = new CategoryController();
