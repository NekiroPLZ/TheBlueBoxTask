import { Router } from "express";
import { authenticateToken, authorizeRole } from "../middlewares/auth.js";
import { taskModel } from "../models/taskModels.js";
import { taskController } from "../controllers/TaskController.js";
import { TaskService } from "../services/TaskService.js";

export const TaskRouterOpt = () => {
  const taskRouter = Router();
  const taskServiceInstance = new TaskService(taskModel);
  const taskControllerInstance = new taskController(taskServiceInstance);

  taskRouter.post(
    "/task",
    authenticateToken,
    authorizeRole("admin", "user"),
    taskControllerInstance.createTask
  );
  taskRouter.put(
    "/task/:id/move",
    authenticateToken,
    taskControllerInstance.moveTaskState
  );
  taskRouter.put(
    "/task/:id/archive",
    authenticateToken,
    authorizeRole("admin"),
    taskControllerInstance.archiveTask
  );
  taskRouter.get(
    "/task",
    authenticateToken,
    authorizeRole("user", "admin"),
    taskControllerInstance.getTasks
  );
  taskRouter.delete(
    "/task/:id",
    authenticateToken,
    authorizeRole("admin"),
    taskControllerInstance.deleteTask
  );
  return taskRouter;
};
