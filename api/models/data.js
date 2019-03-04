const mongoose = require("../database/database");

const DataSchema = new mongoose.Schema({
temperature: Number,
humidity: Number,
},{
    timestamps :{createdAt: true, updatedAt: false}
});


const Data = mongoose.model("Data", DataSchema);

module.exports = Data;