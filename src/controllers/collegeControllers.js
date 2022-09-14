const collegeModel=require("../models/collegeModel")
const checkName=/^[a-zA-Z\s]+$/i
//const urlValidation=require('url-validation')







const createCollege= async function(req,res){
try { 
    let bodyData=req.body
let newData= await collegeModel.create(bodyData)
return res.status(201).send({status:true,data:{ newData}})

} catch (err) {
  return   res.status(500).send({status:false,msg:err.message})
    
}


}
module.exports.createCollege=createCollege

