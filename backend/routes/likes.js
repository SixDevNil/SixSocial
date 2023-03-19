import  Express  from "express"
import {getLikes, like, disLike} from "../controllers/likes.js"

const router = Express.Router()

router.get("/", getLikes) ;
router.post("/like", like) ;
router.delete("/disLike", disLike) ;


export default router