const collegeModel = require('../models/collegeModel')
//const internModel = require('../model/internModel')
const regEx = /^[a-zA-Z ]*$/;
const regExLogoLink =  /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/





const isValidation = function (value) {
    if (typeof value == 'undefined' || value == null) return false
    if (typeof value == "string" && value.trim().length == 0) return false
    return true
}


const createCollege = async function (req, res) {
    try {
        let collegeData = req.body
        if (Object.keys(collegeData).length == 0) {
            return res.status(400).send({ status: false, msg: "body should not be empty" })
        }
        let { name, fullName, logoLink } = collegeData
        if (!name) return res.status(400).send({ status: false, msg: "name is required" })
        if (!isValidation(name)) return res.status(400).send({ status: false, msg: "name should be valid" })
        if (!regEx.test(name)) {
            return res.status(400).send({ status: false, msg: "name must be in alphabet" })
        }
        const search = await collegeModel.findOne({ name: name })
        if (search) {
            return res.status(400).send({ status: false, msg: "  name is already exist " })
        }
        if (!fullName) return res.status(400).send({ status: false, msg: "fullName is required" })

        if (!isValidation(fullName)) return res.status(400).send({ status: false, msg: "fullname should be valid" })
        if (!regEx.test(fullName)) {
            return res.status(400).send({ status: false, msg: "fullname must be in alphabet" })
        }
        if (!logoLink) return res.status(400).send({ status: false, msg: "logoLink  is required" })
        if (!regExLogoLink.test(logoLink)) {
            return res.status(400).send({ status: false, msg: "logoLink is invalid" })
        }
        let createCollege = await collegeModel.create(collegeData)
        let newData = { name: createCollege.name, fullName: createCollege.fullName, logoLink: createCollege.logoLink, isDeleted: createCollege.isDeleated }
        return res.send({ status: true, msg: "college created successfully", data: newData })
    }
    catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
}

/////////////////////////////////get college///



// const CollegeDetails=async function(req,res){
//     try {




//     } catch (error) {

//     }
// }


module.exports.createCollege = createCollege;




/////  https://functionup-stg.s3.ap-south-1.amazonaws.com/thorium/iitd.png


