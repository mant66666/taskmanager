export async function getUsers(userId) {
  const res = await fetch(
    `http://localhost:3001/api/users?userId=${encodeURIComponent(userId)}`
  );

  if (res.status === 403) {
    return [];
  }

  if (!res.ok) {
    throw new Error("Не удалось загрузить пользователей");
  }

  return res.json();
}