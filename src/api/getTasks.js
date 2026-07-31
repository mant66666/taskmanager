export async function getTasks(userId) {
  const res = await fetch(
    `http://localhost:3001/api/tasks?userId=${encodeURIComponent(userId)}`
  );

  if (!res.ok) {
    throw new Error("Не удалось загрузить задачи");
  }

  return res.json();
}