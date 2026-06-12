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

let tasks = [];

let users = [
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
function checkServerAuthorisation(loginValue, passwordValue){
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
app.post("/api/addtask", (req, res) => {
  const { id,title,text,completed,creator,executors } =req.body;
  const newTask = { id, title, text, completed, creator, executors };
  tasks.push(newTask);
  res.json(newTask);
});
app.post("/api/edittask", (req, res) => {
  const { id,title,text,executors, completed } =req.body;
  const updatedTasks = tasks.map((task) => {
    if (task.id === id) {
    return {
        ...task,
        ...(title !== undefined && { title }),
        ...(text !== undefined && { text }),
        ...(executors !== undefined && { executors }),
        ...(completed !== undefined && { completed }),
    };
    }       
    return task;
  });
  tasks=updatedTasks;
  res.json(tasks);
});
app.get("/api/users", (req, res) => {
  res.json(users);
});
app.post("/api/deletetask", (req, res) => {
  const {id} =req.body;
  const newTasks = tasks.filter((task) => task.id !== id);
  tasks=newTasks;
  res.json(newTasks);
});

app.post("/api/addnewuser", (req, res) => {
  const { firstName, lastName, role, login, password } = req.body;

  const existingUser = users.find((user) => user.login === login);

  if (existingUser) {
    return res.status(409).json({ message: "Login already exists" });
  }

  const newUser = {
    name: `${firstName} ${lastName}`.trim(),
    firstName,
    lastName,
    role,
    login,
    password,
  };

  users.push(newUser);

  const { password: userPassword, ...userWithoutPassword } = newUser;

  res.status(201).json(userWithoutPassword);
});
app.post("/api/checkuser", (req, res) => {
  const { login, password } = req.body;

  const authorisedUser = checkServerAuthorisation(login, password);

  if (!authorisedUser) {
    return res.status(401).json({ message: "Wrong login or password" });
  }

  res.json(authorisedUser);
});

app.listen(3001, () => {
  console.log("Server is running on http://localhost:3001");
});
