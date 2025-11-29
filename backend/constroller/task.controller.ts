import type { Request, Response } from 'express';
import { prisma } from '../lib/prisma';

export const createTask = async (req: Request, res: Response): Promise<void> => {
    try {
        const { title, description, priority } = req.body;
        const userId = req.user?.userId;

        if (!userId) {
            res.status(401).json({
                success: false,
                message: 'Authentication required',
            });
            return;
        }

        if (!title) {
            res.status(400).json({
                success: false,
                message: 'Title is required',
            });
            return;
        }

        const task = await prisma.task.create({
            data: {
                title,
                description: description || '',
                priority: priority || 'medium',
                ownerId: userId,
            },
        });

        res.status(201).json({
            success: true,
            message: 'Task created successfully',
            task,
        });
    } catch (error: any) {
        console.error('Create Task Error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message,
        });
    }
};

export const getTasks = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.user?.userId;
        const userRole = req.user?.role;

        if (!userId) {
            res.status(401).json({
                success: false,
                message: 'Authentication required',
            });
            return;
        }

        let tasks;

        if (userRole === 'ADMIN') {
            tasks = await prisma.task.findMany({
                include: {
                    owner: {
                        select: {
                            id: true,
                            email: true,
                            role: true,
                        },
                    },
                },
                orderBy: {
                    createdAt: 'desc',
                },
            });
        } else {
            tasks = await prisma.task.findMany({
                where: {
                    ownerId: userId,
                },
                orderBy: {
                    createdAt: 'desc',
                },
            });
        }

        res.status(200).json({
            success: true,
            count: tasks.length,
            tasks,
        });
    } catch (error: any) {
        console.error('Get Tasks Error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message,
        });
    }
};

export const getTaskById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const userId = req.user?.userId;
        const userRole = req.user?.role;

        if (!userId) {
            res.status(401).json({
                success: false,
                message: 'Authentication required',
            });
            return;
        }

        if (!id) {
            res.status(400).json({
                success: false,
                message: 'Task ID is required',
            });
            return;
        }

        const task = await prisma.task.findUnique({
            where: { id },
            include: {
                owner: {
                    select: {
                        id: true,
                        email: true,
                        role: true,
                    },
                },
            },
        });

        if (!task) {
            res.status(404).json({
                success: false,
                message: 'Task not found',
            });
            return;
        }

        if (task.ownerId !== userId && userRole !== 'ADMIN') {
            res.status(403).json({
                success: false,
                message: 'You do not have permission to view this task',
            });
            return;
        }

        res.status(200).json({
            success: true,
            task,
        });
    } catch (error: any) {
        console.error('Get Task Error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message,
        });
    }
};

export const updateTask = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { title, description, completed, priority } = req.body;
        const userId = req.user?.userId;
        const userRole = req.user?.role;

        if (!userId) {
            res.status(401).json({
                success: false,
                message: 'Authentication required',
            });
            return;
        }

        if (!id) {
            res.status(400).json({
                success: false,
                message: 'Task ID is required',
            });
            return;
        }

        const existingTask = await prisma.task.findUnique({
            where: { id },
        });

        if (!existingTask) {
            res.status(404).json({
                success: false,
                message: 'Task not found',
            });
            return;
        }

        if (existingTask.ownerId !== userId && userRole !== 'ADMIN') {
            res.status(403).json({
                success: false,
                message: 'You do not have permission to update this task',
            });
            return;
        }

        const updatedTask = await prisma.task.update({
            where: { id },
            data: {
                title: title || existingTask.title,
                description: description !== undefined ? description : existingTask.description,
                completed: completed !== undefined ? completed : existingTask.completed,
                priority: priority || existingTask.priority,
            },
        });

        res.status(200).json({
            success: true,
            message: 'Task updated successfully',
            task: updatedTask,
        });
    } catch (error: any) {
        console.error('Update Task Error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message,
        });
    }
};

export const deleteTask = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const userId = req.user?.userId;
        const userRole = req.user?.role;

        if (!userId) {
            res.status(401).json({
                success: false,
                message: 'Authentication required',
            });
            return;
        }

        if (!id) {
            res.status(400).json({
                success: false,
                message: 'Task ID is required',
            });
            return;
        }

        const existingTask = await prisma.task.findUnique({
            where: { id },
        });

        if (!existingTask) {
            res.status(404).json({
                success: false,
                message: 'Task not found',
            });
            return;
        }

        if (existingTask.ownerId !== userId && userRole !== 'ADMIN') {
            res.status(403).json({
                success: false,
                message: 'You do not have permission to delete this task',
            });
            return;
        }

        await prisma.task.delete({
            where: { id },
        });

        res.status(200).json({
            success: true,
            message: 'Task deleted successfully',
        });
    } catch (error: any) {
        console.error('Delete Task Error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message,
        });
    }
};