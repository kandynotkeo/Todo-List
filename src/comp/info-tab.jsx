import { useEffect, useState } from "react";
import { TodosContext } from "../utils/todos-context.jsx";

const InfoTab = () => {
  return (
    <div className="info-bar">
      <div className="info-tab">
        <TimeTab />
        <TasksNumber />
      </div>
      <StatusTab content="Incomplete Tasks" />
      <StatusTab content="Completed Tasks" />
    </div>
  );
};

const useTimeSet = () => {
  const timeFormat = { weekday: "long", month: "long", day: "numeric" };
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timeChange = () => {
      const now = new Date();
      if (now.getDay() !== time.getDay()) setTime(now);
    };
    const interval = setInterval(timeChange, 60000);
    return () => clearInterval(interval);
  }, [time]);

  return Intl.DateTimeFormat("en-US", timeFormat).format(time);
};

const TimeTab = () => {
  const time = useTimeSet();
  return <b>{time}</b>;
};

const TasksNumber = () => {
  const { todos } = TodosContext.useContext();
  const activeList = todos.filter((task) => !task.isChecked);
  return <p className="tasks-stat">{activeList.length} Active Tasks</p>;
};

const StatusTab = ({ content }) => {
  //synchronise isSelected between 2 tab
  const isSelected = true;
  return isSelected ? (
    <div className="status-tab">{content}</div>
  ) : (
    <div className="status-tab unselected">{content}</div>
  );
};

export default InfoTab;
