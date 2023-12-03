import { Router, Request, Response } from "express";
import bookController from "./controllers/bookController.js";
// import userController

const router = Router();

router.route("/").get((req: Request, res: Response) => {
  res.render("index");
});

router
  .route("/api/books")
  .get(bookController.getAllBooks)
  .post(bookController.postBook);

router
  .route("/api/books/:id")
  .patch(bookController.updateBook)
  .delete(bookController.deleteBook);

router
  .route("/api/books/length-average")
  .get(bookController.bookLengthAverage);

router
  .route("/api/books/how-many")
  .get(bookController.booksHowMany);

router
  .route("/api/books/author-how-many")
  .get(bookController.authorHowMany);

router.route("/api/users").get().post();

export default router;
