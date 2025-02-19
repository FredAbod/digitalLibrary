import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import categoryService from '../services/categoryService';

export class CategoryController {
  getAllCategories = asyncHandler(async (req: Request, res: Response) => {
    const categories = await categoryService.getAllCategories();
    res.status(200).json({
      success: true,
      count: categories.length,
      data: categories,
    });
  });

  getCategoryById = asyncHandler(async (req: Request, res: Response) => {
    const category = await categoryService.getCategoryById(req.params.id);
    res.status(200).json({
      success: true,
      data: category,
    });
  });

  createCategory = asyncHandler(async (req: Request, res: Response) => {
    const category = await categoryService.createCategory(req.body);
    res.status(201).json({
      success: true,
      data: category,
    });
  });

  updateCategory = asyncHandler(async (req: Request, res: Response) => {
    const category = await categoryService.updateCategory(req.params.id, req.body);
    res.status(200).json({
      success: true,
      data: category,
    });
  });

  deleteCategory = asyncHandler(async (req: Request, res: Response) => {
    await categoryService.deleteCategory(req.params.id);
    res.status(200).json({
      success: true,
      data: {},
    });
  });
}

export default new CategoryController();
