export async function getTasks() {
  const res = await fetch(
    `http://localhost:3001/api/tasks`,{
      credentials: "include",
    }
  );
  
  if (!res.ok) {
    throw new Error("Не удалось загрузить задачи");
  }

  return res.json();
}