const express = require("express");

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});
app.use(express.json());

const tasks = [];

const users = [
        {
            name: 'Alex Carter',
            login: 'alex',
            password: 'alex123',
            role: 'Frontend Developer',
            company: 'NovaTech',
        },
        {
            name: 'Mia Johnson',
            login: 'mia',
            password: 'mia123',
            role: 'Project Manager',
            company: 'BlueSoft',
        },
        {
            name: 'Daniel Lee',
            login: 'daniel',
            password: 'daniel123',
            role: 'UI/UX Designer',
            company: 'PixelForge',
        },
        {
            name: 'Sophia Brown',
            login: 'sophia',
            password: 'sophia123',
            role: 'QA Engineer',
            company: 'TestLab',
        },
        {
            name: 'Ethan Wilson',
            login: 'ethan',
            password: 'ethan123',
            role: 'Backend Developer',
            company: 'CloudCore',
        },
];
function checkAuthorisation(loginValue, passwordValue){
  const existUser = users.find((user) =>
    user.login === loginValue && user.password === passwordValue
  );

  if (!existUser) {
    return null;
  }

  const { password, ...userWithoutPassword } = existUser;

  return userWithoutPassword;
}
app.get("/api/tasks", (req, res) => {
  res.json(tasks);
});
app.get("/api/users", (req, res) => {
  res.json(users);
});
app.post("/api/checkuser", (req, res) => {
  const { login, password } = req.body;

  const authorisedUser = checkAuthorisation(login, password);

  if (!authorisedUser) {
    return res.status(401).json({ message: "Wrong login or password" });
  }

  res.json(authorisedUser);
});
app.listen(3001, () => {
  console.log("Server is running on http://localhost:3001");
});
