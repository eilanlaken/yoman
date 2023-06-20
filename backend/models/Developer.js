const mongoose = require('mongoose')

const Schema = mongoose.Schema

const developerSchema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true}, 
    handle: {type: String, required: true},
    title: {type: String, required: true}
}, {timestamps: true})

module.exports = mongoose.model('Developer', developerSchema)

