import * as dotenv from "dotenv";
dotenv.config();

import { DB, Rows } from "./db";

import * as express from "express";
import * as exphbs from "express-handlebars";
import moment = require("moment");

let app = express();

app.use(express.static("dist/"));

app.get("/", (req, res) => {
    res.render("index", { title: "Notes" });
});

app.get("/todos.json", async (req, res) => {
    let [rows, fields] = await DB.query<Rows>("SELECT * FROM todos");
    res.json(rows);
});

app.get("/todos", async (req, res) => {
    let [rows] = await DB.query<Rows>("SELECT * FROM todos");
    res.render("todos-demo", {todos: rows});

});

app.get("/todos/eat", async (req, res) => {
    let sql = "INSERT INTO `blog`.`todos` (`description`, `url`) VALUES (:description, :url);";
    await DB.execute(
        sql,
        { description: "EAT!!!", url: "http://food.com" }
    );
    res.redirect("/todos");
});

app.get("/todos/:id", async (req, res) => {
    let [rows] = await DB.query("SELECT * FROM todos WHERE id = :id", {id: req.params.id});
    res.json(rows);
});

app.get("/gallery", (req, res) => {
    res.render("gallery", { title: "Photos" });
});

app.get("/list", (req, res) => {
    res.render("list", { title: "List" });
});

app.get("/stories", async (req, res) => {
    let [rows] = await DB.query<Rows>("SELECT * FROM posts ORDER BY publishAt DESC");
    rows.map((row) => {
        row["publishAt"] = moment(row["publishAt"]).format("dddd, MMMM Do YYYY");
    });
    res.render("stories", {posts: rows});
});

app.get("/about", (req, res) => {
    res.render("about", { title: "About" });
});

app.set("view engine", "hbs");
app.set("views", "server/views");
app.engine("hbs", exphbs({
    defaultLayout: "default",
    extname: "hbs",
}));

export let main = async () => {
    app.listen(process.env.PORT, () => console.log(`Listening on ${process.env.PORT}`))
        .on("error", (e) => console.error(e));
};

main();