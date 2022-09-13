const mongoose = require("mongoose")
const moongoose = require("moongoose")

const collegeSchema = new mongoose.schema({

name: {
    type: String,
    required: true,
    unique: true
},
fullName: {
    type: String,
    required: true,

},
logolink: {
    type: String,
    required: true

},
isDeleated: {
    type: Boolean,
     default: false
    }

}, {timestamps: true})



module.exports= moongoose.model("college", collegeSchema)




// College Model
// { name: { mandatory, unique, example iith}, fullName: {mandatory, example `Indian Institute of Technology, Hyderabad`}, logoLink: {mandatory}, isDeleted: {boolean, default: false} }