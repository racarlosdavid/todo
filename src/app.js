const express = require("express");
const app = express();
const methodOverride = require('method-override');

//const content = require("./content/tasks.json");
let content = [];
let lastId = 0;

// Middlewares
//app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'));

// Templating engine setup
app.set("view engine", "ejs");
app.set('views', __dirname + '/views');

// Enpoints

app.get("/", (req, res) => {
  res.status(200).render("index", { content });
});

app.get("/tasks",(req,res) =>{
  res.status(200).render("index", { content });
})

app.post("/tasks",(req,res) =>{
  lastId++;
  const {task} = req.body;
  const new_task = { id:lastId, status:'todo', task}
  content.push(new_task)
  res.status(200).redirect('/')
})

app.put("/tasks/:id",(req,res) =>{
  const id = parseInt(req.params.id,10);
  const task = content.find(p => p.id == id);
  console.log(req.body)
  if (!task) {
    res.status(404).redirect('/')
      //res.status(404).json({mensaje: "No existe ninguna task con id "+ id})
  }else{
      const index = content.indexOf(task);
      content[index] = {...task,...req.body};
      res.status(200).redirect('/')
  }
})

app.delete("/tasks/:id",(req,res) =>{ console.log(req.params)
  const id = parseInt(req.params.id,10);
  const task = content.find(p => p.id == id);

  if (!task) {
      //res.status(404).json({mensaje: "No existe ninguna task con id "+ id})
      res.status(404).redirect('/')
  }else{
      content = content.filter(x => x != task)
      res.status(200).redirect('/')
      //res.status(200).json({mensaje: "Task deleted"});
  }
})

// Starting server
app.listen(2000, () => {
  console.log("Listening on port 2000...");
});
