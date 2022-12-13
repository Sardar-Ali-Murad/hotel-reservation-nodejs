import express from "express"
let router=express.Router()

import {Login,Register,deleteUser,updateUser,getAllUsers,getCurrentUser} from "../controllers/Users.js"

import {auth,isAdmin} from "../middleware/auth.js"

router.route("/register").post(Register)
router.route("/login").post(Login)
router.route("/:userId").delete(auth,isAdmin,deleteUser)
router.route("/updateCurrentUser").patch(auth,updateUser)
router.route("/getCurrentUser").get(auth,getCurrentUser)
router.route("/getAllUsers").get(auth,isAdmin,getAllUsers)



export default router