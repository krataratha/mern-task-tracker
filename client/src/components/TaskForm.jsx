import { useState, useEffect } from "react";
import API from "../services/api";
import toast from "react-hot-toast";

function TaskForm({ fetchTasks, editingTask, setEditingTask }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description);
    }
  }, [editingTask]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.error("Title is required");
      return;
    }

    try {
      if (editingTask) {
        await API.put(`/tasks/${editingTask._id}`, {
          title,
          description,
          status: editingTask.status,
        });

        toast.success("Task Updated Successfully!");
      } else {
        await API.post("/tasks", {
          title,
          description,
        });

        toast.success("Task Added Successfully!");
      }

      setTitle("");
      setDescription("");
      setEditingTask(null);
      fetchTasks();

    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="card shadow p-4 mb-4">
      <h3 className="mb-3">
        {editingTask ? "Edit Task" : "Add New Task"}
      </h3>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <textarea
            className="form-control"
            rows="4"
            placeholder="Task Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <button className="btn btn-primary" type="submit">
          {editingTask ? "Update Task" : "Add Task"}
        </button>

        {editingTask && (
          <button
            type="button"
            className="btn btn-secondary ms-2"
            onClick={() => {
              setEditingTask(null);
              setTitle("");
              setDescription("");
            }}
          >
            Cancel
          </button>
        )}
      </form>
    </div>
  );
}

export default TaskForm;