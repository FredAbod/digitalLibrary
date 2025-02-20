# Digital Library API

A RESTful API for managing a digital library system, built with Node.js and TypeScript.

## 📚 Features

- **Book Management**: Create, update, retrieve, and delete books
- **Category Management**: Organize books by categories
- **Search Functionality**: Search books by title or description content
- **User Favorites**: Users can maintain a personal list of favorite books
- **Authentication**: JWT-based user authentication
- **Error Handling**: Comprehensive error handling and validation

## 🛠️ Tech Stack

- **Node.js** - JavaScript runtime
- **TypeScript** - Type-safe JavaScript
- **Express** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcrypt.js** - Password hashing

## 🚀 Getting Started

### Prerequisites

- Node.js (v14+)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/FredAbod/digitalLibrary.git
cd digital-library-api
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```
NODE_ENV=development
PORT=3000
MONGO_URI=mongodb://localhost:27017/digital-library
JWT_SECRET=your_jwt_secret_key
```

4. Build the project:
```bash
npm run build
```

5. Start the development server:
```bash
npm run dev
```

## 📝 API Documentation

### Authentication Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/users/register` | Register a new user |
| POST | `/api/users/login` | User login |
| GET | `/api/users/profile` | Get user profile (Auth required) |

### Book Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/books` | Get all books (supports pagination) |
| GET | `/api/books/:id` | Get book by ID |
| POST | `/api/books` | Create new book (Auth required) |
| PUT | `/api/books/:id` | Update book (Auth required) |
| DELETE | `/api/books/:id` | Delete book (Auth required) |
| GET | `/api/books/search/books?q=searchTerm` | Search books by title/description |

### Category Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/categories` | Get all categories |
| GET | `/api/categories/:id` | Get category by ID |
| POST | `/api/categories` | Create new category (Auth required) |
| PUT | `/api/categories/:id` | Update category (Auth required) |
| DELETE | `/api/categories/:id` | Delete category (Auth required) |

### User Favorites Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users/favorites` | Get favorite books (Auth required) |
| POST | `/api/users/favorites` | Add book to favorites (Auth required) |
| DELETE | `/api/users/favorites/:bookId` | Remove book from favorites (Auth required) |

## 📦 Sample Request/Response

### Creating a Category

**Request:**
```http
POST /api/categories
Authorization: Bearer <your_jwt_token>
Content-Type: application/json

{
  "name": "Science Fiction",
  "description": "Literature that explores advanced technology, space exploration, time travel, parallel universes, and futuristic concepts"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "60f7e5a4e85d7a0015b4f0d1",
    "name": "Science Fiction",
    "description": "Literature that explores advanced technology, space exploration, time travel, parallel universes, and futuristic concepts",
    "createdAt": "2025-02-19T14:30:44.123Z",
    "updatedAt": "2025-02-19T14:30:44.123Z"
  }
}
```

### Adding a Book

**Request:**
```http
POST /api/books
Authorization: Bearer <your_jwt_token>
Content-Type: application/json

{
  "title": "Dune",
  "author": "Frank Herbert",
  "description": "Set in the distant future amidst a feudal interstellar society, Dune tells the story of young Paul Atreides, whose family accepts the stewardship of the desert planet Arrakis.",
  "isbn": "9780441172719",
  "category": "60f7e5a4e85d7a0015b4f0d1",
  "publishedYear": 1965,
  "publisher": "Chilton Books",
  "pageCount": 412,
  "coverImage": "dune-cover.jpg"
}
```

<!-- ## 🧪 Testing

Run tests using Jest:

```bash
npm run test
``` -->

## 🔒 Error Handling

The API implements a global error handler that processes errors consistently:

- **400** - Bad Request (validation errors)
- **401** - Unauthorized (authentication errors)
- **404** - Not Found (resource not found)
- **500** - Internal Server Error (unexpected errors)

Example error response:

```json
{
  "success": false,
  "message": "Book with this ISBN already exists",
  "stack": "..." // Only in development mode
}
```

## 📅 Project Structure

```
src/
├── app.ts                  # Express application setup
├── server.ts               # Server entry point
├── config/                 # Configuration files
│   └── database.ts         # Database connection
├── controllers/            # Request handlers
│   ├── bookController.ts
│   ├── categoryController.ts
│   └── userController.ts
├── middleware/             # Custom middleware
│   ├── auth.ts             # Authentication middleware
│   └── errorHandler.ts     # Global error handler
├── models/                 # Mongoose models
│   ├── Book.ts
│   ├── Category.ts
│   └── User.ts
├── routes/                 # API routes
│   ├── bookRoutes.ts
│   ├── categoryRoutes.ts
│   └── userRoutes.ts
├── services/               # Business logic
│   ├── bookService.ts
│   ├── categoryService.ts
│   └── userService.ts
└── utils/                  # Utility functions
    ├── ApiError.ts         # Custom error class
    └── asyncHandler.ts     # Async error wrapper
```

<!-- ## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📜 License

This project is licensed under the MIT License - see the LICENSE file for details. -->

<!-- ## ✨ Future Enhancements

- Add rate limiting
- Implement refresh tokens
- Add role-based access control
- Add book reviews and ratings
- Integrate with external book APIs
- Add image upload functionality -->