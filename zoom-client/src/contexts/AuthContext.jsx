import { createContext, useState } from "react";
import axiosInstance from "../config/apiFolder/axiosInstance";
import { useNavigate } from "react-router";



export const AuthContext = createContext(null)

export const AuthProvider = ({children})=>{

    const [user,setUser] = useState(null)
    const navigate = useNavigate()

   const RegisterHandler = async (data)=>{
    try {
        console.log("user details register==>",data)
        let response = await axiosInstance.post("/user/register",data)
        console.log(response)
        if(response.status == 201||200){
            setUser(response.data.user)
            navigate("/")
        }
    } catch (error) {
        console.log("error in Register user",error.message)
    }
   }

   const logInHandler = async (data)=>{
    try {
         console.log("user details login==>",data)
        const response = await axiosInstance.post("/user/login",data)
        console.log(response)
      if(response.status == 200 || 201){
        setUser(response.data.user)
        navigate("/")
      }
        
    } catch (error) {
        console.log("error in login user ==>",error.message)
    }
   }
    return (
        <AuthContext.Provider value={{user,RegisterHandler,logInHandler}}>
            {children}
        </AuthContext.Provider>
    )
}