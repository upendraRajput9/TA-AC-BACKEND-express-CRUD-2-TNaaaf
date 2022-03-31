var express = require('express');
var Article = require("../models/articleSchema")
var router = express.Router();

/* GET users listing. */
router.get('/',(req, res, next)=>{
  Article.find({},(err,articles)=>{
    if(err) return next(err)
    console.log(articles)
    res.render("articles",{articles:articles})
  })
});

router.get('/:id',(req, res, next)=>{
  let id = req.params.id;
  Article.findById(id,(err,article)=>{
    if(err) return next(err)
    console.log(articles)
    res.render("singleArticle",{article:article})
  })
});

router.get("/new", (req, res)=>{
  res.render("articleForm")
});

router.post("/",(req,res)=>{
  Article.create(req.body,(err,articles)=>{
    if(err) return next(err)
    res.redirect("/articles")
  })
})

module.exports = router;
