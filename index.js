const express=require("express")
const cors=require("cors")
const { userRoute } = require("./route/userRoute.route")
const { connection } = require("./db")
const { employeeRoute } = require("./route/employees.route")
const app=express()
app.use(cors())
app.use(express.json())
app.use("/users",userRoute)
app.use("/employees",employeeRoute)
app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log(`server run at ${process.env.port}`)
    } catch (error) {
        console.log(error.message)
    }
})

