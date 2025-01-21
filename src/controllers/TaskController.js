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
