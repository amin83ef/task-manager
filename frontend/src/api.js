import axios from "axios";

const API_URL = "http://localhost:5000/api/tasks";

// دریافت تمام تسک‌ها
export const getTasks = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

// افزودن تسک جدید
export const createTask = async (task) => {
  const res = await axios.post(API_URL, task);
  return res.data;
};

// ویرایش تسک
export const updateTask = async (id, updatedTask) => {
  const res = await axios.put(`${API_URL}/${id}`, updatedTask);
  return res.data;
};

// حذف تسک
export const deleteTask = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};
