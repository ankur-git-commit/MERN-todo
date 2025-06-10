import { Request, Response, NextFunction } from "express";

const validateTask = (req: Request, res: Response, next: NextFunction) => {
    const { item } = req.body

    //Length validation
    // if (item.trim().length < 1){
    //     res.status(code)
    // }
}