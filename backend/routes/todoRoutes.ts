import { Router } from "express"
import {
    validateAddTask,
    validateTaskParms,
} from "../middleware/validation"

import {
    getAllTasks,
    getTask,
    addTask,
    updateTask,
    deleteTask,
    deleteCompletedTask,
} from "../controller/todoController"

const router = Router()

router
    .route("/")
    .get(getAllTasks)
    .post(validateAddTask, addTask)
    .delete(deleteCompletedTask)
router
    .route("/:id")
    .get(validateTaskParms, getTask)
    .put(validateTaskParms, updateTask)
    .delete(validateTaskParms, deleteTask)

export { router as taskRouter }
