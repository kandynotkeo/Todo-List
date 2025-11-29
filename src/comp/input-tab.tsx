import { useEffect } from "react";
import { TodosContext } from "../utils/todos-provider.tsx";

export const InputTab = () => {
  const { add } = TodosContext.useContext();
  const handleSubmit = () => {
    const inputBox = document.getElementById(
      "task-info-input",
    ) as HTMLInputElement;
    const taskInfo = inputBox.value;
    if (taskInfo !== "") add(taskInfo);
  };

  useEffect(() => {
    document.getElementById("task-info-input")?.focus();
  }, []);

  return (
    <form className="task-input" onSubmit={handleSubmit}>
      <label>
        <input id="task-info-input" name="task" placeholder="Enter a task..." />
      </label>
      <button type="submit">Add task</button>
    </form>
  );
};
