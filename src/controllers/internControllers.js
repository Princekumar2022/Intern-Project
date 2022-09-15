const collegeModel = require('../models/collegeModel')
const internModel = require('../models/internModel')
const mongoose = require("mongoose")

const regEx = /^[a-zA-Z ]*$/;
const regexNumber = /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/
const regexMail = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;


// Validation
const isValidation = function (value) {
    if (typeof value == 'undefined' || value == null) return false
    if (typeof value == "string" && value.trim().length == 0) return false
    return true
}



////////////////////////////////////////////////Create Intern/////////////////////////////////////////////////////////////

const createIntern = async function (req, res) {
    try {
        let data = req.body
        let { name, email, mobile, collegeName } = data
        if (Object.keys(data).length == 0) {
            return res.status(400).send({ status: false, msg: "body should not be empty" })
        }
        if (!name) return res.status(400).send({ status: false, msg: "name is required" })
        if (!isValidation(name)) return res.status(400).send({ status: false, msg: "name should be valid" })
        if (!regEx.test(name)) {
            return res.status(400).send({ status: false, msg: "name must be in alphabet" })
        }
        let search = await internModel.findOne({ name: name })
        if (search) {
            return res.status(400).send({ status: false, msg: "  name is already registered " })
        }
        if (!mobile) return res.status(400).send({ status: false, msg: "mobile is required" })
        if (!regexNumber.test(mobile)) {
            return res.status(400).send({ status: false, msg: "mobile  number not more than 10 digit" })
        }
        search = await internModel.findOne({ mobile: mobile })
        if (search) {
            return res.status(400).send({ status: false, msg: "  mobile is already registered " })
        }
        if (!email) return res.status(400).send({ status: false, msg: "email is required" })

        if (!regexMail.test(email)) {
            return res.status(400).send({ status: false, msg: " not a valid email " })
        }
        search = await internModel.findOne({ email: email })
        if (search) {
            return res.status(400).send({ status: false, msg: "  email is already registered " })
        }
        if (!isValidation(collegeName)) return res.status(400).send({ status: false, msg: "not a valid collegename" })
        search = await collegeModel.findOne({ name: collegeName })
        if (search == null) return res.status(400).send({ status: false, msg: "no college found by this name" })
        let collegeId = search._id
        if (!collegeId) return res.status(400).send({ status: false, msg: "college does not exist" })
        let allData = { name, email, mobile, collegeId }
        let newData = await internModel.create(allData)
        let newData1 = { isDeleted: newData.isDeleated, name: newData.name, email: newData.email, mobile: newData.mobile, collegeId }
        return res.status(201).send({ status: true, msg: "intern created sucessfully", data: newData1 })

    } catch (err) {
        return res.status(500).send({ status: false, msg: err.message })

    }
}


module.exports.createIntern = createIntern




////////////////////////////////////////////////////End///////////////////////////////////////////////////////////////////