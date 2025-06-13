import { Request, Response, NextFunction } from "express"
import { z } from "zod"

interface ValidationError {
    success: false
    message: string
    field?: string
    errors?: Array<{
        field: string
        message: string
    }>
}

//Generic Zod validation middleware
const validateBody = (schema: z.ZodSchema) => {
//     return (req: Request, res: Response, next: NextFunction): void => {
//         try {
//             const validatedData = schema.parse(req.body)

//             req.body = validatedData

//             next()
//         } catch (error) {
//             if (error instanceof z.ZodError) {
//                 const ErrorRespose: ValidationError = {
//                     success: false,
//                     message: "Validation failed",
//                     errors: error.errors.map((err) => ({
//                         field: err.path.join("."),
//                         message: err.message,
//                     })),
//                 }
//                 res.status(400).json(ErrorRespose)
//                 return
//             }

//             res.status(500).json({
//                 success: false,
//                 message: "Internal validation error",
//             })
//         }
//     }
// }


export { validateBody }