import express from "express";
import { engine } from 'express-handlebars';
import routes from "./routes.js";

const PORT = 8080;
const app = express();

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

app.listen(PORT, function() {
    console.log(`The server is listening on port ${PORT}`);
});
