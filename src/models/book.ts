import { DataTypes } from "sequelize";
import database from "./db.js";

const Book = database.define(
  "Book",
  {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    title: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 35],
      },
    },
    pages: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    rating: {
      type: DataTypes.FLOAT,
      validate: {
        min: 0,
        max: 10,
      },
    },
  },
  {
    schema: "public",
    // freezeTableName: true -> doesn't allow changing table name
    // timestamps: true -> if false, removes the createdAt and updatedAt
  }
);

// Schema: Public == just an option that i've passed to display this table in pg
// whitout it, i couldn't select it;

// Sequelize automatically pluralize the database name
// that's why it's saved as "Books" into PG;

export default Book;
