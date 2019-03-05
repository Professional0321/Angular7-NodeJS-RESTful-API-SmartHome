const mongoose = require("../database/database");

const AlarmSchema = new mongoose.Schema({
status: Boolean
});


const Alarm = mongoose.model("Alarm", AlarmSchema);

module.exports = Alarm;