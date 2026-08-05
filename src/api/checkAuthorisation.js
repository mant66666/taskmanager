export async function checkAuthorisation(login, password) {
  const res = await fetch("http://localhost:3001/api/checkuser", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ login, password }),
    credentials: "include",
  });

  if (!res.ok) {
    return null;
  }

  return res.json();
}
