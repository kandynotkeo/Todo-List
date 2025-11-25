import "./App.css";
import InfoTab from "./comp/info-tab.jsx";
import InputTask from "./comp/input-form.jsx";
import TodoList from "./comp/todos-list.jsx";
import { TodosProvider } from "./utils/todos-context.jsx";

function App() {
  return (
    <TodosProvider>
      <InfoTab />
      <InputTask />
      <TodoList />
    </TodosProvider>
  );
}

export default App;
