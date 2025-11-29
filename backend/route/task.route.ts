import express from "express"
import { authenticate } from '../middleware/auth.middleware';
import { createTask, getTasks, getTaskById, updateTask, deleteTask } from "../constroller/task.controller"

const router = express.Router()

router.use(authenticate);

router.post('/create', createTask);
router.get('/gettask', getTasks);
router.get('/taskbyid/:id', getTaskById);
router.put('/updated/:id', updateTask);
router.delete('/delete/:id', deleteTask);


export default router 