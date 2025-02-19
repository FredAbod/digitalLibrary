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
exports.protect = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ApiError_1 = require("../utils/ApiError");
const protect = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }
        if (!token) {
            throw new ApiError_1.ApiError(401, 'Not authorized, no token provided');
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || 'default_secret');
        const User = require('../models/User').default;
        const user = yield User.findById(decoded.id);
        if (!user) {
            throw new ApiError_1.ApiError(401, 'User not found');
        }
        req.user = user;
        next();
    }
    catch (error) {
        if (error.name === 'JsonWebTokenError') {
            next(new ApiError_1.ApiError(401, 'Invalid token'));
        }
        else {
            next(error);
        }
    }
});
exports.protect = protect;
