export async function createTask(task) {
  const res = await fetch("http://localhost:3001/api/addtask", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify( task ),
  });

  return res.json();
}