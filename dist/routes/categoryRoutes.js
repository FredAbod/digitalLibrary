"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const categoryController_1 = __importDefault(require("../controllers/categoryController"));
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router
    .route('/')
    .get(categoryController_1.default.getAllCategories)
    .post(auth_1.protect, categoryController_1.default.createCategory);
router
    .route('/:id')
    .get(categoryController_1.default.getCategoryById)
    .put(auth_1.protect, categoryController_1.default.updateCategory)
    .delete(auth_1.protect, categoryController_1.default.deleteCategory);
exports.default = router;
