import { configPool } from "../config/config.js";

export class taskModel {
  static async createTask(task) {
    try {
        console.log("Creating task in database with the following data:", task);
        const { name, description, type, end_date, assigned_to } = task;
      const query = `insert into tasks (name,description,type,end_date,assigned_to) values ($1, $2, $3, $4,$5) returning *`;
      const values = [name, description, type, end_date, assigned_to];
      const { rows } = await configPool.query(query, values);
      console.log("Task inserted into database, result:", rows[0]);
      return rows[0];
    } catch (error) {
        console.error("Error inserting task into database:", error);
        throw error;}
  }
  static async getTasks({ isAdmin, userId, sort, sortOrder, filterByType, searchByName }) {
    try {
      // Construir consulta SQL dinámicamente
      let query = `SELECT * FROM tasks`;
      const conditions = [];
      const values = [];

      // Filtro: Si no es admin, mostrar solo las tareas del usuario
      if (!isAdmin) {
        conditions.push(`assigned_to = $${values.length + 1}`);
        values.push(userId);
      }

      // Filtro: Tipo de tarea
      if (filterByType) {
        conditions.push(`type = $${values.length + 1}`);
        values.push(filterByType);
      }

      // Filtro: Búsqueda por nombre
      if (searchByName) {
        conditions.push(`name ILIKE $${values.length + 1}`);
        values.push(`%${searchByName}%`);
      }

      // Agregar condiciones a la consulta
      if (conditions.length > 0) {
        query += ` WHERE ${conditions.join(" AND ")}`;
      }

      // Agregar orden
      query += ` ORDER BY ${sort} ${sortOrder.toUpperCase()}`;

      console.log("Executing query:", query, values);
      const { rows } = await configPool.query(query, values);
      return rows;
    } catch (error) {
      console.error("Error fetching tasks from database:", error);
      throw error;
    }
  }

    // Obtener tarea por ID
    static async findTaskById(taskId) {
      try {
        const query = 'SELECT * FROM tasks WHERE id = $1';
        const { rows } = await configPool.query(query, [taskId]);
        return rows[0]; // Retorna la tarea si existe
      } catch (error) {
        console.error("Error finding task by ID:", error);
        throw error;
      }
    }
  
    // Actualizar estado de la tarea
    static async updateTaskStatus(taskId, status) {
      try {
        const query = 'UPDATE tasks SET status = $1 WHERE id = $2 RETURNING *';
        const { rows } = await configPool.query(query, [status, taskId]);
        return rows[0]; // Retorna la tarea actualizada
      } catch (error) {
        console.error("Error updating task status:", error);
        throw error;
      }
    }
  
    // Archivar tarea
    static async archiveTask(taskId) {
      try {
        const query = 'UPDATE tasks SET status = $1 WHERE id = $2 RETURNING *';
        const { rows } = await configPool.query(query, ['archived', taskId]);
        return rows[0]; // Retorna la tarea archivada
      } catch (error) {
        console.error("Error archiving task:", error);
        throw error;
      }
    }
  }

