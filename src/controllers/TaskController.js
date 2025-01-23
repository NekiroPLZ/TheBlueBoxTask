export class taskController {
  constructor(taskService) {
    this.taskService = taskService;
  }
  getTasks = async (req, res) => {
    try {
      const { role, id: userId } = req.user;
      const { sortBy, order, filterByType, searchByName } = req.query;
      const tasks = await this.taskService.getTasks({
        role,
        userId,
        sortBy,
        order,
        filterByType,
        searchByName,
      });

      res.status(200).json(tasks);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  };

  moveTaskState = async (req, res) => {
    try {
      const { role, id: userId } = req.user;
      const { id } = req.params;
      const { status } = req.body;

      const allowedStatuses = ["pending", "in progress", "completed"];
      if (!allowedStatuses.includes(status)) {
        return res
          .status(400)
          .json({
            message:
              "Invalid status. Allowed statuses are 'pending', 'in progress', or 'completed'.",
          });
      }
      const task = await this.taskService.getTaskById(id);
      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }
      if (role !== "admin" && task.assigned !== userId) {
        return res
          .status(403)
          .json({ message: "Unauthorized: You can only move your own tasks" });
      }
      const updatedTask = await this.taskService.moveTaskState(id, status);
      res
        .status(200)
        .json({
          message: "Task status updated successfully",
          task: updatedTask,
        });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  };

  deleteTask = async (req, res) => {
    try {
      const taskId = req.params.id;
      const userRole = req.user.role;

      await this.taskService.deleteTask(taskId, userRole);
      res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
      res.status(403).json({ error: error.message });
    }
  };
  archiveTask = async (req, res) => {
    try {
      const { role } = req.user;
      const { id } = req.params;

      if (role !== "admin") {
        return res
          .status(403)
          .json({ message: "Unauthorized: Only admin can archive tasks" });
      }
      const archivedTask = await this.taskService.archiveTask(id);

      if (!archivedTask) {
        return res.status(404).json({ message: "Task not found" });
      }
      res
        .status(200)
        .json({ message: "Task archived successfully", task: archivedTask });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  };
  createTask = async (req, res) => {
    try {
      const taskData = { ...req.body, assigned_to: req.user.id };
      const task = await this.taskService.createTask(taskData);
      res.status(201).json({ message: "Task created", task });
    } catch (error) {
      res.status(500).json(error);
    }
  };
}
