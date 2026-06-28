import API from "../services/api";
import toast from "react-hot-toast";

function TaskList({
  tasks,
  fetchTasks,
  loading,
  search,
  filter,
  setEditingTask,
}) {
  const deleteTask = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;

    try {
      await API.delete(`/tasks/${id}`);
      toast.success("Task deleted successfully!");
      fetchTasks();
    } catch (error) {
      toast.error("Failed to delete task");
    }
  };

  const markCompleted = async (task) => {
    try {
      await API.put(`/tasks/${task._id}`, {
        ...task,
        status: "Completed",
      });

      toast.success("Task marked as completed!");
      fetchTasks();
    } catch (error) {
      toast.error("Failed to update task");
    }
  };

  const filteredTasks = tasks.filter((task) => {
    const matchTitle = task.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchStatus =
      filter === "All" || task.status === filter;

    return matchTitle && matchStatus;
  });

  if (loading) {
    return (
      <div className="text-center">
        <h4>Loading...</h4>
      </div>
    );
  }

  if (filteredTasks.length === 0) {
    return (
      <div className="alert alert-info">
        No tasks found.
      </div>
    );
  }

  return (
    <div className="row">
      {filteredTasks.map((task) => (
        <div className="col-md-6 mb-4" key={task._id}>
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h4>{task.title}</h4>

              <p>{task.description}</p>

              <span
                className={
                  task.status === "Completed"
                    ? "badge bg-success"
                    : "badge bg-warning text-dark"
                }
              >
                {task.status}
              </span>

              <p className="mt-3">
                <small>
                  Created:
                  {" "}
                  {new Date(task.createdAt).toLocaleDateString()}
                </small>
              </p>

              <div className="mt-3">

                <button
                  className="btn btn-warning me-2"
                  onClick={() => setEditingTask(task)}
                >
                  Edit
                </button>

                <button
                  className="btn btn-success me-2"
                  onClick={() => markCompleted(task)}
                  disabled={task.status === "Completed"}
                >
                  Complete
                </button>

                <button
                  className="btn btn-danger"
                  onClick={() => deleteTask(task._id)}
                >
                  Delete
                </button>

              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TaskList;