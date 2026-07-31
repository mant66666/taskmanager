export async function registerCompany(firstName, lastName, login, password, company) {
  const res = await fetch("http://localhost:3001/api/registercompany", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        login: login.trim(),
        password,
        company: company.trim(),
    }),
  });

  if (!res.ok) {
    return null;
  }

  return res.json();
}
