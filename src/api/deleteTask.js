export async function deleteTask(task) {
  const res = await fetch("http://localhost:3001/api/deletetask", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify( task ),
  });

  if (!res.ok) {
    throw new Error("Не удалось удалить задачу");
  }

  return res.json();
}
