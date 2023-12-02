import { Request, Response } from "express";
import { randomUUID } from "crypto";

type User = {
  id: string;
  username: string;
  passowrd: string;
  userEmail: string;
  bookshelf: Array<any>;
  favourites: Array<any>;
};
