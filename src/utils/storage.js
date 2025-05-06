export const loadData = () => {
  try {
    return JSON.parse(localStorage.getItem("task-board-data"));
  } catch {
    return null;
  }
};

export const saveData = (data) => {
  localStorage.setItem("task-board-data", JSON.stringify(data));
};
