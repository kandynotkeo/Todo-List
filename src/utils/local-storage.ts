import type { Task } from "../comp/tasks-tab.tsx";

// Key for todo list in storage
const STORAGE_KEY = "todos-list";

export const getTodos = () => {
  const localData = localStorage.getItem(STORAGE_KEY);
  if (localData === null) return [];
  return JSON.parse(localData) as Task[];
};

export const postTodos = (todos: Task[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
};
