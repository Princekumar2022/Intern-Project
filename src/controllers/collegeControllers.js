const collegeModel = require('../models/collegeModel')
const internModel = require('../models/internModel')

const regEx = /^[a-zA-Z -,]*$/;
const regExLogoLink =  /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/




// validation
const isValidation = function (value) {
    if (typeof value == 'undefined' || value == null) return false
    if (typeof value == "string" && value.trim().length == 0) return false
    return true
}



//-----------------------------------****Create College**--------------------------------------------//

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
        let newData = { name: createCollege.name, fullName: createCollege.fullName, logoLink: createCollege.logoLink, isDeleted: createCollege.isDeleted }
        return res.status(201).send({ status: true, msg: "college created successfully", data: newData })
    }
    catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
}




//----------------------------------Get College-----------------------------------------------//

const CollegeDetails=async function(req,res){
    try {
        let collegeName = req.query.collegeName

        if (!collegeName || !collegeName.trim()) {
            return res.status(400).send({ status: false, msg: "Invalid request Please provide valid details in Query" });
        }

        const collegeDetails = await collegeModel.findOne({ name: collegeName })
        if (!collegeDetails) return res.status(404).send({ status: false, msg: "College doesn't exist" })
        let interns = await internModel.find({ collegeId: collegeDetails._id }).select({ name: 1, email: 1, mobile: 1 })

        let data = { name: collegeDetails.name, fullName: collegeDetails.fullName, logoLink: collegeDetails.logoLink, interns: interns }
        res.status(200).send({ status: true, data: data })
    } catch (err) {
        return res.status(500).send({ status: false, msg: err.message })

    }
}




module.exports.createCollege = createCollege;
module.exports.CollegeDetails = CollegeDetails

//--------------------------------end-------------------------------//








/////  https://functionup-stg.s3.ap-south-1.amazonaws.com/thorium/iitd.png


