const express = require("express");
const databaseConnection = require("./database");
const bookRouter = require("./routes/book.routes");
const cors = require("cors");

//Database connection
databaseConnection();

const app = express();
const port = 3000;

app.use(express.json()); //Middleware
app.use(cors()); //allow frontend to print the data

app.get("/", (req, res) => {
  res.send("hello world");
});
// http://localhost:3000/book
app.use("/book", bookRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
