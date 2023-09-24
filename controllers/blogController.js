const Blog = require('../models/blogModel')

const createPost = async(req,res) => {
    try {
        const post = await Blog.create(req.body);
        if(post) {
            return res.json(post);
        }
    } catch (error) {
        return res.json({message:'Post unsuccessful'})
    }
}
const getPost = async(req,res) => {
    try {
        const id = req.params.id;
        const post = await Blog.findOne({id});
        if(post) {
            return res.json(post);
        }
    } catch (error) {
        return res.json({message:'Post with the given id not present'})
    }
}
const getAllPost = async(req,res) => {
    try {
        const post = await Blog.find();
        if(post) {
            return res.json(post);
        }
    } catch (error) {
        return res.json({message:'Post not present'})
    }
}
const deletePost = async(req,res) => {
    try {
        const user = await Blog.findByIdAndDelete(req.params.id);
        return res.json({message:'Post deleted',user});
    } catch (error) {
        return res.json({message:'Post not present'})
    }
}

module.exports = {
    createPost,
    getPost,
    getAllPost,
    deletePost
}