import { prisma } from "@/lib/prisma.js";
import type { AppRouteHandler } from "@/schema/route-handler.js";
import type {
  CreateTaskRoute,
  DeleteTaskRoute,
  GetTaskRoute,
  GetTasksRoute,
  UpdateTaskRoute,
} from "./index.js";

export const getTasks: AppRouteHandler<GetTasksRoute> = async (c) => {
  const tasks = await prisma.task.findMany();

  return c.json({ tasks }, 200);
};

export const getTask: AppRouteHandler<GetTaskRoute> = async (c) => {
  const { id } = c.req.valid("param");

  const task = await prisma.task.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      description: true,
      completed: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!task) return c.json({ message: "Task not found" }, 404);

  return c.json(task, 200);
};

export const createTask: AppRouteHandler<CreateTaskRoute> = async (c) => {
  try {
    const { name, description, completed } = c.req.valid("json");

    const task = await prisma.task.create({
      data: {
        name,
        description,
        completed: completed ?? false, // Default to false if not provided
      },
      select: {
        id: true,
        name: true,
        description: true,
        completed: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return c.json(task, 200);
  } catch (error) {
    return c.json({ message: error }, 500);
  }
};

export const deleteTask: AppRouteHandler<DeleteTaskRoute> = async (c) => {
  try {
    const { id } = c.req.valid("param");

    const task = await prisma.task.delete({
      where: { id },
    });

    return c.json({ message: "Task deleted successfully" }, 200);
  } catch (error) {
    return c.json({ message: error }, 500);
  }
};

export const updateTask: AppRouteHandler<UpdateTaskRoute> = async (c) => {
  try {
    const { id } = c.req.valid("param");
    const updates = c.req.valid("json");

    if (Object.keys(updates).length === 0) {
      return c.json({ message: "No updates provided" }, 400);
    }

    const task = await prisma.task.update({
      where: { id },
      data: updates,
      select: {
        id: true,
        name: true,
        description: true,
        completed: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!task) return c.json({ message: "Task not found" }, 404);

    return c.json(task, 200);
  } catch (error) {
    return c.json({ message: error }, 500);
  }
};
