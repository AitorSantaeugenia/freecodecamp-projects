/*
*
*
*       Complete the API routing below
*       
*       
*/
"use strict";
const Book = require("../models").Book;

module.exports = function (app) {
  app
    .route("/api/books")
    .get(async function (req, res) {
      try {
        const data = await Book.find({});
        const formatData = data.map((book) => ({
          _id: book._id,
          title: book.title,
          commentcount: book.comments.length,
        }));
        res.json(formatData);
      } catch (err) {
        res.json([]);
      }
    })

    .post(async function (req, res) {
      let title = req.body.title;
      if (!title) {
        return res.send("missing required field title");
      }
      try {
        const newBook = new Book({ title, comments: [] });
        const data = await newBook.save();
        res.json({ _id: data._id, title: data.title });
      } catch (err) {
        res.send("there was an error saving");
      }
    })

    .delete(async function (req, res) {
      try {
        await Book.deleteMany({});
        res.send("complete delete successful");
      } catch (err) {
        res.send("error");
      }
    });

  app
    .route("/api/books/:id")
    .get(async function (req, res) {
      let bookid = req.params.id;
      try {
        const data = await Book.findById(bookid);
        if (!data) {
          return res.send("no book exists");
        }
        res.json({
          comments: data.comments,
          _id: data._id,
          title: data.title,
        });
      } catch (err) {
        res.send("no book exists");
      }
    })

    .post(async function (req, res) {
      let bookid = req.params.id;
      let comment = req.body.comment;
      if (!comment) {
        return res.send("missing required field comment");
      }
      try {
        const bookdata = await Book.findById(bookid);
        if (!bookdata) {
          return res.send("no book exists");
        }
        bookdata.comments.push(comment);
        const saveData = await bookdata.save();
        res.json({
          comments: saveData.comments,
          _id: saveData._id,
          title: saveData.title,
        });
      } catch (err) {
        res.send("no book exists");
      }
    })

    .delete(async function (req, res) {
      let bookid = req.params.id;
      try {
        const data = await Book.findByIdAndDelete(bookid);
        if (!data) {
          return res.send("no book exists");
        }
        res.send("delete successful");
      } catch (err) {
        res.send("no book exists");
      }
    });
};