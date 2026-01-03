import express, { urlencoded } from "express"
import cookieParser from "cookie-parser"
import userRoute from "./routes/user.route.js"
import cors from "cors"

const app = express()
app.use(express.json({limit:"40kb"}))
app.use(express.urlencoded())
app.use(cookieParser())
app.use( cors({
    origin: "http://localhost:5173", 
    credentials: true,               
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }))

app.use("/api/user",userRoute)

export default app