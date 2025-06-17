import express from 'express';
import { auth } from '../middleware/auth.js';
import { createTask, deleteTask, getAllTask, getTaskById, updateTask } from '../controller/task.controller.js';

const router = express.Router();

router.post("/create",auth, createTask);
router.get("/all",auth, getAllTask);
router.get("/one/:id", auth, getTaskById);
router.put("/update/:id",auth, updateTask);
router.delete("/remove/:id", auth, deleteTask);
export default router;