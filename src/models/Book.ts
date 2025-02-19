import mongoose, { Document, Schema } from 'mongoose';

export interface IBook extends Document {
  title: string;
  author: string;
  description: string;
  isbn: string;
  category: mongoose.Types.ObjectId;
  publishedYear: number;
  publisher: string;
  pageCount: number;
  coverImage: string;
}

const BookSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Book title is required'],
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters'],
      index: true,
    },
    author: {
      type: String,
      required: [true, 'Author name is required'],
      trim: true,
      maxlength: [50, 'Author name cannot exceed 50 characters'],
    },
    description: {
      type: String,
      required: [true, 'Book description is required'],
      trim: true,
      index: true,
    },
    isbn: {
      type: String,
      required: [true, 'ISBN is required'],
      unique: true,
      trim: true,
      maxlength: [20, 'ISBN cannot exceed 20 characters'],
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'Category is required'],
    },
    publishedYear: {
      type: Number,
      required: [true, 'Published year is required'],
    },
    publisher: {
      type: String,
      required: [true, 'Publisher name is required'],
      trim: true,
    },
    pageCount: {
      type: Number,
      required: [true, 'Page count is required'],
    },
    coverImage: {
      type: String,
      default: 'default-book-cover.jpg',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);


// Create index for search functionality
BookSchema.index({ title: 'text', description: 'text' });

export default mongoose.model<IBook>('Book', BookSchema);