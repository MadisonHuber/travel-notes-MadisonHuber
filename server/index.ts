import * as express from "express";
import * as exphbs from "express-handlebars";

let app = express();

app.use(express.static("dist/"));

app.get("/", (req, res) => {
    res.render("index", { title: "Notes" });
});

app.get("/gallery", (req, res) => {
    res.render("gallery", { title: "Photos" });
});

app.get("/list", (req, res) => {
    res.render("list", { title: "List" });
});

app.get("/stories", (req, res) => {
    res.render("stories", { title: "Stories"} );
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

const PORT = process.env.NODE_ENV === "production" ? 80 : 1234;
app.listen(PORT, () => console.log(`Listening on ${PORT}`))
    .on("error", (e) => console.error(e));