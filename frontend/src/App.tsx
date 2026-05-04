
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from './components/Navbar.jsx';
import Dashboard from './page/Dashboard.jsx';
import JobForm from './components/JobForm.jsx';
import Kanban from './page/Kanban.jsx';
function App() {
  return(
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<h1>This is main page.</h1>} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-job" element={<JobForm />} />
        <Route path="/manage-jobs" element={<Kanban />} />
      </Routes>
    </BrowserRouter>
  )
}
export default App
