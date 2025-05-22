import React, { useState } from "react";
import { createTask } from "../api";

const TaskForm = ({ onTaskAdded }) => {
  const [title, setTitle] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      const newTask = await createTask({ title });
      setTitle("");
      onTaskAdded(newTask); 
    } catch (err) {
      console.error("خطا در افزودن تسک:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="عنوان تسک را وارد کنید..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button type="submit" className="btn btn-primary">
          افزودن
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
