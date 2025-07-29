import configureOpenApiApp from "@/lib/configure-open-api-app.js";
import {
  createTask,
  deleteTask,
  getTask,
  getTasks,
  updateTask,
} from "./handler.js";
import {
  createTaskRoute,
  deleteTaskRoute,
  getTaskRoute,
  getTasksRoute,
  updateTaskRoute,
} from "./index.js";

const taskRoutes = configureOpenApiApp()
  .openapi(getTasksRoute, getTasks)
  .openapi(getTaskRoute, getTask)
  .openapi(createTaskRoute, createTask)
  .openapi(deleteTaskRoute, deleteTask)
  .openapi(updateTaskRoute, updateTask);

export default taskRoutes;
