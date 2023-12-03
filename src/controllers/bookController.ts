import { Request, Response } from "express";
import { Model, Op } from "sequelize";
import Book from "../models/book.js";
import { randomUUID } from "crypto";
import sequelize from "../models/db.js";
// import db from "../database/db.js";

type BookPostData = {
  id: string;
  title: string;
  author: string;
  pages: number;
};

const bookController = {
  getAllBooks: async (req: Request, res: Response) => {
    try {
      // const order = { order: [["pages", "DESC"]] };

      // or, lt, gt, eq: the same functions found in mongoose is here too, in sequelize.
      // databases are not so different at all.

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

        // by default, id comes empty from req.body
        booksData = booksData.map((el) => {
          return { ...el, id: randomUUID() };
        });

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
      // i need to destructure and filter the object
      // to get only the properties that have info

      const updateBook = await Book.update(
        { ...req.body },
        { where: { id: req.params.id } }
      );

      if (updateBook[0] === 0) throw new Error("Your book could not be found");

      res.status(201).json({
        status: "success",
        editedObject: updateBook,
      });
    } catch (e) {
      console.log(e);

      res.json({
        status: "fail",
        message: `An error occurred: ${e}`,
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
  bookLengthAverage: async (req: Request, res: Response) => {
    try {
      let lengthAverage: any = await Book.findAll({
        attributes: [
          [sequelize.fn("AVG", sequelize.col("pages")), "pagesAverage"],
        ],
      });

      lengthAverage = Number(lengthAverage[0].dataValues.pagesAverage).toFixed();

      res.status(200).json({
        status: "success",
        average: lengthAverage,
      });
    } catch (e) {
      res.json({
        status: "fail",
        message: e,
      });
    }
  },
  booksHowMany: async (req: Request, res: Response) => {
    try {
      const books = await Book.findAll();

      res.json({
        status: "success",
        data: books.length,
      });
    } catch (e) {
      res.json({
        status: "fail",
        message: `Ops... ${e}`,
      });
    }
  },
};

export default bookController;
