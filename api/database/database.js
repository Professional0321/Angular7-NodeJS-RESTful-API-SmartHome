const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://admin-dawid:Asaasa12@smarthome-lcqs3.mongodb.net/smarthomeDB", { useNewUrlParser: true })
    .then(console.log("Connected to mongoDB..."))
    .catch(() => {
        console.log("Connection to mongoDB refused...");
    })

mongoose.set("useCreateIndex", true);

module.exports = mongoose;