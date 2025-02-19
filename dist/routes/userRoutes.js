"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = __importDefault(require("../controllers/userController"));
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router.post('/register', userController_1.default.register);
router.post('/login', userController_1.default.login);
router.get('/profile', auth_1.protect, userController_1.default.getProfile);
router.post('/favorites', auth_1.protect, userController_1.default.addFavoriteBook);
router.delete('/favorites/:bookId', auth_1.protect, userController_1.default.removeFavoriteBook);
router.get('/favorites', auth_1.protect, userController_1.default.getFavoriteBooks);
exports.default = router;
