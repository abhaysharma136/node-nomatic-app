import express from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import { taskRouter } from "./routes/todoTask.js";
import cors from "cors";
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
const PORT = 4000;

// const tasks = [
//   {
//     userId: 101,
//     task: "Wake up at 7 PM",
//     completed: false,
//   },
//   {
//     userId: 102,
//     task: "Workout",
//     completed: false,
//   },
// ];

const MOngo_URL =
  "mongodb+srv://abhaysharma136:8854892348absh@cluster0.dfdpejd.mongodb.net";

async function createConnection() {
  const client = new MongoClient(MOngo_URL);
  await client.connect();
  console.log("Monogo is connected 👍");
  return client;
}

export const client = await createConnection();

app.get("/", function (req, res) {
  res.send("hello world");
});

app.use("/tasks", taskRouter);

app.listen(PORT, () => console.log(`App started in ${PORT}`));
