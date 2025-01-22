export class TaskService {
    constructor(taskModel) {
        this.taskModel = taskModel;
    }
    getTasks = async({ role, userId, sortBy, order, filterByType, searchByName })=>{
        try {
            const isAdmin = role === 'admin';
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
    }

    getTaskById = async (taskId) => {
        try {
          return await this.taskModel.findTaskById(taskId);
        } catch (error) {
          throw new Error("Error retrieving task");
        }
      };
    
      // Mover tarea a un nuevo estado
      moveTaskState = async (taskId, status) => {
        try {
          return await this.taskModel.updateTaskStatus(taskId, status);
        } catch (error) {
          throw new Error("Error updating task status");
        }
      };
    
      // Archivar tarea (solo admin)
      archiveTask = async (taskId) => {
        try {
          return await this.taskModel.archiveTask(taskId);
        } catch (error) {
          throw new Error("Error archiving task");
        }
      };

    createTask = async (task)=>{
        try{
            // console.log("Calling taskModel to create task with data:", taskData);
            const createdTask = await this.taskModel.createTask(task);
            console.log("Task created in model:", createdTask);
            return createdTask;
        } catch (error) {
            console.error("Error in TaskService while creating task:", error);
            throw error;}
    }
};