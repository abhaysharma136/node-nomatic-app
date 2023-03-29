import express from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();
const app = express();
app.use(express.json());
const PORT = 4000;

const tasks = [
  {
    userId: 101,
    task: "Wake up at 7 PM",
    completed: false,
  },
  {
    userId: 102,
    task: "Workout",
    completed: false,
  },
];

const MOngo_URL = process.env.MOngo_URL;

async function createConnection() {
  const client = new MongoClient(MOngo_URL);
  await client.connect();
  console.log("Monogo is connected 👍");
  return client;
}

const client = await createConnection();

app.get("/", function (req, res) {
  res.send("hello world");
});
app.get("/tasks", async function (req, res) {
  //db.tasks.find({})
  const tasks = await client
    .db("Onstream-db")
    .collection("todoTasks")
    .find({})
    .toArray();
  res.send(tasks);
});
app.get("/tasks/:id", async function (req, res) {
  const { id } = req.params;
  console.log(req.params, id);
  const task = await client
    .db("Onstream-db")
    .collection("todoTasks")
    .findOne({ userId: id });
  console.log(task);
  task ? res.send(task) : res.status(404).send({ msg: "task not found" });
  res.send();
});

//Creating data in mongodb api
app.post("/tasks", async function (req, res) {
  const data = req.body;
  console.log(data);
  //db.tasks.insertmany(data);

  const result = await client
    .db("Onstream-db")
    .collection("todoTasks")
    .insertMany(data);
  res.send(result);
});

app.listen(PORT, () => console.log(`App started in ${PORT}`));
