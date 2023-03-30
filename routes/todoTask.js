import express from "express";
import {
  GetAllTasks,
  GetTaskById,
  CreateTasks,
  DeleteTaskById,
  UpdateTaskById,
  CreateTask,
} from "./helper.js";
const router = express.Router();

router.get("/", async function (req, res) {
  //db.tasks.find({})
  const tasks = await GetAllTasks();
  res.send(tasks);
});

//Get data from ID
router.get("/:id", async function (req, res) {
  const { id } = req.params;
  console.log(req.params, id);
  const task = await GetTaskById(id);
  console.log(task);
  //   task ? res.send(task) : res.send({ msg: "task not found" });
  res.send(task);
});

//Creating Tasks in mongodb api
router.post("/", async function (req, res) {
  const data = req.body;
  console.log(data);
  //db.tasks.insertmany(data);
  const result = await CreateTasks(data);
  res.send(result);
});

//Creating Task in mongodb api
router.post("/add", async function (req, res) {
  const data = req.body;
  console.log(data);
  //db.tasks.insertmany(data);
  const result = await CreateTask(data);
  res.send(result);
});

//Delete operation

router.delete(`/:id`, async function (req, res) {
  const { id } = req.params;
  console.log(req.params, id);

  const result = await DeleteTaskById(id);
  console.log(result);
  result.deletedCount > 0
    ? res.send({ msg: "Movie was Successfully Deleted" })
    : res.status(404).send({ msg: "Movie not Found" });
});

//Update Operation
router.put("/:id", async function (req, res) {
  const { id } = req.params;
  console.log(req.params, id);
  const data = req.body;

  const result = await UpdateTaskById(id, data);
  res.send(result);
});

export const taskRouter = router;
