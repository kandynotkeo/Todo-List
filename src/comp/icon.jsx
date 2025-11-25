import { TodosContext } from "../utils/todos-context.jsx";

export const CheckIcon = ({ uuid }) => {
  const { check } = TodosContext.useContext();
  const handleClick = () => check(uuid);
  return <i className="fa-solid fa-circle-check" onClick={handleClick} />;
};

export const TrashIcon = ({ uuid }) => {
  const { remove } = TodosContext.useContext();
  const handleClick = () => remove(uuid);
  return <i className="fa-solid fa-trash" onClick={handleClick} />;
};
