//const { Router } = require('express')
const express=require('express')
const router=express.Router()

const collegeController=require("../controllers/collegeControllers")

const internController=require("../controllers/internControllers")


  router.post("/functionup/colleges",collegeController.createCollege)
 
  router.post("/functionup/interns",internController.createIntern)
 
 
 
 
 
 
 
 
 
 
  module.exports=router

  // url veriffication regex not done