require("dotenv").config();

const express = require("express");
const { Pool } = require("pg");

const db = new Pool({
  connectionString: process.env.DATABASE_URL,
});
const app = express();

app.use((req, res, next) => {
  const allowedOrigins = ["http://localhost:3000", "http://127.0.0.1:3000"];
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});
app.use(express.json());


async function checkServerAuthorisation(loginValue, passwordValue){
  const users=await getAllUsers();
  const existUser = users.find((user) =>
    user.login === loginValue && user.password === passwordValue
  );

  if (!existUser) {
    return null;
  }

  const { password, ...userWithoutPassword } = existUser;

  return userWithoutPassword;
}

function normalizeTask(task) {
  return {
    ...task,
    creator:
      typeof task.creator === "string"
        ? JSON.parse(task.creator)
        : task.creator,
    executors:
      typeof task.executors === "string"
        ? JSON.parse(task.executors)
        : task.executors,
  };
}
async function getAllTasks(){
  try {
    const result = await db.query("SELECT * FROM tasks");
    const tasks = result.rows.map((task) => normalizeTask(task));

    return tasks;
  } catch (error) {
    console.error(error);
    return [];
  }
}
app.get("/api/tasks", async (req, res) => {
  try {
    const tasks = await getAllTasks();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Failed to get tasks" });
  }
});
app.post("/api/addtask", async (req, res) => {
  try {
    const { id, title, text, completed, creator, executors } = req.body;

    const result = await db.query(
      `INSERT INTO tasks (id, title, text, completed, creator, executors)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [id, title, text, completed, creator, JSON.stringify(executors)]
    );

    res.json(normalizeTask(result.rows[0]));
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create task" });
  }
});
app.post("/api/edittask", async (req, res) => {
  try {
    const { id,title,text,executors, completed } =req.body;
    const currentTask = await db.query("SELECT * FROM tasks WHERE id = $1", [id]);
    const oldTask = currentTask.rows[0];
    await db.query(
      `UPDATE tasks SET title = $2, text = $3, executors = $4, completed = $5 WHERE id = $1`,
      [
        id,
        title !== undefined ? title : oldTask.title,
        text !== undefined ? text : oldTask.text,
        executors !== undefined ? JSON.stringify(executors) : oldTask.executors,
        completed !== undefined ? completed : oldTask.completed,
      ]
    );
    const tasks = await getAllTasks();
    res.json(tasks);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to edit task" });
    }
});
app.post("/api/deletetask", async (req, res) => {
  try {
    const { id } = req.body;
    await db.query("DELETE FROM tasks WHERE id = $1", [id]);
    const tasks = await getAllTasks();
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete task" });
  }
});

async function getAllUsers(){
  try {
    const result = await db.query("SELECT * FROM users");
    const users = result.rows;

    return users;
  } catch (error) {
    console.error(error);
    return [];
  }
}
app.get("/api/users", async (req, res) => {
  try {
    const result = await getAllUsers();
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to get users" });
  }
});
app.post("/api/addnewuser", async (req, res) => {
  try {
    const { firstName, lastName, login, password, role} = req.body;
    const name = `${firstName} ${lastName}`.trim();
    const result = await db.query(
      `INSERT INTO users (name, login, password, role)
      VALUES ($1, $2, $3, $4)
      RETURNING *`,
      [name, login, password, role]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create user" });
  }
});
app.post("/api/checkuser", async (req, res) => {
  const { login, password } = req.body;

  const authorisedUser = await checkServerAuthorisation(login, password);

  if (!authorisedUser) {
    return res.status(401).json({ message: "Wrong login or password" });
  }

  res.json(authorisedUser);
});

app.listen(3001, () => {
  console.log("Server is running on http://localhost:3001");
});
