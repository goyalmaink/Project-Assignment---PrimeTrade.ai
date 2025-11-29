import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
// import { Role } from '@prisma/client';
type Role = 'USER' | 'ADMIN';

interface JwtPayload {
    userId: string;
    email: string;
    role: Role;
}

declare global {
    namespace Express {
        interface Request {
            user?: JwtPayload;
        }
    }
}

export const authenticate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            res.status(401).json({
                success: false,
                message: 'No token provided',
            });
            return;
        }

        const token = authHeader.substring(7);

        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            throw new Error('JWT_SECRET is not defined');
        }

        const decoded = jwt.verify(token, jwtSecret) as JwtPayload;

        req.user = decoded;

        next();
    } catch (error: any) {
        if (error.name === 'JsonWebTokenError') {
            res.status(401).json({
                success: false,
                message: 'Invalid token',
            });
        } else if (error.name === 'TokenExpiredError') {
            res.status(401).json({
                success: false,
                message: 'Token expired',
            });
        } else {
            res.status(500).json({
                success: false,
                message: 'Authentication error',
            });
        }
    }
};

export const isAdmin = (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
        res.status(401).json({
            success: false,
            message: 'Authentication required',
        });
        return;
    }

    if (req.user.role !== 'ADMIN') {
        res.status(403).json({
            success: false,
            message: 'Admin access required',
        });
        return;
    }

    next();
};