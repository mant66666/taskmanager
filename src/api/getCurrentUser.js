export async function getCurrentUser() {
  const res = await fetch("http://localhost:3001/api/me", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include"
  });
  if (res.status === 401) {
    return null;
  }
  if (!res.ok) {
    throw new Error("Не удалось найти серверную сессию");
  }

  return res.json();
}
