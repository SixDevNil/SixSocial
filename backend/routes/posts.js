import  Express  from "express"
import { getPosts, addPost } from "../controllers/posts.js"

const router = Express.Router()

router.get("/getPosts/:userId", getPosts) ;
router.post("/addPost", addPost);

export default router