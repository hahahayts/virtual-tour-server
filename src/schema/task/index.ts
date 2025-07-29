import { z } from "@hono/zod-openapi";

export const TaskSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  completed: z.boolean(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export const TaskResponseSchema = z.object({
  tasks: z.array(TaskSchema),
});

export const CreateTaskSchema = z.object({
  name: z.string().min(1, "Name is required."),
  description: z.string().min(1, "Description is required."),
  completed: z.boolean().optional(),
});

export const TaskUpdateSchema = CreateTaskSchema.partial();
