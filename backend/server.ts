import express, { Application, Request, Response } from "express"
import dotenv from "dotenv"
dotenv.config()
import connectDB from "./config/db"
import Todo from "./models/todoModel"

const PORT = process.env.PORT || 3000

connectDB()
const app: Application = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/", (_req, res) => {
    console.log("testing server")

    res.send({ message: "Hello World!" })
})


app.post("/api/tasks", async (req: Request, res: Response): Promise<void> => {
    if (!req.body || !req.body.item) {
        res.status(400).json({ clientError: "Item is required" })
        return
    }

    const { item: task } = req.body

    try {
        const duplicateTask = await Todo.findOne({ task })

        if (duplicateTask) {
            res.status(400).json({
                duplicateItem: "Item is already in the list",
            })
            return
        }

        // If not a duplicate, proceed to create
        await Todo.create({
            task,
        })

        res.status(201).json({
            success: "The task has been added successfully",
            taskAdded: task,
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
})

app.listen(PORT, () => {
    console.log(`Server is running at port: ${PORT}`)
})
