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

app.use(express.static("public"));

app.get("/tasks", function(req, res) {
    res.render("tasks");
});

app.get("/assessment", function(req, res) {
    const tasks = [
        { id: 1, task: "Визуализиране на всички публикации", points: 20 },
        { id: 2, task: "Визуализиране на страница за създаване на публикация", points: 15 },
        { id: 3, task: "Създаване на публикация", points: 19 },
        { id: 4, task: "Визуализиране на страница за детайлите на една публикация", points: 11 },
        { id: 5, task: "Визуализиране на страница за редактиране на публикация", points: 17 },
        { id: 6, task: "Редактиране на публикация", points: 23 },
        { id: 7, task: "Визуализиране на страница за изтриване на публикация", points: 13 },
        { id: 8, task: "Изтриване на публикация", points: 14 },
    ];

    const totalPoints = tasks.reduce((acc, value) => acc + value.points, 0);

    const marks = [
        { points: " 0 - 20", mark: 2 },
        { points: "21 - 40", mark: 3 },
        { points: "41 - 60", mark: 4 },
        { points: "61 - 80", mark: 5 },
        { points: "81 - 100", mark: 6 },
        { points: "101 - 132", mark: "6+" },
    ];

    res.render("assessment", { tasks, marks, totalPoints });
});

app.listen(PORT, function() {
    console.log(`The server is listening on port ${PORT}`);
});
