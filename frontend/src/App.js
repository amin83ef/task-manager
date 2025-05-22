import React, { useEffect, useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import { getTasks } from "./api";

const App = () => {
  const [tasks, setTasks] = useState([]);

  // گرفتن لیست تسک‌ها در بارگذاری اولیه
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getTasks();
        setTasks(data);
      } catch (err) {
        console.error("خطا در دریافت تسک‌ها:", err);
      }
    };
    fetchTasks();
  }, []);

  // افزودن تسک جدید
  const handleTaskAdded = (newTask) => {
    setTasks([newTask, ...tasks]);
  };

  // حذف تسک
  const handleTaskDeleted = (id) => {
    setTasks(tasks.filter((task) => task._id !== id));
  };

  // به‌روزرسانی تسک
  const handleTaskUpdated = (updatedTask) => {
    setTasks(
      tasks.map((task) => (task._id === updatedTask._id ? updatedTask : task))
    );
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">مدیریت تسک‌ها 📝</h2>
      <TaskForm onTaskAdded={handleTaskAdded} />
      <TaskList
        tasks={tasks}
        onTaskDeleted={handleTaskDeleted}
        onTaskUpdated={handleTaskUpdated}
      />
    </div>
  );
};

export default App;
