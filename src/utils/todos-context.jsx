import contextFactory from "./context-factory.js";
import { getTodos, pushTodos } from "./todos-data.jsx";
import { useState } from "react";
import { Task } from "../comp/todos-list.jsx";

export const TodosContext = contextFactory({
  todos: getTodos(),
  add: () => {},
  check: () => {},
  remove: () => {},
});

export const TodosProvider = ({ children }) => {
  const [todos, setTodos] = useState(() => getTodos());

  const add = (taskInfo) => {
    if (taskInfo !== "") {
      const uuid = crypto.randomUUID();
      const newTask = Task(uuid, taskInfo, false);

      setTodos((prevTodos) => {
        const newTodos = [...prevTodos, newTask];
        pushTodos(newTodos);
        return newTodos;
      });
    }
  };

  const check = (uuid) => {
    setTodos((prevTodos) => {
      const newTodos = prevTodos.map((task) => {
        if (task.uuid === uuid) return { ...task, isChecked: !task.isChecked };
        return task;
      });
      pushTodos(newTodos);
      return newTodos;
    });
  };

  const remove = (uuid) => {
    setTodos((prevTodos) => {
      const newTodos = prevTodos.filter((task) => task.uuid !== uuid);
      pushTodos(newTodos);
      return newTodos;
    });
  };

  return (
    <TodosContext.Provider value={{ todos, add, check, remove }}>
      {children}
    </TodosContext.Provider>
  );
};
