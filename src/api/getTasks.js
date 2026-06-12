export async function getTasks() {
  const res = await fetch("http://localhost:3001/api/tasks");
  return res.json();
}