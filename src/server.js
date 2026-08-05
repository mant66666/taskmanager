require("dotenv").config();

const express = require("express");
const { Pool } = require("pg");
const session = require("express-session");

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
  res.setHeader("Access-Control-Allow-Credentials", "true");
  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});
app.use(express.json());

if (!process.env.SESSION_SECRET) {
  throw new Error("SESSION_SECRET is not set");
}

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);


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

async function isLoginAvailable(loginValue) {
  const users = await getAllUsers();

  return !users.some((user) => user.login === loginValue);
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

app.get("/api/me", async (req, res) => {
  const userId = req.session.userId;

  if (!userId) {
    return res.status(401).json({ message: "Not authorised" });
  }

  const userResult = await db.query(
    "SELECT id, name, login, role, company FROM users WHERE id = $1",
    [userId]
  );

  const user = userResult.rows[0];

  if (!user) {
    return res.status(401).json({ message: "User not found" });
  }

  return res.json(user);
});

app.post("/api/logout", (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      return res.status(500).json({ message: "Failed to log out" });
    }

    res.clearCookie("connect.sid");
    return res.sendStatus(204);
  });
});

app.get("/api/tasks", async (req, res) => {
  try {
    const userId = req.session.userId;
    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }
    const userResult = await db.query(
      "SELECT company FROM users WHERE id = $1",
      [userId]
    );
    const user = userResult.rows[0];
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const result = await db.query(
      "SELECT * FROM tasks WHERE company = $1",
      [user.company]
    );
    const tasks = result.rows.map((task) => normalizeTask(task));
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to get tasks" });
  }
});
app.post("/api/addtask", async (req, res) => {
  try {
    const { id, title, text, completed, company, creator, executors } = req.body;

    const result = await db.query(
      `INSERT INTO tasks (id, title, text, completed, company, creator, executors)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *`,
      [id, title, text, completed, company, creator, JSON.stringify(executors)]
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
        JSON.stringify(
          executors !== undefined ? executors : oldTask.executors
        ),
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

app.get("/api/users", async (req, res) => {
  try {
    const { userId } = req.query;

    const currentUserResult = await db.query(
      "SELECT role, company FROM users WHERE id = $1",
      [userId]
    );

    const currentUser = currentUserResult.rows[0];

    if (!currentUser) {
      return res.status(404).json({ message: "User not found" });
    }

    if (currentUser.role !== "founder") {
      return res.json([]);
    }

    const usersResult = await db.query(
      `SELECT id, name, login, role, company
       FROM users
       WHERE company = $1`,
      [currentUser.company]
    );

    res.json(usersResult.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to get users" });
  }
});
app.post("/api/addnewuser", async (req, res) => {
  try {
    const { firstName, lastName, login, password, role, company} = req.body;
    const id = Date.now();
    const name = `${firstName} ${lastName}`.trim();
    const result = await db.query(
      `INSERT INTO users (id, name, login, password, role, company)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *`,
      [id, name, login, password, role, company]
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
  req.session.userId = authorisedUser.id;
  
  res.json(authorisedUser);
});



async function isCompanyNameAvailable(company){
  try {
    const result = await db.query("SELECT * FROM companies WHERE name=$1",[company]);

    const existcompany = result.rows;
    if (result.rows.length === 0) {
      return true
    } else {
      return false
    }
  } catch (error) {
  console.error(error);
  return null;
  }
  }

app.post("/api/registercompany", async (req,res) =>{
    try {
      const { firstName, lastName, login, password, company} = req.body;
      const authorisedUser = await checkServerAuthorisation(login, password);
      let availableCompany=await isCompanyNameAvailable(company);
      const name = `${firstName} ${lastName}`.trim();
      const id = Date.now();
      if (authorisedUser&&availableCompany){
        const result = await db.query(
          `INSERT INTO companies (name, creator_id) VALUES ($1, $2) RETURNING id`,
          [company, authorisedUser.id]
        );
        return res.status(201).json({
          message: "Company created successfully",
          company: result.rows[0],
        });
      }

      if (availableCompany === null) {
        return res.status(500).json({
          message: "Failed to check company name",
        });
      }
      if (availableCompany === false) {
        return res.status(409).json({
          message: "company with your name already exists",
        });
      }
      if (!authorisedUser){
        let addUser = await db.query(
          `INSERT INTO users (id, name, login, password, role, company)
          VALUES ($1, $2, $3, $4, $5, $6)
          RETURNING *`,
          [id, name, login, password, "founder", company]
        );
        let addCompany = await db.query(
          `INSERT INTO companies (name, creator_id) VALUES ($1, $2) RETURNING id`,
          [company, id]
        );
        return res.status(201).json({
          message: "User and company created successfully",
        });
      }
        
    }
    catch(error){
      console.error(error);
      res.status(500).json({ message: "Failed to create company" });
    }
})

app.listen(3001, () => {
  console.log("Server is running on http://localhost:3001");
});
