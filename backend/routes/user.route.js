import express, { Router } from "express"
import { userLogin, UserLogout, userRregister } from "../controller/user.controller.js"

const router =express.Router()

router.post('/register',userRregister)
router.post('/login',userLogin)
router.get('/logout',UserLogout)


export default router