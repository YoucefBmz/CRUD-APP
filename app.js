// https://www.youtube.com/watch?v=qRz5udg8zoE

const express = require("express");
const app = express();
const db = require("./connection");

const postModel = require("./postModel");

app.use(express.urlencoded({ extended: true })); // allow the server to recive json files
app.use(express.json());

// reate routes :

app.post("/", async (req, res) => {
  const { title, content } = req.body;
  try {
    const newPost = await postModel.create({ title, content });
    res.send(newPost);
    console.log("post saved into DB succesfully!! go check the DB!");
  } catch (err) {
    res.status(500).send(err);
  }
});
// get all posts ...
app.get("/", async (req, res) => {
  try {
    const posts = await postModel.find();
    res.send(posts);
  } catch (err) {
    res.status(500).send(err);
  }
});

// get one doc ...
app.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const post = await postModel.findById(id);
    res.send(post);
  } catch (err) {
    res.status(500).send(err);
  }
});

// put ... to update
app.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  try {
    const post = await postModel.findByIdAndUpdate(id, { title, content });
    res.send(post);
  } catch (err) {
    res.status(500).send(err);
  }
});

// delete ....
app.delete("/:id", async (req, res) => {
  const { id } = req.params;
  //const { title, content } = req.body;
  try {
    const post = await postModel.findByIdAndDelete(id);
    res.json("deleted !!");
  } catch (err) {
    res.status(500).send(err);
  }
});

// run the server ...
const port = 3000;
app.listen(port, () => {
  console.log(`server up and runnig in port ${port}`);
});
