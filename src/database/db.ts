import { Sequelize } from "sequelize";
const sequelize = new Sequelize("bookshelf", "postgres", "9182", {
  host: "localhost",
  dialect: "postgres",
});

export default sequelize;
