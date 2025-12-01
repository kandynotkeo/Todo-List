import { useEffect, useState } from "react";
import { TodosContext } from "../utils/todos-provider.tsx";

export const InfoTab = () => {
  const firstSelected = true;
  return (
    <div className="tab">
      <div className="info-bar">
        <TimeTab />
        <TasksNumber />
      </div>
      <TabByStatus isSelected={firstSelected} content="Incomplete Tasks" />
      <TabByStatus isSelected={!firstSelected} content="Completed Tasks" />
    </div>
  );
};

const TimeTab = () => {
  const timeFormat = {
    weekday: "long" as const,
    month: "long" as const,
    day: "numeric" as const,
  };
  const time = useCurrentTime();
  return <b>{Intl.DateTimeFormat("en-US", timeFormat).format(time)}</b>;
};

const useCurrentTime = () => {
  const [displayTime, setDisplayTime] = useState(new Date());

  useEffect(() => {
    const timeChange = () => {
      const now = new Date();
      if (now.getDay() !== displayTime.getDay()) setDisplayTime(now);
    };
    const interval = setInterval(timeChange, 60 * 1000);
    return () => {
      clearInterval(interval);
    };
  }, [displayTime]);

  return displayTime;
};

const TasksNumber = () => {
  const { todos } = TodosContext.useContext();
  const activeList = todos.filter((task) => !task.isChecked);
  return <p className="tasks-stat">{activeList.length} Active Tasks</p>;
};

const TabByStatus = ({
  isSelected,
  content,
}: {
  isSelected: boolean;
  content: string;
}) => {
  const className = isSelected ? "status-bar" : "status-bar unselected";
  const handleClick = () => {
    //handle tab switch
    console.log("clicked.");
  };
  return (
    <div className={className} onClick={handleClick}>
      {content}
    </div>
  );
};
