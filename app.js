import express from "express";
import { engine } from 'express-handlebars';

const PORT = 8080;
const app = express();

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(express.json());
app.use(express.urlencoded());

app.use(routes);

app.listen(PORT, function(req, res) {
    console.log(`The server is listening on port ${PORT}`);
});
