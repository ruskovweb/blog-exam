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
    res.render("home", { name: "Miroslav Dyakov" });
});

/* 
    Create:
    GET     /posts/create
    POST    /posts/create
*/
router.post("/posts/create", (req, res) => {
    const post = req.body;

    if(post.title == "" || post.description == ""){
        res.render("error", {errorMessage: "Post title or description is not valid."})
        return;
    }
    post.id = counter++;

    posts.push(post);
    res.redirect("/posts");
})


/* 
    Read:
    GET     /posts/details/:id
*/
router.get("/posts/details/:id", (req, res) => {
    const id = Number(req.params.id);
    const post = posts.find(e => e.id == id);
    if(post == undefined){
        res.render("error", {errorMessage: `Post with ID '${id}' was not found.` });
        return;
    }
    res.render("details", { post });
    
})
/* 
    Update:
    GET     /posts/edit/:id
    POST    /posts/edit/:id
*/
router.get("/posts/edit/:id", function(req, res) {
    res.render("edit", { posts });
});
/* 
    Delete:
    GET     /posts/delete/:id
    POST    /posts/delete/:id
*/
router.delete("/posts/delete/:id", function(req, res) {
    const id = Number(req.params.id)
    
    const post = posts.find(e => e.id == id);
    if(post == undefined) {
        res.sendStatus(404);
        return;

    }
    
    posts = posts.filter(e => e.id !== id);
    
    res.render("posts", { posts });
});

/* 
    List:
    GET     /posts
*/
router.get("/posts", function(req, res)  {

    res.render("posts", { posts });
});

export default router;
