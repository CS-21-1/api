const express = require('express');
const models = require("../../models");
const router = express.Router();

router.get('/scores/:id', async (req, res) => {
    return res.status(200).json(await models.scores.findAll({
        where: { domain_id: req.params.id },
        offset: req.query.offset,
        limit: req.query.limit
    }));
});
router.get('/scores', async (req, res) => {
    return res.status(200).json(await models.scores.findAll({
        offset: req.query.offset,
        limit: req.query.limit
    }));
});
router.get('/score/:id', async (req, res) => {
    let rating = 0;
    let i = 0;
    const db = await models.scores.findAll({ attributes: ['score'], where: { domain_id: req.params.id } });
    if(db.length !== 0){
        console.log(db)
        db.map(score => {
            rating += score.dataValues.score;
            i++;
        });
        return res.status(200).json({
            domain_id: req.params.id,
            score: rating / i
        });
    }else{
        return res.status(200).json({
            domain_id: req.params.id,
            score: 0
        });
    }
});
router.post('/scores/:id', async (req, res) => {
    let status;
    const ip = req.ip.replaceAll("::", ".");
    const resp = await models.scores.findOne({
        where: {
            domain_id: req.params.id,
            ip
        }
    }).then(async (res) => {
        if (res === null) {
            status = 200;
            return await models.scores.create({
                domain_id: req.params.id,
                score: req.query.score,
                comment: req.query.comment,
                ip
            }).then(function (task) {
                task.save;
                return task;
            });
        } else {
            status = 409;
            return { error: "Вы уже поставили оценку этому домену" };
        }
    });
    res.status(status).json(resp);
});
module.exports = router;