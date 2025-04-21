const mongoose=require('mongoose');

const bookSchema=new mongoose.Schema({
    title:{type:String,required:true},
    author:{type:String,required:true},
    year:{type:String,required:true},
    imageUrl:{type:String,required:true},
});

const book=mongoose.model("book",bookSchema);

module.exports=book;