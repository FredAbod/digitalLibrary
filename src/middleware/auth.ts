import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ApiError } from '../utils/ApiError';
import { IUser } from '../models/User';

interface DecodedToken {
  id: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      throw new ApiError(401, 'Not authorized, no token provided');
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'default_secret'
    ) as DecodedToken;

    const User = require('../models/User').default;
    const user = await User.findById(decoded.id);

    if (!user) {
      throw new ApiError(401, 'User not found');
    }

    req.user = user;
    next();
  } catch (error) {
    if ((error as Error).name === 'JsonWebTokenError') {
      next(new ApiError(401, 'Invalid token'));
    } else {
      next(error);
    }
  }
};