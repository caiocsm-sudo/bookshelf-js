import express from "express";
import {syncToDB} from "./models/db.js";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import router from "./router.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = process.env.PORT || 4000;

syncToDB();

app.set("views", path.join(__dirname, "../", "public"));
app.set("view engine", "pug");

app.use(express.static(path.join(__dirname, "../", "public")));
app.use(express.json());

app.use(router);

app.listen(port, () => console.log("http://localhost:" + port));
