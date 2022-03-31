var express = require('express');
var Article = require("../models/Article")
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
    console.log(article)
    res.render("singleArticle",{article:article})
  })
});

router.post("/",(req,res,next)=>{
  Article.create(req.body,(err,articles)=>{
    if(err) return next(err)
    console.log(articles)
    res.redirect("/articles/")
  })
})

router.get('/:id/edit',(req, res, next)=>{
  let id = req.params.id;
  Article.findById(id,(err,article)=>{
    if(err) return next(err)
    console.log(article)
    res.render("updateArticle",{article:article})
  })
});
router.post("/:id/update",(req,res,next)=>{
  let id = req.params.id;
  Article.findByIdAndUpdate(id,req.body,(err,article)=>{
    if(err) return next(err)
    res.redirect("/articles/"+id)
  })
})

router.get("/:id/delete",(req,res,next)=>{
  let id = req.params.id;
  Article.findByIdAndDelete(id,(err,article)=>{
    console.log(article)
    if(err) return next(err)
    res.redirect("/articles")
  })
})

router.get("/:id/likes",(req,res,next)=>{
  let id = req.params.id;
  Article.findByIdAndUpdate(id,{likes:{$inc : 1}},(err,article)=>{
    console.log(article)
    if(err) return next(err)
    res.redirect("/articles/"+id)
  })
})


module.exports = router;
