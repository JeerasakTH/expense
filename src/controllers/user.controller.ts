import { Request, Response } from 'express';
import { CreateOne, GetMany, GetOne } from '../utils/repository';
import { UserModel } from '../models/user.model';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || "SESSION";

export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            res.status(400).json({ message: "Username and password are required." });
            return
        }

        const user = await GetOne(UserModel, { username: "admin" });

        if (!user) {
            res.status(401).json({ message: "Invalid username or password." });
            return
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(401).json({ message: "Invalid username or password." });
            return
        }

        const token = jwt.sign(
            { userId: user.user_id, username: user.username },
            JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.cookie("authToken", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 24 * 60 * 60 * 1000,
        });

        res.status(200).json({ message: "Login successful." });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Internal Server Error." });
    }
};

export const get = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await GetMany(UserModel, {});

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

export const create = async (req: Request, res: Response): Promise<void> => {
    try {
        const payload = {

        }

        const user = await CreateOne(UserModel, payload)
    } catch (error) {
        console.error("Error: ", error);
        res.status(500).json({
            data: null,
            message: error instanceof Error ? error.message : "An unknown error occurred",
            status: "error",
        });
    }
}