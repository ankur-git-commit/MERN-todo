import { Request, Response, NextFunction } from "express"

const validateId = (req: Request, res: Response, next: NextFunction): void => {
    if (!req.params.id) {
        const method = req.method
        const operation =
            method === "PUT"
                ? "update"
                : method === "DELETE"
                ? "delete"
                : "access"

        res.status(404).json({
            error: "Bad Request",
            message: `Task ID is required to ${operation} a task. Please provide an ID in the URL path.`,
            example: `${method} ${req.baseUrl}/123`,
        })
        return
    }

    next()
}

export default validateId
