const express = require('express');
const axios = require('axios');
const models = require("../../models");
const { Op } = require("sequelize");
const router = express.Router();
const whoiser = require("whoiser");
const { checkParam } = require("../checks");

router.get('/websites/:id', async (req, res) => {
    db = await models.websites.findOne({
        where: { id: req.params.id },
        limit: 1
    });
    if (db !== null) {
        const whois = await whoiser(db.domain).catch(err => {
            console.log(err);
            return null;
        });
        return res.status(200).json(Object.assign({ database: db }, { whois }))
    } else {
        return res.status(200).json(Object.assign({ database: null }, { whois: null }));
    }
});
router.get('/websites', async (req, res) => {
    let options = {};
    const domain = req.query.domain ?? null;

    if (domain !== null) {
        options.domain = domain;
    }
    options.offset = Number(req.query.offset ?? 0);
    options.limit = Number(req.query.limit ?? 20);
    if (req.query.domain === null || req.query.domain === undefined) {
        return res.status(200).json(await models.websites.findAll(options));
    } else {
        db = await models.websites.findOne({
            where: {
                domain: { [Op.like]: '%' + req.query.domain + '%' }
            },
            limit: 1
        });
        const whois = await whoiser(req.query.domain).catch(err => {
            console.log(err)
            return err;
        });
        return res.status(200).json(Object.assign({ database: db }, { whois }))
    }
});
router.post('/websites', checkParam, (req, res) => {
    console.log(req.body)
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