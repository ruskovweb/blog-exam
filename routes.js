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
    res.render("home", { name: "Stefan Stoyanov" });
});

/* 
    Create:
    GET     /posts/create
    POST    /posts/create
*/
router.get("/posts/create", function(req, res) {
    res.render("create");
});
router.post("/posts/create", function (req, res) {
    const post = req.body;
    if(post.title == "" || post.description == ""){
        res.render("error", {errorMessage:"Post title or description is not valid."});

        return;
    }

    post.id = counter++;
    
    posts.push(post);
    res.redirect("/posts");
    
});
/* 
    Read:
    GET     /posts/details/:id
*/
router.get("/posts/details/:id", function(req, res) {
    const id = Number(req.params.id);

    const post = posts.find(e => e.id == id);
    if(post == undefined){
        return res.render("error", {errorMessage:`Post with ID '${id}' was not found.`});
    }
    res.render("details", {post});

});
/* 
    Update:
    GET     /posts/edit/:id
    POST    /posts/edit/:id
*/
router.get("/posts/edit/:id", function(req, res) {
    const id = Number(req.params.id);
    const post = posts.find(e => e.id == id);
    if(post == undefined){
        return res.render("error", {errorMessage:`Post with ID '${id}' was not found.`});
    }
    res.render("edit", {post});
});
router.post("/posts/edit/:id", function (req, res) {
    const newPost = req.body;
    if(newPost.title == "" || newPost.description == ""){
        res.render("error", {errorMessage:"Post title or description is not valid."});

        return;
    }

    const id = Number(req.params.id);

    const post = posts.find(e => e.id == id);
    if(post == undefined){
        return res.render("error", {errorMessage:`Post with ID '${id}' was not found.`});
    }

    post.title = newPost.title;
    post.description = newPost.description;
    res.redirect("/posts");

});
/* 
    Delete:
    GET     /posts/delete/:id
    POST    /posts/delete/:id
    
*/
router.get("/posts/delete/:id", function (req, res) {
    const id = Number(req.params.id);

    const post = posts.find(e => e.id == id);
    if(post == undefined){
        return res.render("error", {errorMessage:`Post with ID '${id}' was not found.`});
    }
    res.render("delete", {post});
});
router.post("/posts/delete/:id",function (req, res) {
    const id = Number(req.params.id);

    const post = posts.find(e => e.id == id);
    if(post == undefined){
        return res.render("error", {errorMessage:`Post with ID '${id}' was not found.`});
    }
    posts = posts.filter(e => e.id != id)
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
