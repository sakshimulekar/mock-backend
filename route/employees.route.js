const express=require("express")
const { EmployeeModel } = require("../model/employees.model")
const { auth } = require("../auth.middleware")
const employeeRoute=express.Router()
employeeRoute.use(auth)
employeeRoute.get("/",async(req,res)=>{
    try {
        let q={}
        const {page,Department}=req.query
        if(Department){
            q.Department=Department
        }
        const employee=await EmployeeModel.find(q).skip((+page - 1)*5).limit(5).sort({Salary:-1})
        console.log(employee)
        res.status(200).json({msg:"here are the employees",employee})
    } catch (error) {
        res.status(400).json({msg:error.message})
    }
})

employeeRoute.post("/add",async(req,res)=>{
    try {
        const employee=new EmployeeModel(req.body)
        await employee.save()
        console.log(employee)
        res.status(200).json({msg:"employee added",employee})
    } catch (error) {
        res.status(400).json({msg:error.message})
    }
})

employeeRoute.put("/edit/:empId",async(req,res)=>{
    const {empId}=req.params
    try {
        const employee=await EmployeeModel.findByIdAndUpdate(empId,req.body)
        res.status(200).json({msg:"updated",employee})
    } catch (error) {
        res.status(400).json({msg:error.message})
    }
})

employeeRoute.delete("/delete/:id",async(req,res)=>{
    const {id}=req.params
    try {
        const employee=await EmployeeModel.findByIdAndDelete(id)
        res.status(200).json({msg:"deleted",employee})
    } catch (error) {
        res.status(400).json({msg:error.message})
    }
})

module.exports={
    employeeRoute
}