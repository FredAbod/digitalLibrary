"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const ApiError_1 = require("../utils/ApiError");
const errorHandler = (err, req, res, next) => {
    if (err instanceof ApiError_1.ApiError) {
        res.status(err.statusCode).json({
            success: false,
            message: err.message,
            stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
        });
    }
    else {
        console.error('Unexpected error:', err);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
        });
    }
};
exports.errorHandler = errorHandler;
