import { TodosContext } from "../utils/todos-provider.tsx";
import { CheckIcon, TrashIcon } from "./import-fontawesome.tsx";

export interface Task {
  uuid: string;
  taskInfo: string;
  isChecked: boolean;
}

const TaskInList = ({ uuid, taskInfo, isChecked }: Task) => {
  const { check, remove } = TodosContext.useContext();
  const pClass = "task-info " + (isChecked ? "checked" : "");

  const handleCheck = () => {
    check(uuid);
  };

  const handleRemove = () => {
    remove(uuid);
  };

  return (
    <div className="task-in-list">
      <CheckIcon onClick={handleCheck} />
      <p className={pClass}>{taskInfo}</p>
      <TrashIcon onClick={handleRemove} />
    </div>
  );
};

export const TasksTab = () => {
  const { todos } = TodosContext.useContext();
  return todos.map((task) => (
    <TaskInList
      uuid={task.uuid}
      taskInfo={task.taskInfo}
      isChecked={task.isChecked}
    />
  ));
};
