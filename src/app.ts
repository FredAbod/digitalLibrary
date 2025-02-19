import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { errorHandler } from './middleware/errorHandler';
import bookRoutes from './routes/bookRoutes';
import categoryRoutes from './routes/categoryRoutes';
import userRoutes from './routes/userRoutes';

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.configureMiddleware();
    this.configureRoutes();
    this.configureErrorHandling();
  }

  private configureMiddleware(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cors());
    this.app.use(helmet());
    this.app.use(morgan('dev'));
  }

  private configureRoutes(): void {
    this.app.use('/api/books', bookRoutes);
    this.app.use('/api/categories', categoryRoutes);
    this.app.use('/api/users', userRoutes);
  }

  private configureErrorHandling(): void {
    this.app.use(errorHandler);
  }
}

export default new App().app;
