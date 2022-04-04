var express = require('express');
var Book = require('../models/Book');
var Author = require('../models/Author');
var router = express.Router();

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.get('/new', (req,res,next)=>{
  res.render('bookForm')
})
router.get('/',(req,res)=>{
  Book.find({},(err,books)=>{
    if(err) return next(err);
    res.render("books",{list:books})
  })
});

router.post('/',(req,res)=>{
  Book.create(req.body,(err,book)=>{
    console.log("hello")
    if(err) return res.redirect('/new');
    res.render("authorForm",{book})
  })
})

router.post("/:id/author",(req,res,next)=>{
  let id = req.params.id;
  Author.create(req.body,(err,author)=>{
    if(err) return next(err);
    Book.findByIdAndUpdate(id,{$set:{author:author}},(err,book)=>{
      if(err) return next(err);
      res.redirect("/books/");
    });
  })
})

module.exports = router;
