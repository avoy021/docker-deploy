const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title : {
        type : String,
        required : [true, 'Please enter the title'],
        unique: true
    },
    content : {
        type : String,
        required : [true, 'Please enter the content']
    }
})

const Blog = mongoose.model('Blog',blogSchema);

module.exports = Blog;