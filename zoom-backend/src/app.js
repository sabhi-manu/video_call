import express, { urlencoded } from "express"
import cookieParser from "cookie-parser"
import userRoute from "./routes/user.route.js"
import cors from "cors"

const app = express()
app.use(express.json({limit:"40kb"}))
app.use(express.urlencoded())
app.use(cookieParser())
app.use(cors())

app.use("/",(req,res)=>{
    res.write("hellow ")
    res.end()
})
app.use("/api/user",userRoute)

export default app