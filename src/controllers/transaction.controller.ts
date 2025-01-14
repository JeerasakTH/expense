import { Request, Response } from 'express';
import { CreateOne, GetMany, GetOne, GetPageByQuery, UpdateOne } from '../utils/repository';
import { TransactionModel } from '../models/transaction.model';
import { AccountModel } from '../models/account.model';

export const get = async (req: Request, res: Response): Promise<void> => {
    try {
        const accounts = await GetMany(TransactionModel, {})

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
        const accounts = await GetPageByQuery(TransactionModel, filter, order, limitValue, pageOffset)

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
        if (!req.body.account_id) {
            res.status(400).json({ message: "account_id is required." });
            return
        }

        if (!req.body.category_id) {
            res.status(400).json({ message: "category_id is required." });
            return
        }

        if (!req.body.amount) {
            res.status(400).json({ message: "amount is required." });
            return
        }

        const filter = {
            user_id: (req as any).user.userId,
            account_id: req.body.account_id
        }

        const existingAccount = await GetOne(AccountModel, filter)

        if (!existingAccount) {
            res.status(400).json({ message: "account doesn't exist" });
            return
        }

        const payload = {
            user_id: (req as any).user.userId,
            account_id: req.body.account_id,
            category_id: req.body.category_id,
            amount_before: existingAccount.balance,
            amount_latest: existingAccount.balance + req.body.amount,
            note: req.body.note,
            transaction_date: new Date()
        }

        const transaction = await CreateOne(TransactionModel, payload)

        const filterAccount = {
            user_id: (req as any).user.userId,
            account_id: req.body.account_id
        }

        const payloadAccount = {
            balance: existingAccount.balance + req.body.amount
        }

        const account = await UpdateOne(AccountModel, payloadAccount, filterAccount)

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