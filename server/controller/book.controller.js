const { Book } = require("../model/book.model");

const handleBookStoreController = async (req, res) => {
  try {
    const body = req.body;

    if (
      !body.BookName ||
      !body.BookTitle ||
      !body.AuthorName ||
      !body.SellingPrice
    ) {
      return res
        .status(400)
        .json({ Message: "All field is required", Success: false });
    }

    const bookAdd = await Book.insertOne(body);

    console.log(bookAdd);

    if (bookAdd) {
      return res.status(201).json({
        Message: "Data created successfully",
        Success: true,
        Id: bookAdd?._id,
      });
    }
  } catch (error) {
    return res.status(500).json({ Message: error.message, Success: false });
  }
};

const handleBookListController = async (req, res) => {
  try {
    const bookList = await Book.find({});
    return res.status(200).json({
      Message: "All data fetched successfully",
      Success: true,
      TotalCount: bookList.length,
      BookList: bookList,
    });
  } catch (error) {
    return res.status(400).json({ Message: error.message, Success: false });
  }
};

const handleBookDeleteController = async (req, res) => {
  const body = req.body;
  try {
    const deleted = await Book.deleteOne({ _id: body.id });
    if (deleted.acknowledged) {
      return res.status(200).json({
        Message: "Book deleted successfully",
        Success: true,
      });
    }
  } catch (error) {
    return res.status(400).json({ Message: error.message, Success: false });
  }
};

const handleBookUpdateController = async (req, res) => {
  try {
    const body = req.body;
    const updating = await Book.updateOne({ _id: body?.Id }, { $set: body });

    if (updating.acknowledged) {
      return res.json({
        Message: "Book updated successfully !",
        Success: true,
      });
    }
  } catch (error) {
    res.status(400).json({ Message: error.message, Success: false });
  }
};

const handleSearchBookController = async (req, res) => {
  try {
    const { query } = req.query;
    const books = await Book.find({
      $or: [
        { BookName: { $regex: new RegExp(query, "i") } },
        { BookTitle: { $regex: new RegExp(query, "i") } },
        { AuthorName: { $regex: new RegExp(query, "i") } },
      ],
    });
    res.json({ Success: true, BookList: books });
    console.log(BookList);
  } catch (error) {
    res.status(400).json({ Success: false, Message: error.message });
  }
};

module.exports = {
  handleBookStoreController,
  handleBookListController,
  handleBookDeleteController,
  handleBookUpdateController,
  handleSearchBookController,
};
