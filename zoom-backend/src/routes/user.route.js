import express from "express"
import { userLonginController, userRegister } from "../controllers/user.controller.js"

const route = express.Router()

route.post("/register",userRegister)
route.post("/login",userLonginController)

// route.get("/add_to_activity")
//route.get("/get_all_activity")


export default route