export async function getUsers() {
  const res = await fetch("http://localhost:3001/api/users");
  return res.json();
}