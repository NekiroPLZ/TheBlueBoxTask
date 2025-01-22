import { Router } from "express";
import { authenticateToken, authorizeRole } from "../middlewares/auth.js";
import { taskModel } from "../models/taskModels.js";
import { taskController } from "../controllers/TaskController.js";
import { TaskService } from "../services/TaskService.js";

export const TaskRouterOpt = () => {
  const taskRouter = Router();
  console.log("Configuring Task Router...");

  const taskServiceInstance = new TaskService( taskModel );
    const taskControllerInstance = new taskController( taskServiceInstance );

    taskRouter.post('/task', authenticateToken, authorizeRole('admin','user'), (req, res, next) => {
        console.log("Received request to create task.");
        next();
      }, taskControllerInstance.createTask);
      taskRouter.put('/task/:id/move', authenticateToken, taskControllerInstance.moveTaskState);

// Archivar tarea (solo admin)
      taskRouter.put('/task/:id/archive', authenticateToken,authorizeRole('admin'), taskControllerInstance.archiveTask);
      taskRouter.get('/task', authenticateToken, authorizeRole('user','admin'), taskControllerInstance.getTasks);
  return taskRouter;
};
