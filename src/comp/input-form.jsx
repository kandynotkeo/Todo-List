import { TodosContext } from "../utils/todos-context.jsx";
import { useEffect } from "react";

const InputTask = () => {
  const { add } = TodosContext.useContext();
  const handleSubmit = (e) => {
    const form = new FormData(e.target);
    const taskInfo = Object.fromEntries(form.entries()).task.trim();
    add(taskInfo);
  };

  useEffect(() => {
    document.getElementById("task-info-input").focus();
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

export default InputTask;
