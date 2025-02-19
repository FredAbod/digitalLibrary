import express from 'express';
import userController from '../controllers/userController';
import { protect } from '../middleware/auth';

const router = express.Router();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/profile', protect, userController.getProfile);
router.post('/favorites', protect, userController.addFavoriteBook);
router.delete('/favorites/:bookId', protect, userController.removeFavoriteBook);
router.get('/favorites', protect, userController.getFavoriteBooks);

export default router;
