import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import TaskList from "./components/tasks/TaskList";
import TaskDetail from "./components/tasks/TaskDetail";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<TaskList />} />
          <Route path="/task/:id" element={<TaskDetail />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
};

export default App;
