const express=require("express")
const {EmpModel}=require("../model/emp.model")
const empRouter=express.Router()
const {authenticate}=require("../middleware/auth")

empRouter.get("/employees",authenticate,async (req,res)=>{
    try {
        const employees=await EmpModel.find()
        res.send(employees)
    } catch (error) {
        res.send({msg:"something went wrong"})
    }
})

empRouter.post("/employees",authenticate,async (req,res)=>{
    try {
        const {firstName,lastName,email,department,salary}=req.body;
        const employees=new EmpModel({firstName,lastName,email,department,salary})
        await employees.save();
        res.send({msg:"Employee created"})
        
    } catch (error) {
        res.send({msg:"something went wrong"})
    }
})


empRouter.delete("/employees/:id",authenticate,async (req,res)=>{

    try {
        const {id}=req.params
        await EmpModel.findByIdAndDelete({_id:id})
        res.send({msg:"Employee deleted"})
    } catch (error) {
        res.send({msg:"something went wrong"})
    }
    
})

empRouter.put("/employees/:id",authenticate,async (req,res)=>{

    try {
        const {id}=req.params
        const {firstName,lastName,email,department,salary}=req.body;
        await EmpModel.findByIdAndUpdate({_id:id},{firstName,lastName,email,department,salary})
        res.send({msg:"Employee updated"})
    } catch (error) {
        res.send({msg:"something went wrong"})
    }
    
})

module.exports={empRouter}