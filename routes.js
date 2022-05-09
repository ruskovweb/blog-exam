import { Router } from "express";

const router = Router();

let posts   = [];
let counter = 1;

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
    GET     /posts/:id
*/

/* 
    Update:
    GET     /posts/edit/:id
    PATCH   /posts/edit/:id
*/

/* 
    Delete:
    GET     /posts/delete/:id
    DELETE  /posts/delete/:id
*/

/* 
    List:
    GET     /posts
*/
router.get("/posts", function(req, res) {
    res.render("posts");
});

export default router;
