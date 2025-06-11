import { Router } from "express"
import {
    getAllTasks,
    getTask,
    addTask,
    updateTask,
    deleteTask,
    deleteCompletedTask,
} from "../controller/todoController"

const router = Router()

router.route("/").get(getAllTasks).post(addTask).delete(deleteCompletedTask)
router.route("/:id").get(getTask).put(updateTask).delete(deleteTask)

export { router as taskRouter }
