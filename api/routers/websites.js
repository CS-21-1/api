const express = require('express');
const axios = require('axios');
const models = require("../../models");
const { Op } = require("sequelize");
const router = express.Router()

router.get('/websites/:id', async (req, res) => {
    db = await models.websites.findOne({
        where: { id: Number(req.params.id) },
        limit: 1
    });
    if (db !== null) {
        const whois = await axios.get(`http://api.whois.vu/?q=${db.domain}`)
        return res.status(200).json(Object.assign({ database: db }, { whois: whois.data }))
    } else {
        return res.status(200).json(Object.assign({ database: null }, { whois: null }));
    }
});
router.get('/websites', async (req, res) => {
    if (req.query.domain === null || req.query.domain === undefined) {
        return res.status(200).json(await models.websites.findAll({
            offset: Number(req.query.offset ?? 0),
            limit: Number(req.query.limit ?? 20)
        }));
    } else {
        db = await models.websites.findOne({
            where: {
                domain: { [Op.like]: '%' + req.query.domain + '%' }
            },
            limit: 1
        });
        const whois = await axios.get(`http://api.whois.vu/?q=${req.query.domain}`)
        return res.status(200).json(Object.assign({ database: db }, { whois: whois.data }))
    }
});
router.post('/websites', (req, res) => {
    return models.websites.create({
        domain: req.body.domain
    }).then(function (task) {
        task.save;
        return res.status(200).json(Object.assign({ status: "success" }, { task }));
    }).catch(error => {
        return res.status(500).json(Object.assign({ status: "error" }, { error }));
    });
});

module.exports = router;