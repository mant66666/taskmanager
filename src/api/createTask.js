export async function createTask(task) {
  const res = await fetch("http://localhost:3001/api/addtask", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify( task ),
  });

  if (!res.ok) {
    throw new Error("Не удалось создать задачу");
  }

  return res.json();
}
