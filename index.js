const express=require('express');
const app=express();
const port=3012;
const mongoose=require('mongoose');
const book=require('./models/books');

//dbConnection
async function db(url){
    try{
       await mongoose.connect(url);
       console.log(`connected to MongoDB`);
    }
    catch(err){
        console.log(err);
    }
}
db("mongodb+srv://guddu36999:9XOSQlqzV9FGuVBx@cluster0.nefajhc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));

//routes
const bookRoutes=require('./routes/book');
app.use('/book',bookRoutes);



app.get('/',async(req,res)=>{
    const allBooks=await book.find({});
    return res.render('home.ejs',{Books:allBooks});
    
});



app.listen(port,(err)=>{
    if(err)console.log(err);
    else console.log(`server is running on port:${port}.`);
})