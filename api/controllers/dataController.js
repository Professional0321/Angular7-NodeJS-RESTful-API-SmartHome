const Data = require('../models/data');
const _ = require('lodash');

exports.controller = {
    // :id -> yyyy/mm/dd
    async findByDay(req, res, next) {
        let currentDay = _.lowerCase(req.params.currentDay);
        const data = [];

        await Data.find((err, records) => {
            if (!records) return next();

            records.forEach((record) => {
                const date = _.lowerCase(record.date);
                if (date === currentDay) {
                    data.push(record);
                }
            });
        });
        res.send({ data: data });
    },
    // Re
    async findAll(req, res) {
        const data = await Data.find().sort({ createdAt: 'desc' });
        return res.status(200).send({ data: data });
    },
    // Wipe all data
    async removeAll(req, res, next) {
        Data.deleteMany((err) => {
            if (err) next();
            else return res.status(200).send("Deleted all records");
        });
    },
    // Create new data recorcd
    async create(req, res) {
        const date = new Date().toISOString().slice(0, 10);
        const newData = await new Data({
            temperature: req.body.temperature,
            humidity: req.body.humidity,
            date: date
        }).save();

        return res.status(201).send({ data: newData });
    },

    async removeByDay(req, res, next) {
        let currentDay = _.lowerCase(req.params.currentDay);

        await Data.find((err, records) => {
            if (!records) return next();

            records.forEach((record) => {
                const date = _.lowerCase(record.date);
                if (date === currentDay) {
                    Data.deleteMany({ date: record.date }, (err) => {
                        if (err) return next();
                    });
                }
            });
            res.send("Records posted on " + req.params.currentDay + " deleted");
        });
    }
}

