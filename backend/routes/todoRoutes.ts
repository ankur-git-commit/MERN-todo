import { Router } from "express"
import {
    getAllTasks,
    getTask,
    addTask,
    updateTask,
    deleteTask,
} from "../controller/todoController"

const router = Router()

router.route("/").get(getAllTasks).post(addTask)
router.route("/:id").get(getTask).put(updateTask).delete(deleteTask)
// router.route("/:taskname").delete(deleteTask)

export { router as taskRouter }
