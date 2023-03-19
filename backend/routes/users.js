import  Express  from "express"
import { findUser } from "../controllers/users.js"

const router = Express.Router()

router.get("/find/:userId", findUser);

export default router