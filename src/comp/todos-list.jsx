import { CheckIcon, TrashIcon } from "./icon.jsx";
import { TodosContext } from "../utils/todos-context.jsx";

export const Task = (uuid, taskInfo, isChecked) => ({
  uuid,
  taskInfo,
  isChecked,
});

const TaskInList = ({ uuid, taskInfo, isChecked }) => {
  const pClass = `task-name${isChecked ? " checked" : ""}`;
  return (
    <div className="task-info">
      <CheckIcon uuid={uuid} />
      <p className={pClass}>{taskInfo}</p>
      <TrashIcon uuid={uuid} />
    </div>
  );
};

const TodoList = () => {
  const { todos } = TodosContext.useContext();
  return todos.map((task) => <TaskInList key={task.uuid} {...task} />);
};

export default TodoList;
