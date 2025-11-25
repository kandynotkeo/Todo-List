// Key for todo list
const STORAGE_KEY = "todosList";

export function getTodos() {
  const todos = JSON.parse(localStorage.getItem(STORAGE_KEY));
  
  if (todos) return todos;
  return [];
}

export function pushTodos(todos) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}