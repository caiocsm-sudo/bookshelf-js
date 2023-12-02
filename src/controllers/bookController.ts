import { Request, Response } from "express";
import Book from "../models/book.js";
import { randomUUID } from "crypto";
// import db from "../database/db.js";

type BookPostData = {
  id: string;
  title: string;
  author: string;
  pages: number;
};

const bookControllers = {
  getAllBooks: async (req: Request, res: Response) => {
    try {
      // later it will recieve filters, limiting, sorting, pagination;
      const allBooks = await Book.findAll();

      res.json({
        status: "success",
        data: allBooks,
      });
    } catch (e) {
      res.json({
        status: "fail",
        message: `Error: ${e}`,
      });
    }
  },

  postBook: async (req: Request, res: Response) => {
    try {
      if (req.body instanceof Array) {
        let booksData: Array<BookPostData> = [...req.body];

        booksData = booksData.map((el) => {
          return { ...el, id: randomUUID() };
        });

        console.log(booksData);

        const newBooks = await Book.bulkCreate(booksData);

        res.json({
          status: "success",
          data: newBooks,
        });
      } else {
        let bookData: BookPostData = {
          id: randomUUID(),
          title: req.body.title,
          author: req.body.author,
          pages: req.body.pages,
        };
        // create = both build() & save();
        const newBook = await Book.create(bookData);
        res.json({ status: "success", data: newBook.toJSON() });
      }
    } catch (e) {
      res.json({
        status: "fail",
        message: `${e}`,
      });
    }
  },
  getBookById: async (req: Request, res: Response) => {
    try {
    } catch (e) {
      res.json({
        status: "fail",
        message: e,
      });
    }
  },
  updateBook: async (req: Request, res: Response) => {
    try {
    } catch (e) {
      res.json({
        status: "fail",
        message: e,
      });
    }
  },
  deleteBook: async (req: Request, res: Response) => {
    try {
      const book = await Book.findAll({
        where: {
          id: req.params.id,
        },
      });

      if (!book[0]) throw Error("No such book");

      const deletedBook = await Book.destroy();

      res.status(204).json({
        status: "success",
        data: deletedBook,
      });
    } catch (e) {
      res.json({
        status: "fail",
        message: e,
      });
    }
  },
};

export default bookControllers;
