import express from 'express'
import { getAllPosts,getPost,createPosts, deletePosts, updatePosts } from '../controllers/postControllers.js'

const router= express.Router()

router.get('/', getAllPosts)
router.get('/:id', getPost)
router.post('/', createPosts)
router.delete('/:id', deletePosts);
router.patch('/:id', updatePosts)

export default router;