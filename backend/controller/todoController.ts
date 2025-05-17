import { Request, Response } from "express"
import Todo from "../models/todoModel"

const getAllTasks = async (_req: Request, res: Response): Promise<void> => {
    const tasks = await Todo.find()

    console.log(tasks)
    const items = tasks.map((todo) => todo.task)
    
    res.status(400).json({ items })
}



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



// @desc 

const updateTask = async (req: Request, res: Response): Promise<void> => {
    if (!req.query || !req.query.id) {
        res.status(400).json({
            clientError: "No task id was provided by the user",
        })
        return
    }

    const { id } = req.query

    try {
        const task = await Todo.findById(id).select("isCompleted -_id")
        console.log(task)

        if (!task) {
            res.status(404).json({
                error: "Not found",
                message: "item not present in database",
            })
            return
        }

        const updateTask = await Todo.updateOne(
            { _id: id },
            { $set: { isCompleted: !task.isCompleted } }
        )

        if (updateTask?.acknowledged) {
            res.status(200).json({
                success: `${id} has been updated`,
                isCompleted: !task.isCompleted,
            })
            return
        }
    } catch (error) {
        console.error(`Error in ${req.baseUrl} route:`, error)

        if (!res.headersSent) {
            res.status(500).json({ error: "Server Error" })
        }
        return
    }
}

const deleteTask = async (req: Request, res: Response): Promise<void> => {
    console.log(req.query.item)

    if (!req.query || !req.query.item) {
        res.status(400).json({ clientError: "No item given to delete" })
        return
    }

    const { item: tasktoDelete } = req.query

    try {
        const taskInDB = await Todo.findOne({
            task: tasktoDelete,
        })
        console.log(taskInDB)

        if (!taskInDB) {
            res.status(404).json({
                error: "Not found",
                message: "item not present in database",
            })
            return
        }

        const result = await Todo.deleteOne({ _id: taskInDB._id })

        if (result?.acknowledged) {
            res.status(200).json({
                success: `${tasktoDelete} has been successfully removed from the todo list`,
                taskDelete: tasktoDelete,
            })
            return
        }
    } catch (error) {
        console.error(`Error in ${req.baseUrl} route:`, error)

        if (!res.headersSent) {
            res.status(500).json({ error: "Server Error" })
        }
        return
    }
}

export { getAllTasks, addTask, updateTask, deleteTask }
