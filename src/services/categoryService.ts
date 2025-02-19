import Category, { ICategory } from '../models/Category';
import { ApiError } from '../utils/ApiError';

export class CategoryService {
  async getAllCategories(): Promise<ICategory[]> {
    return await Category.find();
  }

  async getCategoryById(id: string): Promise<ICategory> {
    const category = await Category.findById(id);
    if (!category) {
      throw new ApiError(404, 'Category not found');
    }
    return category;
  }

  async createCategory(categoryData: Partial<ICategory>): Promise<ICategory> {
    // Check if category with same name already exists
    const existingCategory = await Category.findOne({ name: categoryData.name });
    if (existingCategory) {
      throw new ApiError(400, 'Category with this name already exists');
    }
    
    return await Category.create(categoryData);
  }

  async updateCategory(
    id: string,
    categoryData: Partial<ICategory>
  ): Promise<ICategory> {
    const category = await Category.findByIdAndUpdate(id, categoryData, {
      new: true,
      runValidators: true,
    });

    if (!category) {
      throw new ApiError(404, 'Category not found');
    }

    return category;
  }

  async deleteCategory(id: string): Promise<void> {
    const category = await Category.findById(id);
    if (!category) {
      throw new ApiError(404, 'Category not found');
    }

    // Check if category is being used by books
    const Book = require('../models/Book').default;
    const hasBooks = await Book.exists({ category: id });
    if (hasBooks) {
      throw new ApiError(400, 'Cannot delete category that contains books');
    }

    await Category.deleteOne({ _id: id });
  }
}

export default new CategoryService();