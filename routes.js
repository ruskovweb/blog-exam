import { Router } from "express";

const router = Router();

let counter = 2;
let posts = [
    {
        id: 1,
        title: "This is my first blog post",
        description: "Hello and Welcome to my first blog post!"
    }
];

/*
    Home page:
    GET     /
*/
router.get("/", function(req, res) {
    // Replace the 'name' property with your first and last name.
    res.render("home", { name: "Dimitar Ruskov" });
});

/* 
    Create:
    GET     /posts/create
    POST    /posts/create
*/
router.get("/posts/create", function(req, res) {
    res.render("create");
    
});
router.post("/posts/create", function(req, res) {
    const post = req.body;
    if(post.title == '' || post.description == '')
    {
        
        return
    }
    post.id =counter;

    counter ++;
    posts.push(post)
    res.redirect("/posts");
});

/* 
    Read:
    GET     /posts/details/:id
*/
router.get("/posts/details/:id", function(req, res) {
    res.render("details");
});

/* 
    Update:
    GET     /posts/edit/:id
    POST    /posts/edit/:id
*/
router.get("/posts/edit/:id", function(req, res) {
    res.render("edit");
});
router.post("/posts/edit/:id", function(req, res) {
    res.render("posts", { posts });
});
/* 

    Delete:
    GET     /posts/delete/:id
    POST    /posts/delete/:id
*/
router.get("/posts/delete/:id", function(req, res) {
    res.render("delete");
});
router.post("/posts/delete/:id", function(req, res) {
    res.render("posts", { posts });
});
/* 
    List:
    GET     /posts
*/
router.get("/posts", function(req, res) {
    res.render("posts", { posts });
});

export default router;
