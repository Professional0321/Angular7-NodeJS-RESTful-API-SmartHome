const Alarm = require('../models/alarm');
const _ = require('lodash');

exports.controller = {
    // get alarm status
    async getStatus(req, res) {
        const status = await Alarm.findOne();
        return res.status(200).send({ alarm: status });
    },

    // create first alarm
    async createAlarm(req, res) {
        const alarm = await Alarm.find();

        if (alarm.length === 0) {
            const newAlarm = new Alarm({
                status: 0
            })
            await newAlarm.save().then(res.status(200).send("Alarm created"));
        } else {
            res.send("Alarm already exists");
        }
    },

    async enableAlarm(req, res, next) {
        const alarm = await Alarm.findOne();

        if (!alarm) return next();

        alarm.status = 1;
        await alarm.save();

        return res.status(200).send("Alarm enabled");
    },

    async disableAlarm(req, res, next) {
        const alarm = await Alarm.findOne();

        if (!alarm) return next();

        alarm.status = 0;
        await alarm.save();

        return res.status(200).send("Alarm disabled");
    },
    // response simplyfied for arduino users
    async getShortStatus(req, res, next) {
        const alarm = await Alarm.findOne();
        if (!alarm) return next();

        let shortStatus = "0";
        if (alarm.status) shortStatus = "1";

        return res.send(shortStatus);
    }
}

