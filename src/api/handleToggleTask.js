export async function handleToggleTask(task) {
  const res = await fetch("http://localhost:3001/api/edittask", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });
  if (!res.ok) {
    throw new Error("Не удалось изменить задачу");
  }
  return res.json();
}
