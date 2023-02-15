const express = require('express');
const models = require("../../models");
const router = express.Router();

router.get('/tags', async (req, res) => {
    return await models.tags.findAll();
});
// router.get('/tags', async (req, res) => {
//     return await models.tags.findAll();
// });

module.exports = router;