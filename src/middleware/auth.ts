import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authenticate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const token = req.cookies?.authToken;

        if (!token) {
            res.status(401).json({ message: "Unauthorized: No token provided." });
            return;
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret");
        (req as any).user = decoded; // เพิ่มข้อมูลผู้ใช้ใน req

        next();
    } catch (error) {
        console.error("Authentication error:", error);
        res.status(403).json({ message: "Forbidden: Invalid token." });
    }
};
