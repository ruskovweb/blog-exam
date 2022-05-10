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
    res.render("home", { name: "Danislav Chengeliev" });
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
    let post = req.body;

    if (post.title === undefined || post.title.length == 0 || post.description == undefined || post.description.length == 0) {
        res.render("error", { msg: "All input boxes are required to have valid data!" });
        return;
    }

    posts.push({ id: counter++, title: post.title, description: post.description });
    res.redirect("/posts");
});

/* 
    Read:
    GET     /posts/details/:id
*/
router.get("/posts/details/:id", function(req, res) {
    let post = posts.filter(e => e.id == req.params.id);

    if (post.length == 0) {
        res.render("error", { msg: `Post with id ${req.params.id} was not found!` });
        return;
    }

    res.render("details", post[0]);
});

/* 
    Update:
    GET     /posts/edit/:id
    POST    /posts/edit/:id
*/
router.get("/posts/edit/:id", function(req, res) {
    let post = posts.filter(e => e.id == req.params.id);

    if (post.length == 0) {
        res.render("error", { msg: `Post with id ${req.params.id} was not found!` });
        return;
    }

    res.render("edit", post[0]);
});

router.post("/posts/edit/:id", function(req, res) {
    let post = req.body;

    if (post.title === undefined || post.title.length == 0 || post.description == undefined || post.description.length == 0) {
        res.render("error", { msg: "All input boxes are required to have valid data!" });
        return;
    }

    let postId = posts.findIndex(e => e.id == req.params.id);

    if (postId == -1) {
        res.render("error", { msg: `Post with id ${req.params.id} was not found!` });
        return;
    }

    posts[postId].title = post.title;
    posts[postId].description = post.description;
    res.redirect("/posts");
});

/* 
    Delete:
    GET     /posts/delete/:id
    POST    /posts/delete/:id
*/
router.get("/posts/delete/:id", function(req, res) {
    let post = posts.filter(e => e.id == req.params.id);

    if (post.length == 0) {
        res.render("error", { msg: `Post with id ${req.params.id} was not found!` });
        return;
    }

    res.render("delete", post[0]);
});

router.post("/posts/delete/:id", function(req, res) {
    let postId = posts.findIndex(e => e.id == req.params.id);

    if (postId == -1) {
        res.render("error", { msg: `Post with id ${req.params.id} was not found!` });
        return;
    }

    posts.splice(postId, 1);
    res.redirect("/posts");
});

/* 
    List:
    GET     /posts
*/
router.get("/posts", function(req, res) {
    res.render("posts", { posts });
});

export default router;
