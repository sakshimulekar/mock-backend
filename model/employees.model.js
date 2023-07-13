const mongoose=require("mongoose")

const employessSchema=mongoose.Schema({
    FirstName:String,
    LastName:String,
    Email:String,
    Department:{type:String,enum:["Tech","Marketing","Operations"]},
    Salary:String
},{
    versionKey:false
})

const EmployeeModel=mongoose.model("employees",employessSchema)

module.exports={
    EmployeeModel
}

