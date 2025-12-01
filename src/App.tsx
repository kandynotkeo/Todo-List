import "./App.css";
import { InfoTab } from "./comp/info-tab.tsx";
import { InputTab } from "./comp/input-tab.tsx";
import { TasksTab } from "./comp/tasks-tab.tsx";
import { TodosProvider } from "./utils/todos-provider.tsx";

const App = () => {
  return (
    <TodosProvider>
      <InfoTab />
      <InputTab />
      <TasksTab />
    </TodosProvider>
  );
};

export default App;
