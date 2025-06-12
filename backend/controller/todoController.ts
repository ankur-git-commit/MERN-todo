import { Request, Response } from "express"
import Todo from "../models/todoModel"

// @desc get all tasks
// GET /api/tasks
const getAllTasks = async (_req: Request, res: Response): Promise<void> => {
    const tasks = await Todo.find().lean()

    console.log(tasks)
    const items = tasks.map((todo) => todo.task)

    res.status(200).json({ items })
}

// @desc get a single task by its id
// GET /api/tasks
const getTask = async (req: Request, res: Response) => {
    if (!req.params || !req.params.id) {
        res.status(400).json({
            message: "No task id provided by the user",
        })
        return
    }

    const { id: taskID } = req.params

    try {
        const taskDetails = await Todo.findById(taskID)

        if (!taskDetails) {
            res.status(404).json({
                sucess: false,
                message: "Task not found",
            })
            return
        }

        res.status(200).json({
            success: "Task retrived",
            taskName: taskDetails.task,
        })
        return
    } catch (error) {
        console.log(`Error in ${req.baseUrl} route: `, error)
        if (!res.headersSent) {
            res.status(500).json({
                message: "Server Error",
            })
        }
        return
    }
}

// @desc add a new task
// POST /api/tasks/
const addTask = async (req: Request, res: Response): Promise<void> => {
    if (!req.body || !req.body.item) {
        res.status(400).json({ clientError: "Item is required" })
        return
    }

    const { task: taskName } = req.body
    console.log(taskName);
    
    try {
        if (Array.isArray(taskName)) {
            const taskObject = taskName.map((item) => ({
                task: item,
            }))

            console.log(taskObject)

            const taskList = await Todo.insertMany(taskObject)

            if (!taskList) {
                res.status(400).json({
                    success: false,
                    message: "unable to add the items in the db",
                })
                return
            }

            res.status(201).json({
                success: true,
                count: taskList.length,
                tasksAdded: taskList,
            })

            return
        } else {
            const duplicateTask = await Todo.findOne({ taskName })

            if (duplicateTask) {
                res.status(400).json({
                    sucess: false,
                    error: "Duplicate item",
                    message: `'${taskName}' is already in the list`,
                })
                return
            }

            // If not a duplicate, proceed to create
            const createdTask = await Todo.create({
                taskName,
            })
            res.status(201).json({
                success: "The task has been added successfully",
                taskAdded: createdTask,
            })

            return
        }
    } catch (error) {
        console.error(`Error in ${req.baseUrl} route:`, error)

        // Ensure a response is sent only if one hasn't been sent already
        // (though with the returns above, this catch should only be hit for unexpected errors
        // where a response hasn't been formed yet, or if res.headersSent is checked)
        if (!res.headersSent) {
            res.status(500).json({ error: "Server Error" })
        }
        // No explicit return needed here if it's the absolute end of function for this error path
        // but adding 'return;' doesn't hurt and makes the Promise<void> intent clear.
        return
    }
}

// @desc Update an existing task
// @route PUT api/tasks/:id
const updateTask = async (req: Request, res: Response): Promise<void> => {
    console.log(req.params.id)
    if (!req.params.id) {
        res.status(400).json({
            message: "id not provided by the user",
        })
        return
    }

    const { id: taskID } = req.params

    try {
        const taskCompletion = await Todo.findByIdAndUpdate(
            taskID,
            [{ $set: { isCompleted: { $not: "$isCompleted" } } }],
            { new: true }
        )

        if (!taskCompletion) {
            res.status(404).json({
                sucess: false,
                message: "Task not found in the database",
            })
            return
        }

        res.status(201).json({
            success: `Task: ${taskID} has been updated`,
            message: ` '${taskCompletion.task}' has been set to '${taskCompletion.isCompleted}' `,
            isCompleted: taskCompletion?.isCompleted,
        })
        return
    } catch (error) {
        console.error(`Error in ${req.baseUrl} route:`, error)
        if (!res.headersSent) {
            res.status(500).json({
                error: "Server Error",
            })
        }

        return
    }
}

// @desc delete a task
// @route DELETE /:taskname
const deleteTask = async (req: Request, res: Response): Promise<void> => {
    console.log("test")

    if (!req.params || !req.params.id) {
        res.status(400).json({
            message: "id not provided by the user",
        })
        return
    }

    const { id: taskID } = req.params

    try {
        const taskDeletion = await Todo.findByIdAndDelete(taskID)
        console.log(taskDeletion)
        if (!taskDeletion) {
            res.status(404).json({
                success: false,
                message: "item not found in db",
            })
        }
        res.status(200).json({
            success: true,
            message: "deleted",
        })
    } catch (error) {
        console.error(`Error in ${req.baseUrl} route:`, error)
        if (!res.headersSent) {
            res.status(500).json({
                error: "Server Error",
            })
        }
        return
    }
}

// @desc delete completed task
// DELETE /api/tasks

const deleteCompletedTask = async (
    req: Request,
    res: Response
): Promise<void> => {
    

    try {
        const clearCompletedTasks = await Todo.deleteMany({ isCompleted: true })
        console.log(clearCompletedTasks)

        if (!clearCompletedTasks) {
            res.status(400).json({
                success: false,
                message: "completed tasks couldn't be deleted",
            })
            return
        }

        res.status(200).json({
            success: true,
            message: "Completed tasks have been deleted",
        })
    } catch (error) {
        console.error(`Error in ${req.baseUrl} route:`, error)
        if (!res.headersSent) {
            res.status(500).json({
                error: "Server Error",
            })
        }
        return
    }
}

export {
    getAllTasks,
    getTask,
    addTask,
    updateTask,
    deleteTask,
    deleteCompletedTask,
}
