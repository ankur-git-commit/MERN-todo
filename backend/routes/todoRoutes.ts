import { Router } from "express"
import {
    getAllTasks,
    addTask,
    updateTask,
    deleteTask,
} from "../controller/todoController"

const router = Router()

router.route("/").get(getAllTasks).post(addTask)
router.route("/:id").put(updateTask)
router.route("/:taskname").delete(deleteTask)

export { router as taskRouter }
