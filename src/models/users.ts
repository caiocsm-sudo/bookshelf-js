import { DataTypes } from "sequelize";
import database from "./db.js";
import bcrypt from "bcrypt";

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
      set(val: string) {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(val, salt);

        this.setDataValue("password", hash);
      }
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
