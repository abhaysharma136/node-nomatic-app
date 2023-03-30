import { ObjectId } from "mongodb";
import { client } from "../index.js";

export async function UpdateTaskById(id, data) {
  return await client
    .db("Onstream-db")
    .collection("todoTasks")
    .updateOne({ _id: new ObjectId(id) }, { $set: data });
}
export async function DeleteTaskById(id) {
  return await client
    .db("Onstream-db")
    .collection("todoTasks")
    .deleteOne({ _id: new ObjectId(id) });
}
export async function CreateTasks(data) {
  return await client
    .db("Onstream-db")
    .collection("todoTasks")
    .insertMany(data);
}

export async function CreateTask(data) {
  return await client.db("Onstream-db").collection("todoTasks").insertOne(data);
}

export async function GetTaskById(id) {
  return await client
    .db("Onstream-db")
    .collection("todoTasks")
    .findOne({ _id: new ObjectId(id) });
}
export async function GetAllTasks() {
  return await client
    .db("Onstream-db")
    .collection("todoTasks")
    .find({})
    .toArray();
}
