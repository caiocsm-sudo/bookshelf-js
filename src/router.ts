import { Router, Request, Response } from "express";
import bookControllers from "./controllers/bookController.js";

const router = Router();

router.route("/").get((req: Request, res: Response) => {
  res.render("index");
});

router
  .route("/api/books")
  .get(bookControllers.getAllBooks)
  .post(bookControllers.postBook);

export default router;
