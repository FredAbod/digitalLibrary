import express from 'express';
import categoryController from '../controllers/categoryController';
import { protect } from '../middleware/auth';

const router = express.Router();

router
  .route('/')
  .get(categoryController.getAllCategories)
  .post(protect, categoryController.createCategory);

router
  .route('/:id')
  .get(categoryController.getCategoryById)
  .put(protect, categoryController.updateCategory)
  .delete(protect, categoryController.deleteCategory);

export default router;
