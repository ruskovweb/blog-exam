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


router.get("/", function(req, res) {
    
    res.render("home", { name: "Daniel Mitich" });
});


router.get("/posts/create", function(req, res) {
    
    res.render("create");
});
router.post("/posts/create", function(req, res) {
    const post = req.body
if (post.title == "" || post.description == "")
{
    res.render("error", {errorMessage:"Post title or description is not valid."});
return;
}

post.id  = counter
counter++
posts.push(post)
res.redirect("/posts");
});

/* 
    Read:
    GET     /posts/details/:id
*/
router.get("/posts/details", function(req, res) {
    
    res.render("/details");
});

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
