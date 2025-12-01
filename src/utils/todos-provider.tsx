import React, { useState } from "react";
import { contextFactory } from "./context-factory.ts";
import { getTodos, postTodos } from "./local-storage.ts";
import type { Task } from "../comp/tasks-tab.tsx";

export const TodosContext = contextFactory<{
  todos: Task[];
  add: (taskInfo: string) => void;
  check: (uuid: string) => void;
  remove: (uuid: string) => void;
}>(null);

export const TodosProvider = ({ children }: { children: React.ReactNode }) => {
  const [todos, setTodos] = useState(() => getTodos());

  const add = (taskInfo: string) => {
    if (taskInfo !== "") {
      const uuid = crypto.randomUUID();
      const newTask: Task = { uuid, taskInfo, isChecked: false };
      setTodos((prevTodos) => {
        const newTodos = [...prevTodos, newTask];
        postTodos(newTodos);
        return newTodos;
      });
    }
  };

  const check = (uuid: string) => {
    setTodos((prevTodos) => {
      const newTodos = prevTodos.map((task) => {
        if (task.uuid === uuid) return { ...task, isChecked: !task.isChecked };
        return task;
      });
      postTodos(newTodos);
      return newTodos;
    });
  };

  const remove = (uuid: string) => {
    setTodos((prevTodos) => {
      const newTodos = prevTodos.filter((task) => task.uuid !== uuid);
      postTodos(newTodos);
      return newTodos;
    });
  };

  return (
    <TodosContext.Provider value={{ todos, add, check, remove }}>
      {children}
    </TodosContext.Provider>
  );
};
