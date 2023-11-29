import { Router, Request, Response } from "express";
const router = Router();

router.route("/").get((req: Request, res: Response) => {
  res.render("index");
});

router.route("/api/vadias").get((req: Request, res: Response) => {
  res.json([
    {
      name: "Bianca",
      description: "Senta",
    },
    {
      name: "Julia",
      description: "Da",
    },
    {
      name: "Valeria",
      description: "Chupa",
    },
    {
      name: "Fabiola",
      description: "Mama",
    },
  ]);
});

export default router;
