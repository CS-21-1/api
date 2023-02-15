const express = require('express');
const models = require("../../models");
const router = express.Router();
const { Op } = require("sequelize");

router.get('/fakes/:fact', async (req, res) => {
    return res.status(200).json(await models.fakes.findAll({
        where: {
            fact: {
                [Op.like]: '%' + req.params.fact + '%'
            }
        },
        offset: Number(req.query.offset ?? 0),
        limit: Number(req.query.limit ?? 20)
    }));
});
router.get('/fakes', async (req, res) => {
    return res.status(200).json(await models.fakes.findAll({
        offset: Number(req.query.offset ?? 0),
        limit: Number(req.query.limit ?? 20)
    }));
});

module.exports = router;