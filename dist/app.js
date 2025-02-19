"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const errorHandler_1 = require("./middleware/errorHandler");
const bookRoutes_1 = __importDefault(require("./routes/bookRoutes"));
const categoryRoutes_1 = __importDefault(require("./routes/categoryRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.configureMiddleware();
        this.configureRoutes();
        this.configureErrorHandling();
    }
    configureMiddleware() {
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use((0, cors_1.default)());
        this.app.use((0, helmet_1.default)());
        this.app.use((0, morgan_1.default)('dev'));
    }
    configureRoutes() {
        this.app.use('/api/books', bookRoutes_1.default);
        this.app.use('/api/categories', categoryRoutes_1.default);
        this.app.use('/api/users', userRoutes_1.default);
    }
    configureErrorHandling() {
        this.app.use(errorHandler_1.errorHandler);
    }
}
exports.default = new App().app;
