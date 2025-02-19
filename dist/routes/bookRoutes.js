"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bookController_1 = __importDefault(require("../controllers/bookController"));
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router
    .route('/')
    .get(bookController_1.default.getAllBooks)
    .post(auth_1.protect, bookController_1.default.createBook);
router
    .route('/:id')
    .get(bookController_1.default.getBookById)
    .put(auth_1.protect, bookController_1.default.updateBook)
    .delete(auth_1.protect, bookController_1.default.deleteBook);
router.get('/search/books', bookController_1.default.searchBooks);
exports.default = router;
