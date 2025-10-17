import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import TaskList from "./components/tasks/TaskList";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<TaskList />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
};

export default App;
