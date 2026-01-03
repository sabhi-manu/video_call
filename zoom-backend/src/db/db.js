import mongoose from "mongoose"

const connectDB = async()=>{
    try {
       await mongoose.connect(process.env.MONGO_URL)
       console.log("data base connect successfull.")
    } catch (error) {
        console.log("error in data base connection .",error.message)
    }
}

export default connectDB