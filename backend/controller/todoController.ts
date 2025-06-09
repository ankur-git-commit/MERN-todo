import { Request, Response } from "express"
import Todo from "../models/todoModel"


// @desc get all tasks
// GET /api/tasks

const getAllTasks = async (_req: Request, res: Response): Promise<void> => {
    const tasks = await Todo.find()

    console.log(tasks)
    const items = tasks.map((todo) => todo.task)

    res.status(400).json({ items })
}

// @desc get a single task by its id
// GET /api/tasks
const getTask = async (req: Request, res: Response) => {
    if (!req.params || !req.params.id) {
        res.status(400).json({
            message: "No task id provided by the user"
        })
    }

    const {id: taskID} = req.params

    try {
        const taskDetails = await Todo.findById(taskID)
        console.log(taskDetails);
        
        res.send("found")
    } catch (error) {
        console.log(`Error in ${req.baseUrl} route: `, error)
        if (!res.headersSent){
            res.status(500).json({
                message: "Server Error"
            })
        }
    }
}

// @desc add a new task
// POST /api/tasks/
const addTask = async (req: Request, res: Response): Promise<void> => {
    if (!req.body || !req.body.item) {
        res.status(400).json({ clientError: "Item is required" })
        return
    }

    const { item: task } = req.body

    try {
        const duplicateTask = await Todo.findOne({ task })

        if (duplicateTask) {
            res.status(400).json({
                error: "Duplicate item",
                message: `'${task}' is already in the list`,
            })
            return
        }

        // If not a duplicate, proceed to create
        const createdTask = await Todo.create({
            task,
        })

        res.status(201).json({
            success: "The task has been added successfully",
            taskAdded: createdTask,
        })
        return
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
//
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
                message: "Task not found in the database",
            })
            return
        }

        res.status(200).json({
            success: `Task: ${taskID} has been updated`,
            message: ` '${taskCompletion.task}' has been set to '${taskCompletion.isCompleted}' `,
            isCompleted: taskCompletion?.isCompleted,
        })
        return
    } catch (error) {
        console.error(`Error in ${req.baseUrl} rote:`, error)
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
    
    res.status(200).send("Deleted")
}

export { getAllTasks, addTask, updateTask, deleteTask, getTask }
