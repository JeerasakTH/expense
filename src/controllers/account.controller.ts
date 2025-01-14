import { Request, Response } from 'express';
import { CreateOne, DeleteOne, GetMany, GetPageByQuery } from '../utils/repository';
import { Account, AccountModel } from '../models/account.model';

export const get = async (req: Request, res: Response): Promise<void> => {
    try {
        const accounts = await GetMany(AccountModel, {})

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
        const accounts = await GetPageByQuery(AccountModel, filter, order, limitValue, pageOffset)

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
        if (!req.body.account_name) {
            res.status(400).json({ message: "Account_name is required." });
            return
        }

        const payload = {
            user_id: (req as any).user.userId,
            account_name: req.body.account_name,
            balance: 0
        }

        const account = await CreateOne(AccountModel, payload)

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
        if (!req.body.account_id) {
            res.status(400).json({ message: "account_id is required." });
            return
        }

        const filter = {
            account_id: req.body.account_id
        }

        const account = await DeleteOne(AccountModel, filter)

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