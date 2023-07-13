const express=require("express")
require("dotenv").config()
const {connection}=require("./config/db")
const {userRouter}=require("./route/user.route")
const cors=require("cors")
const {empRouter}=require("./route/emp.route")
const {authenticate}=require("./middleware/auth")


const app=express()

app.use(express.json())
app.use(cors())
app.use("/users",userRouter)
app.use(authenticate)
app.use("/employee",empRouter)


app.listen(process.env.PORT,async ()=>{
    try {
        await connection
        console.log("conneted to DB")
    } catch (error) {
        console.log(error.message)
    }
    console.log("server is running")
})