import { Request, Response } from 'express';
import { CreateOne, DeleteOne, GetMany, GetPageByQuery } from '../utils/repository';
import { CategoryModel } from '../models/category.model';

export const get = async (req: Request, res: Response): Promise<void> => {
    try {
        const accounts = await GetMany(CategoryModel, {})

        res.status(200).json({
            data: accounts,
            message: "Get Successfully",
            status: "success"
        })
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Internal Server Error." });
    }
}

export const getPage = async (req: Request, res: Response): Promise<void> => {
    try {
        const { page, limit, ...restOfQuery } = req.query;

        const pageString = typeof page === "string" ? page : "1";
        const limitValue = typeof limit === "string" ? parseInt(limit, 10) : 1;

        let filter = restOfQuery;
        let order: [] = [];
        let pageOffset = Math.max(0, (parseInt(pageString) - 1) * limitValue);
        const accounts = await GetPageByQuery(CategoryModel, filter, order, limitValue, pageOffset)

        res.status(200).json({
            data: accounts,
            message: 'Get Successfully',
            status: "success"
        })
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Internal Server Error." });
    }
}

export const create = async (req: Request, res: Response): Promise<void> => {
    try {
        if (!req.body.category_name) {
            res.status(400).json({ message: "category_name is required." });
            return
        }

        const payload = {
            user_id: (req as any).user.userId,
            category_name: req.body.category_name,
        }

        const account = await CreateOne(CategoryModel, payload)

        res.status(200).json({
            data: null,
            message: 'Created Successfully',
            status: "success"
        })
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Internal Server Error." });
    }
}

export const deleted = async (req: Request, res: Response): Promise<void> => {
    try {
        if (!req.body.category_id) {
            res.status(400).json({ message: "category_id is required." });
            return
        }

        const filter = {
            category_id: req.body.category_id,
        }

        const account = await DeleteOne(CategoryModel, filter)

        res.status(200).json({
            data: null,
            message: 'Delete Successfully',
            status: "success"
        })
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Internal Server Error." });
    }
}