const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const methodOverride = require("method-override");

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

let posts = [
  {
    id: uuidv4(),
    username: "techsavvy",
    content: "Embrace the power of technology to innovate and inspire.",
  },
  {
    id: uuidv4(),
    username: "wellnessguru",
    content: "Consistency and perseverance are the keys to lasting success.",
  },
  {
    id: uuidv4(),
    username: "creativemind",
    content: "Creativity is the art of turning new ideas into reality.",
  },
  {
    id: uuidv4(),
    username: "growthhacker",
    content: "Focus on growth, and everything else will follow.",
  },
  {
    id: uuidv4(),
    username: "coderlife",
    content: "Coding is not just a skill; it's a way of solving problems.",
  },
  {
    id: uuidv4(),
    username: "designthinker",
    content: "Design is where science and art break even.",
  },
];

app.get("/posts", (req, res) => {
  res.render("index.ejs", { posts });
});
app.get("/posts/new", (req, res) => {
  res.render("new.ejs");
});
app.post("/posts", (req, res) => {
  let { username, content } = req.body;
  let id = uuidv4();
  posts.push({ id, username, content });
  res.redirect("/posts");
});
app.get("/posts/:id", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);
  res.render("show.ejs", { post });
});

app.patch("/posts/:id", (req, res) => {
  let { id } = req.params;
  let newContent = req.body.content;
  let post = posts.find((p) => id === p.id);
  post.content = newContent;
  console.log(post);
  res.redirect("/posts");
});

app.get("/posts/:id/edit", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);
  res.render("edit.ejs", { post });
});

app.delete("/posts/:id", (req, res) => {
  let { id } = req.params;
  posts = posts.filter((p) => id !== p.id);
  res.redirect("/posts");
});

app.listen(port, () => {
  console.log("listening on port : 8080");
});
