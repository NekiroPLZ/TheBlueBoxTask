import z from 'zod';

const taskSchema = z.object({
  name: z.string({ required_error: "Task name is required" }).min(2, "Task name must be at least 2 characters"),
  description: z.string().optional(),
  type: z.enum(['urgent', 'medium', 'low'], { required_error: "Task type is required" }),
  end_date: z.string()
    .datetime({ message: "Invalid date format, must be ISO string" })
    .transform((date) => new Date(date))
    .optional(),
  status: z.enum(['pending', 'in progress', 'completed', 'archived'], { 
    invalid_type_error: "Invalid status" 
  }).optional(),
  assigned_to: z.string({ required_error: "Assigned to is required" }).min(1, "Assigned user ID must not be empty"),
});

export const validateTaskData = (object) => {
  return taskSchema.safeParse(object);
};
