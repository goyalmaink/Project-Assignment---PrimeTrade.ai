import bcrypt from 'bcrypt';
import type { Request, Response } from 'express';
import { prisma } from '../lib/prisma';
import jwt from 'jsonwebtoken'

interface LoginBody {
    email: string,
    password: string
}

export const register = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("printing the hassed passsword", hashedPassword);
        const newUser = await prisma.user.create({
            data: {
                email,
                passwordHash: hashedPassword,
            },
        });
        const { passwordHash, ...userinfo } = newUser;

        res.status(201).json({ message: 'User registered successfully', user: userinfo });
    } catch (error: any) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body as LoginBody
        if (!email || !password) {
            res.status(400).json({ message: 'Email and password are required.' })
            return
        }
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })
        if (!user) {
            res.status(401).json({ message: 'User Not Found.' })
            return
        }
        const passwordvalidation = await bcrypt.compare(password, user.passwordHash)
        if (!passwordvalidation) {
            res.status(401).json({ message: 'Password is  incorrect ' })
            return

        }
        const { passwordHash, ...userInfo } = user;
        const age = 1000 * 60 * 60 * 24 * 7;
        const jwtSecret = process.env.JWT_SECRET;

        if (!jwtSecret) {
            throw new Error('JWT_SECRET is not defined in environment variables');
        }
        const token = jwt.sign(
            {
                userId: user.id,
                email: user.email,
                role: user.role,
            },
            jwtSecret,
            {
                expiresIn: age,
            }
        );

        res.status(200).json({
            success: true,
            message: 'Login successful',
            user: userInfo,
            token,
        });
    }
    catch (error: any) {
        console.error("Login Error:", error);
        res.status(500).json({ message: 'Internal server error during login.' });
    }

}
export const logout = async (req: Request, res: Response): Promise<void> => {
    try {
        res.status(200).json({
            success: true,
            message: 'Logged out successfully'
        });
    } catch (error: any) {
        console.error('Logout Error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error during logout.',
        });
    }
};