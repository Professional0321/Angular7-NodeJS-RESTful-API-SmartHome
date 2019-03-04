const Data = require('../models/data');


exports.controller = {
    async findOne(req, res, next) {
        
    },
    async findAll(req, res) {
        const data = await Data.find().sort({createdAt: 'desc'});
        return res.status(200).send({data: data});
    }, 
    async removeAll(req, res) {

    }, 
    async create(req, res) {
        const newData = await new Data({
            temperature: req.body.temperature,
            humidity: req.body.humidity
        }).save();
        return res.status(201).send({data: newData});
    },
    async update(req, res, next) {

    },
    async remove(req, res, next) {

    }
}

