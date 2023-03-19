import  Express  from "express"
import {getComments,getNbComments, addComment} from "../controllers/comments.js"

const router = Express.Router()

router.get("/getComments", getComments);
router.get("/getNbComments/", getNbComments);
router.post("/addComment", addComment);


export default router