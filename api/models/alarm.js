const mongoose = require("../database/database");

const alarmSchema = new mongoose.Schema({
    status: Boolean
});


const Alarm = mongoose.model("Alarm", alarmSchema);

module.exports = Alarm;