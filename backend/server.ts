import express, { Application } from "express"
import dotenv from "dotenv"
dotenv.config()
import connectDB from "./config/db"
import { taskRouter } from "./routes/todoRoutes"

const PORT = process.env.PORT || 3000

connectDB()
const app: Application = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/", (_req, res) => {
    console.log("testing server")

    res.send({ message: "Hello World!" })
})

app.use("/api/tasks", taskRouter)

app.listen(PORT, () => {
    console.log(`Server is running at port: ${PORT}`)
})
