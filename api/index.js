require('dotenv').config()
const models = require('../models');
//
const express = require('express');
const expressMd = require('express-md');
const axios = require("axios");
const { Op } = require("sequelize");
const app = express();
// const jsonParser = express.json();
const bp = require('body-parser')
//
const tags = require("./tags");
//
const websitesRouter = require("./routers/websites");
const scoresRouter = require("./routers/scores");
const fakesRouter = require("./routers/fakes");
//
class API {
    constructor() {
        //
        this.axios = axios;
        this.Op = Op;
        this.models = models;
        //
        this.Tags = new tags(this);
    }
}

const api = new API();

//Docs
const mdRouter = expressMd({
    dir: __dirname.substr(0, __dirname.length - 4),
    url: '/',
    extensions: ['.md'],
    vars: {
    },
    ignore: [
        RegExp("[^/*\d | ^/docs\d]")
    ]
});
app.use(mdRouter);
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))
//
app.use(websitesRouter)
app.use(scoresRouter)
app.use(fakesRouter)
//

//Tags
app.get('/tags', async (req, res) => {
    return res.status(200).json(await api.Tags.tags);
})
app.listen(process.env.PORT, process.env.IP, () => {
    console.log(`Express listening on ${process.env.IP}:${process.env.PORT}`)
})