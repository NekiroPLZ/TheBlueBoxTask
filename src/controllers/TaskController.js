export class taskController {
  constructor(taskService) {
    this.taskService = taskService;
  }
  getTasks = async (req,res)=>{
    try {
        const { role, id: userId } = req.user;
        const {sortBy,order,filterByType,searchByName} = req.query;
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
        res.status(500).json({message: "Internal server error", error: error.message});
    }
  }

  // Mover tarea a un estado específico (pending, in progress, completed)
  moveTaskState = async (req, res) => {
    try {
      const { role, id: userId } = req.user;  // Obtenemos el rol y el ID del usuario autenticado
      const { id } = req.params;  // El ID de la tarea a mover
      const { status } = req.body;  // El estado al que se quiere mover la tarea

      // Verificar si el estado es uno permitido
      const allowedStatuses = ['pending', 'in progress', 'completed'];
      if (!allowedStatuses.includes(status)) {
        return res.status(400).json({ message: "Invalid status. Allowed statuses are 'pending', 'in progress', or 'completed'." });
      }

      // Obtener la tarea para verificar si el usuario tiene permiso para modificarla
      const task = await this.taskService.getTaskById(id);

      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }

      // Validación de permisos:
      // Los administradores pueden mover cualquier tarea
      // Los usuarios solo pueden mover las tareas que están asignadas a ellos
      if (role !== 'admin' && task.assigned !== userId) {
        return res.status(403).json({ message: "Unauthorized: You can only move your own tasks" });
      }

      // Mover la tarea al nuevo estado
      const updatedTask = await this.taskService.moveTaskState(id, status);
      
      res.status(200).json({ message: "Task status updated successfully", task: updatedTask });
    } catch (error) {
      res.status(500).json({ message: "Internal server error", error: error.message });
    }
  };

  // Archivar tarea (solo admin)
  archiveTask = async (req, res) => {
    try {
      const { role } = req.user;
      const { id } = req.params;

      // Solo un administrador puede archivar una tarea
      if (role !== 'admin') {
        return res.status(403).json({ message: "Unauthorized: Only admin can archive tasks" });
      }

      // Llamar al servicio para archivar la tarea
      const archivedTask = await this.taskService.archiveTask(id);

      if (!archivedTask) {
        return res.status(404).json({ message: "Task not found" });
      }

      res.status(200).json({ message: "Task archived successfully", task: archivedTask });
    } catch (error) {
      res.status(500).json({ message: "Internal server error", error: error.message });
    }
  };
  createTask = async (req, res) => {
    try {
      // Elimina 'assigned_to' de req.body y solo asigna el valor desde req.user.id
      console.log("Creating task with the following data:", req.body);
      console.log("Assigned user:", req.user); // Ve
      const taskData = { ...req.body, assigned_to: req.user.id };

      console.log("Task data to be passed to service:", taskData);

      // Llamada al servicio para crear la tarea
      const task = await this.taskService.createTask(taskData); // Solo pasamos 'taskData' al servicio
      console.log("Task created successfully:", task);
      // Respuesta con la tarea creada
      res.status(201).json({ message: "Task created", task });
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  };
}
