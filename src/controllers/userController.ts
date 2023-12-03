import { Request, Response } from "express";
import { randomUUID } from "crypto";

interface UserInterface {
  id: string;
  username: string;
  password: string;
  userEmail: string;
  bookshelf: Array<any>;
  favourites: Array<any>;
}

class User implements UserInterface {
  id: string;
  username: string;
  password: string;
  userEmail: string;
  bookshelf: any[];
  favourites: any[];
  constructor(username: string, userEmail: string, password: string) {
    this.id = randomUUID();
    this.username = username;
    this.userEmail = userEmail;
    this.password = password;
    this.bookshelf = [];
    this.favourites = [];
  }

  register() {

  }

  login() {

  }
}
