import React from "react";
import { deleteTask, updateTask } from "../api";

const TaskList = ({ tasks, onTaskDeleted, onTaskUpdated }) => {
  const handleToggleComplete = async (task) => {
    try {
      const updated = await updateTask(task._id, {
        completed: !task.completed,
      });
      onTaskUpdated(updated);
    } catch (err) {
      console.error("خطا در تغییر وضعیت تسک:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      onTaskDeleted(id);
    } catch (err) {
      console.error("خطا در حذف تسک:", err);
    }
  };

  const handleEdit = async (task) => {
    const newTitle = prompt("عنوان جدید تسک:", task.title);
    if (newTitle && newTitle.trim() !== "" && newTitle !== task.title) {
      try {
        const updated = await updateTask(task._id, { title: newTitle });
        onTaskUpdated(updated);
      } catch (err) {
        console.error("خطا در ویرایش تسک:", err);
      }
    }
  };

  return (
    <ul className="list-group">
      {tasks.map((task) => (
        <li
          key={task._id}
          className={`list-group-item d-flex justify-content-between align-items-center ${
            task.completed ? "list-group-item-success" : ""
          }`}
        >
          <span
            style={{
              textDecoration: task.completed ? "line-through" : "none",
              cursor: "pointer",
            }}
            onClick={() => handleToggleComplete(task)}
          >
            {task.title}
          </span>
          <div>
            <button
              className="btn btn-sm btn-secondary mx-1"
              onClick={() => handleEdit(task)}
            >
              ✏️ ویرایش
            </button>
            <button
              className="btn btn-sm btn-danger"
              onClick={() => handleDelete(task._id)}
            >
              حذف
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
