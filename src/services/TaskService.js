export class TaskService {
  constructor(taskModel) {
    this.taskModel = taskModel;
  }
  getTasks = async ({
    role,
    userId,
    sortBy,
    order,
    filterByType,
    searchByName,
  }) => {
    try {
      const isAdmin = role === "admin";
      const validSortBy = ["creation_date", "end_date", "name"];
      const validOrder = ["asc", "desc"];
      const sort = validSortBy.includes(sortBy) ? sortBy : "creation_date";
      const sortOrder = validOrder.includes(order) ? order : "asc";
      return await this.taskModel.getTasks({
        isAdmin,
        userId,
        sort,
        sortOrder,
        filterByType,
        searchByName,
      });
    } catch (error) {
      console.error("Error in TaskService while getting tasks:", error);
      throw error;
    }
  };

  deleteTask = async (taskId, userRole) => {
    if (userRole !== "admin") {
      throw new Error("Only admins can delete tasks");
    }
    try {
      const deleted = await this.taskModel.deleteTask(taskId);
      if (!deleted) {
        throw new Error("Task not found or already deleted");
      }
      return { success: true, message: "Task deleted successfully" };
    } catch (error) {
      console.log(error);

      throw new Error("An error occurred while deleting the task");
    }
  };
  getTaskById = async (taskId) => {
    try {
      return await this.taskModel.findTaskById(taskId);
    } catch (error) {
      throw new Error("Error retrieving task");
    }
  };

  moveTaskState = async (taskId, status) => {
    try {
      return await this.taskModel.updateTaskStatus(taskId, status);
    } catch (error) {
      throw new Error("Error updating task status");
    }
  };

  archiveTask = async (taskId) => {
    try {
      return await this.taskModel.archiveTask(taskId);
    } catch (error) {
      throw new Error("Error archiving task");
    }
  };

  createTask = async (task) => {
    try {
      const createdTask = await this.taskModel.createTask(task);
      return createdTask;
    } catch (error) {
      throw error;
    }
  };
}
