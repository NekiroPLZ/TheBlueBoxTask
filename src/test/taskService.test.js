import { configPool } from "../config/config.js";
import { TaskService } from "../services/TaskService.js";
const taskService = new TaskService({
  findTaskById: async (id) => {
    const res = await configPool.query("select * from tasks where id = $1", [
      id,
    ]);
    return res.rows[0];
  },
  createTask: async (task) => {
    const res = await configPool.query(
      `insert into tasks (name, description, type, status, assigned_to) 
       values ($1, $2, $3, $4, $5) returning *`,
      [task.name, task.description, task.type, task.status, task.assigned_to]
    );
    return res.rows[0];
  },
});

describe("Task Service", () => {
  beforeEach(async () => {
    await configPool.query(`
      insert into tasks (name, description, type, status, assigned_to)
      values ('Task 1', 'Description 1', 'urgent', 'pending', '1'),
             ('Task 2', 'Description 2', 'medium', 'in progress', '1');`);
  });

  test("should create a new task", async () => {
    const newTask = await taskService.createTask({
      name: "New Task",
      description: "Test Task",
      type: "low",
      status: "pending",
      assigned_to: 1,
    });

    expect(newTask.name).toBe("New Task");
    expect(newTask.type).toBe("low");
  });

  test("should retrieve a task by ID", async () => {
    const task = await taskService.getTaskById(1);
    expect(task.name).toBe("Task 1");
    expect(task.status).toBe("pending");
  });
});
