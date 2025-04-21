const express = require('express');
const multer = require('multer');
const router = express.Router();
const book = require('../models/books');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images');
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

router.post('/add', upload.single('imageUrl'), async (req, res) => {
    try {
        const { title, author, year } = req.body;
        await book.create({
            title,
            author,
            year,
            imageUrl: `/images/${req.file.filename}`,
        });
        return res.redirect('/');
    }
    catch (err) {
        console.log(err);
    }
});

router.get('/addBookPage', (req, res) => {
    try {
        return res.render('addBook.ejs');
    }
    catch (err) {
        console.log(err);
    }
});

router.get('/delBook/:id',async(req,res)=>{
    try{
        await book.findByIdAndDelete(req.params.id);
        return res.redirect('/');
    }
    catch(err){
        console.log(err);
    }
});


router.get('/updateBookPage/:id',async(req,res)=>{
  try{
    const Book=await book.findById(req.params.id);
     return res.render('updatePage.ejs',{Book:Book});
  }
  catch(err){
    console.log(err);
  }
});

router.post('/updateBook/:id',async(req,res)=>{
    try{
        await book.findByIdAndUpdate(req.params.id,{
            title:req.body.title,
            author:req.body.author,
            year:req.body.year
        });
        return res.redirect('/');

    }
    catch(err){
        console.log(err);
    }
});





module.exports = router;