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
    res.render("home", { name: "Ilker Nevzatov" });
});


router.get("/posts/create", function(req, res){
    res.render("create")
})
//Create
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
    Create:
    GET     /posts/create
    POST    /posts/create
*/
//Details
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
    Read:
    GET     /posts/details/:id
*/
//Edit
router.get("/posts/edit/:id", (req, res) =>{
    const id = Number(req.params.id);
    const post = posts.find(e => e.id == id);
    if(post == undefined){
        res.render("error", {errorMessage: `Post with ID '${id}' was not found.`});
        return;
    }
    res.render("edit", {post});
})

router.post("/posts/edit/:id", (req, res) => {
    const id = Number(req.params.id);
    const oldpost = posts.find(e => e.id == id);
    if(oldpost === undefined){
        res.render("error", {errorMessage: `Post with ID '${id}' was not found.` });
        return;
    }
    const newpost = req.body;

    if(newpost.title == "" || newpost.description == ""){
        res.render("error", {errorMessage: "Post title or description is not valid."})
        return;
    }

    oldpost.title = newpost.title;
    oldpost.description = newpost.description;
    res.redirect("/posts");
})
/* 
    Update:
    GET     /posts/edit/:id
    POST    /posts/edit/:id
*/
//Delete
router.get("/posts/delete/:id", (req, res) => {
    const id = Number(req.params.id);
    const post = posts.find(e => e.id == id);
    if(post == undefined){
        res.render("error", {errorMessage: `Post with ID '${id}' was not found.` });
        return;
    }
    res.render("delete", { post });
})
router.post("/posts/delete/:id", (req, res) => {
    const id = Number(req.params.id);
    const post = posts.find(e => e.id == id);
    if(post == undefined){
        res.render("error", {errorMessage: `Post with ID '${id}' was not found.` });
        return;
    }
    posts = posts.filter(e => e.id != id);
    res.redirect("/posts");
})
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
