import { Router } from "express"
import validateId from "../middleware/validateId"
import {
    getAllTasks,
    getTask,
    addTask,
    updateTask,
    deleteTask,
} from "../controller/todoController"

const router = Router()

router.route("/").get(getAllTasks).post(addTask)
router
    .route("/:id")
    .get(getTask)
    .put(validateId, updateTask)
    .delete(validateId, deleteTask)
// router.route("/:taskname").delete(deleteTask)

export { router as taskRouter }
