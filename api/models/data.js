const mongoose = require("../database/database");

const dataSchema = new mongoose.Schema({
temperature: {
    type: Number,
    min: 0,
    max: 50
},
humidity:{
    type: Number,
    min: 25,
    max: 95
} ,
date: String
});


const Data = mongoose.model("Data", dataSchema);

module.exports = Data;