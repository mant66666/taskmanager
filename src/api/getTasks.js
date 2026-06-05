export async function getTasks() {
  const res = await fetch("http://localhost:3001/api/tasks");
  return res.json();
}

export async function createTask(title) {
  const res = await fetch("http://localhost:3001/api/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title }),
  });

  return res.json();
}