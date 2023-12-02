import { Sequelize } from "sequelize";
const sequelize = new Sequelize("bookshelf", "postgres", "9182", {
  host: "localhost",
  port: 5432,
  dialect: "postgres",
});

export const syncToDB = async () => {
  Promise.all([sequelize.sync({ alter: true }), sequelize.authenticate()])
    .then(() => {
      console.log("Synced and authenticated successfully");
    })
    .catch((e) => {
      console.error(`An error occured: ${e}`);
    });
};

export default sequelize;
