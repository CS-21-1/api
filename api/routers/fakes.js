const express = require('express');
const models = require("../../models");
const router = express.Router();
const { Op } = require("sequelize");

// router.get('/fakes/website', async (req, res) => {
//     return res.status(200).json(await models.fakes.findAll({
//         where: {
//             fact: {
//                 [Op.like]: '%' + req.params.fact + '%'
//             }
//         },
//         offset: Number(req.query.offset ?? 0),
//         limit: Number(req.query.limit ?? 20)
//     }));
// });

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
    let options = {
        offset: Number(req.query.offset ?? 0),
        limit: Number(req.query.limit ?? 20)
    }
    if(req.query.order === "DESC" || req.query.order === "ASC"){
        options.order = [ [ "id", req.query.order ] ];   
    }
    return res.status(200).json(await models.fakes.findAll(options));
});

module.exports = router;