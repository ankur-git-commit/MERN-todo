import { Request, Response, NextFunction } from "express"
import { z } from "zod"
import mongoose from "mongoose"

// helper functions

const isValidObjectId = (id: string): boolean => {
    return mongoose.Types.ObjectId.isValid(id)
}

const cleanInput = (input: string): string => {
    return input
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#x27;")
        .trim()
        .replace(/\s+/g, " ")
}

// validation Middleware

const validateBody = (schema: z.ZodSchema) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        try {
            const validatedData = schema.parse(req.body)
            req.body = validatedData
            next()
        } catch (error) {
            if (error instanceof z.ZodError) {
                res.status(400).json({
                    success: false,
                    message: error.errors[0].message,
                    field: error.errors[0].path[0],
                })
                return
            }
            res.status(500).json({
                success: false,
                message: "validation error",
            })
        }
    }
}

const validateParams = (schema: z.ZodSchema) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        try {
            const validatedData = schema.parse(req.params)
            req.params = validatedData
            next()
        } catch (error) {
            if (error instanceof z.ZodError) {
                res.status(400).json({
                    success: false,
                    message: error.errors[0].message,
                })
                return
            }
            res.status(500).json({
                success: false,
                message: "Validation error",
            })
        }
    }
}

export const addTaskSchema = z.object({
    item: z.union([
        // Single task
        z
            .string()
            .min(1, "Task cannot be empty")
            .max(200, "Task cannot exceed 200 characters")
            .transform(cleanInput),

        // Array of tasks (for your bulk creation)
        z
            .array(
                z
                    .string()
                    .min(1, "Each task must have content")
                    .max(200, "Each task cannot exceed 200 characters")
            )
            .min(1, "Must provide at least one task")
            .max(20, "Cannot create more than 20 tasks at once")
            .transform((arr) => arr.map((task) => cleanInput(task))),
    ]),
})

export const updateTaskSchema = z.object({
    isCompleted: z.boolean().optional(),
})

export const taskParamsSchema = z.object({
    id: z
        .string()
        .length(24, "Invalid task ID")
        .refine(isValidObjectId, "invalid task ID format"),
})

export const validateAddTask = validateBody(addTaskSchema)
export const validateUpdateTask = validateBody(updateTaskSchema)
export const validateTaskParms = validateParams(taskParamsSchema)

export type AddTaskType = z.infer<typeof addTaskSchema>
export type UpdateTaskType = z.infer<typeof updateTaskSchema>
export type TaskParamsType = z.infer<typeof taskParamsSchema>
