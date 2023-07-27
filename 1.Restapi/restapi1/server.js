const express = require("express");

const server = express();
const bodyParser = require("body-parser");

server.use(bodyParser.json());
const mysql = require("mysql");

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "0000",
  database: "new_schema",
});

// con.connect(function (err) {
//   if (err) throw err;
//   console.log("connected");
//   const sql = "select * from `order`";
//   con.query(sql, function (err, res, fields) {
//     if (err) throw err;
//     console.log(res);
//   });
// });

// server.get("/api/user",(req,res) =>{
//     res.json(users);
// });

// server.get('/api/user/:id',(req,res)=>{
//     const user = users.find((u)=>{
//         return u.id == req.params.id;
//     });
//     if(user){
//         res.json(user);
//     }else{
//         res.status(404).json({errorMessage: 'User was not found'});
//     }
// });

//localhost:3000/addInfo  POST 구현.
server.post("/addInfo", (req, resp) => {
  var data = req.body;

  http: con.query(`INSERT INTO orderss SET?`, data, (err, res, fields) => {
    if (err) throw err;
    resp.send(res);
  });
});

server.get("/", (req, res) => {
  res.send(`fist page`);
});

server.put("/api/user/:id", (req, res) => {
  //update
  let foundIndex = users.findIndex((u) => u.id == req.params.id);
  if (foundIndex == -1) {
    res.status(404).json({ errorMessage: "user was not found" });
  } else {
    users[foundIndex] = { ...users[foundIndex], ...req.body }; // ... 값들.
    res.json(users[foundIndex]);
  }
});

server.delete("/api/user/:id", (req, res) => {
  //delete
  let foundIndex = users.findIndex((u) => u.id == req.params.id);
  if (foundIndex == -1) {
    res.status(404).json({ errorMessage: "User was not found" });
  } else {
    let foundUser = users.splice(foundIndex, 1); //지움
    res.json(foundUser[0]);
  }
});

server.listen(3000, () => {
  console.log("the server is running");
});
