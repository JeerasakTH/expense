import { Request, Response } from 'express';
import { GetMany } from '../utils/repository';
import { User } from '../models/user.model';

export const get = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await GetMany(User, {});

        res.status(200).json({
            data: users,
            message: "Get Successfully",
            status: "success",
        });
    } catch (error) {
        console.error("Error: ", error);
        res.status(500).json({
            data: null,
            message: error instanceof Error ? error.message : "An unknown error occurred",
            status: "error",
        });
    }
};
