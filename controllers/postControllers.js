import Post from "../models/Post.js";
import mongoose, { mongo } from "mongoose";

export const getAllPosts = async(req, res)=>{
    try {
        const posts = await Post.find({ }).sort({createdAt: -1})
        res.status(200).json(posts)
    } catch (error) {
        res.status(404).json({error:error.message})
    }
};
export const getPost = async(req, res)=>{
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({error: 'post does not exist'})
    try {
        const post = await Post.findById(id)
        if(!post)return res.status(404).json({error: 'post does not exist'})
        res.status(200).json(post)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
};
export const createPosts = async(req, res)=>{
    const {date, title, content} =req.body
    try {
        const post = await Post.create({date, title, content});
        res.status(200).json(post);
    } catch (error) {
        res.status(400).json({error: error.message})
    }
};
export const deletePosts = async(req, res)=>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id))return res.status(404).json({error: 'post does not exist'})

    try {
        const post = await Post.findById(id);
        if(!post) return res.status(404).json({error: 'post does not exist'})
        const deletedPost = await Post.findByIdAndDelete({_id: id})
        res.status(200).json(deletedPost)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
};
export const updatePosts = async(req, res)=>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id))return res.status(404).json({error: 'post does not exist'})

    try {
        const post = await Post.findById(id);
        if(!post) return res.status(404).json({error: 'post does not exist'})
        const updatedPost = await Post.findByIdAndUpdate({_id: id}, {...req.body})
        res.status(200).json(updatedPost)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
};
