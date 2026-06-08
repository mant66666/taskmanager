export async function addNewUser(firstName, lastName, role, login, password) {
  const res = await fetch("http://localhost:3001/api/addnewuser", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        role: role.trim(),
        login: login.trim(),
        password,
    }),
  });

  if (!res.ok) {
    return null;
  }

  return res.json();
}
