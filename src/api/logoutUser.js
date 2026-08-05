export async function logOutCurrentUser() {
  const res = await fetch("http://localhost:3001/api/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include"
  });
  if (res.status === 401) {
    return null;
  }
  if (res.status === 204) {
    return null;
  }
  if (!res.ok) {
    throw new Error("Не удалось выйти");
  }

  return res.json();
}
