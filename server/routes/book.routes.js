const express = require("express");
const {
  handleBookStoreController,
  handleBookListController,
  handleBookDeleteController,
  handleBookUpdateController,
  handleSearchBookController,
} = require("../controller/book.controller");

const router = express.Router();

// http://localhost:3000/book/addbook    {Create from input box}
router.post("/addbook", handleBookStoreController);

// http://localhost:3000/book/booklists   {find and show in a booklist}
router.get("/booklists", handleBookListController);

// http://localhost:3000/book/deletebook   {delete from the book list}
router.post("/deletebook", handleBookDeleteController);

// http://localhost:3000/book/updatebook    {make updation og the book list}
router.put("/updatebook", handleBookUpdateController);

//
router.get("/searchbook", handleSearchBookController);

module.exports = router;
