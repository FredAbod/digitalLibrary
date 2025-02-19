import express from 'express';
import bookController from '../controllers/bookController';
import { protect } from '../middleware/auth';

const router = express.Router();

router
  .route('/')
  .get(bookController.getAllBooks)
  .post(protect, bookController.createBook);

router
  .route('/:id')
  .get(bookController.getBookById)
  .put(protect, bookController.updateBook)
  .delete(protect, bookController.deleteBook);

router.get('/search/books', bookController.searchBooks);

export default router;