import { useEffect, useState } from "react";
import API from "./services/api";

import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

function App() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const fetchTasks = async () => {
    try {
      setLoading(true);

      const res = await API.get("/tasks");

      setTasks(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="container mt-5">

      <h1 className="text-center mb-4">
        MERN Task Tracker
      </h1>

      <TaskForm
        fetchTasks={fetchTasks}
        editingTask={editingTask}
        setEditingTask={setEditingTask}
      />

      <div className="row my-4">

        <div className="col-md-6">

          <input
            className="form-control"
            placeholder="Search task..."
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
          />

        </div>

        <div className="col-md-6">

          <select
            className="form-select"
            value={filter}
            onChange={(e)=>setFilter(e.target.value)}
          >

            <option>All</option>
            <option>Pending</option>
            <option>Completed</option>

          </select>

        </div>

      </div>

      <TaskList
        tasks={tasks}
        fetchTasks={fetchTasks}
        loading={loading}
        search={search}
        filter={filter}
        setEditingTask={setEditingTask}
      />

    </div>
  );
}

export default App;