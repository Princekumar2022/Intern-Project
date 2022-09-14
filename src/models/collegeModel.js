const mongoose = require("mongoose")


const collegeSchema = new mongoose.Schema({

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



module.exports= mongoose.model("college", collegeSchema)




// College Model
// { name: { mandatory, unique, example iith}, fullName: {mandatory, example `Indian Institute of Technology, Hyderabad`}, logoLink: {mandatory}, isDeleted: {boolean, default: false} }