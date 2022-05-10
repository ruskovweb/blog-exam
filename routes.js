import { Router } from "express";

const router = Router();

let counter = 2;
let posts = [
    {
        id: 1,
        title: "This is my first blog post",
        description: "Hello to my first blog post!"
    }
];

/*
    Home page:
    GET     /
*/
router.get("/", function(req, res) {
    res.render("home", { name: "Dimitar Ruskov" });
});

/* 
    Create:
    GET     /posts/create
    POST    /posts/create
*/

/* 
    Read:
    GET     /posts/details/:id
*/

/* 
    Update:
    GET     /posts/edit/:id
    POST    /posts/edit/:id
*/

/* 
    Delete:
    GET     /posts/delete/:id
    POST    /posts/delete/:id
*/

/* 
    List:
    GET     /posts
*/
router.get("/posts", function(req, res) {
    res.render("posts", { posts });
});

export default router;
