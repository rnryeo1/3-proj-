import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();
app.use(cors()); //{ credentials: true, origin: "http://localhost:3000" }
app.use(express.json());

const db = mysql.createConnection({
  multipleStatements: true,
  host: "localhost",
  user: "root",
  password: "0000",
  database: "test",
  dateStrings: "date",
});

app.get("/", (req, res) => {
  res.json("hello");
});

app.get("/books/:id", (req, res) => {
  const table_id = req.params.id;
  console.log("dd" + table_id);
  const q = " SELECT * FROM orderss WHERE table_no = ? ";

  db.query(q, [table_id], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
    console.log(data);
  });
});

app.get("/books", (req, res) => {
  const q = "SELECT * FROM orderss";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});
// con.query(`INSERT INTO orderss SET?`, data, (err, res, fields) => {
app.post("/books", async (req, resp) => {
  var data = req.body;
  const q = `INSERT INTO orderss VALUE?`;
  const qq =
    "INSERT INTO orderss (`order_id`, `product_name`, `options`, `table_no`,`quantity`, `order_date`, `order_time`, `date_time`,`price`, `totalprice`, `totalquantity`) VALUES ?";

  const values = [
    // req.body.order_id,
    // req.body.product_name,
    // req.body.options,
    // req.body.table_no,
    // req.body.quantity,
    // req.body.order_date,
    // req.body.order_time,
    // req.body.date_time,
    // req.body.price,
    // req.body.totalprice,
    // req.body.totalquantity,
    data,
  ];

  const jsArray = data;
  console.log(jsArray);
  jsArray.forEach((jsdata) =>
    db.query(
      //"INSERT INTO orderss (`order_id`, `product_name`, `options`, `table_no`,`quantity`, `order_date`, `order_time`, `date_time`,`price`, `totalprice`, `totalquantity`) VALUES (?)",
      `INSERT INTO orderss SET?`,
      [jsdata],
      (err, res) => {
        // console.log(jsdata.order_id + "T:");
        // console.log(jsdata.product_name + "T:");
        // console.log(jsdata.options + "T:");
        // console.log(jsdata.table_no + "T:");
        // console.log(jsdata.quantity + "T:");
        // console.log(jsdata.order_date + "T:");
        // console.log(jsdata.order_time + "T:");
        // console.log(jsdata.date_time + "T:");
        // console.log(jsdata.price + "T:");
        // console.log(jsdata.totalprice + "T:");
        // console.log(jsdata.totalquantity + "T:");

        if (err) throw err;
        console.log("counter record inserted");
      }
    )
  );

  // db.query(qq, [values], (err, res) => {
  //   if (err) throw err;
  //   resp.send(res);
  // });
  //console.log(quertext);
});

app.delete("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q = " DELETE FROM orderss WHERE id = ? ";

  db.query(q, [bookId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.put("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q =
    "UPDATE orderss SET `title`= ?, `desc`= ?, `price`= ?, `cover`= ? WHERE id = ?";

  const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover,
  ];

  db.query(q, [...values, bookId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.listen(8800, () => {
  console.log("Connected to backend.");
});
