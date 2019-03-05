const mongoose = require("../database/database");

const DataSchema = new mongoose.Schema({
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


const Data = mongoose.model("Data", DataSchema);

module.exports = Data;