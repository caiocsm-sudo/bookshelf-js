import { DataTypes } from "sequelize";
import database from "./db.js";

// Postgres is not case sensitive, but mysql is (in linux);
// Primary Key = It's unique and the one who's going to identify the table
// (Which in this case, is the user)

const User = database.define(
  "User",
  {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    usename: {
      type: DataTypes.STRING(30),
      allowNull: false,
      validate: {
        len: [3, 25],
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userEmail: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    bookshelf: {
      type: DataTypes.ARRAY,
    },
    favourites: {
      type: DataTypes.ARRAY,
    },
  },
  {
    schema: "public",
  }
);
