//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _=require("lodash");


const aboutContent = "The best ideas can change who we are. Daily Journal is where those ideas take shape, take off, and spark powerful conversations. We’re an open platform where over 100 million readers come to find insightful and dynamic thinking. Here, expert and undiscovered voices alike dive into the heart of any topic and bring new ideas to the surface. Our purpose is to spread these ideas and deepen understanding of the world.";

let posts=[];
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/" , function(req,res){
  res.render("home" , {postContent: posts });
});

app.get("/contact", function(req,res){
  res.render("contact");
});

app.get("/about", function(req,res){
  res.render("about" , {about: aboutContent});
});

app.get("/compose",function(req,res){
  res.render("compose");
});

app.post("/compose",function(req,res){
   const post ={
     title: req.body.postTitle,
     content: req.body.postBody,
     writer: req.body.postWriter
   };
   posts.push(post);
   res.redirect("/");
});

app.get("/posts/:postName", function(req,res){
   const requestName=_.lowerCase(req.params.postName);
   posts.forEach(post =>{
     const storedTitle =_.lowerCase(post.title);
     if(storedTitle===requestName)
     res.render("post",{title: post.title ,content:post.content, postWriter:post.writer});
   });
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
