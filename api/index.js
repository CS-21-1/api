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
const websites = require("./websites");
const tags = require("./tags");
const scores = require("./scores");
const fakes = require("./fakes");

class API {
    constructor() {
        this.port = 3000;
        //
        this.axios = axios;
        this.Op = Op;
        this.models = models;
        //
        this.Websites = new websites(this);
        this.Tags = new tags(this);
        this.Scores = new scores(this);
        this.Fakes = new fakes(this);
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
//Websites
app.get('/websites/:id/tags', async (req, res) => {
    const db = await api.Tags.get_website({
        id: req.params.id
    })
    if (db.status === "success") {
        return res.status(200).json(db);
    } else {
        return res.status(500).json(db);
    }
})
app.get('/websites', async (req, res) => {
    if (req.query.id !== null && req.query.id !== undefined || req.query.domain !== null && req.query.domain !== undefined) {
        return res.status(200).json(await api.Websites.website({
            id: req.query.id,
            domain: req.query.domain
        }));
    }
    return res.status(200).json(await api.Websites.websites({
        offset: req.query.offset,
        limit: req.query.limit
    }));
})
app.post('/websites', async (req, res) => {
    const db = await api.Websites.add_website({
        domain: req.body.domain
    })
    console.log(db) 
    if (db.status === "success") {
        return res.status(200).json(db);
    } else {
        return res.status(500).json(db);
    }
});

//Tags
app.get('/tags', async (req, res) => {
    return res.status(200).json(await api.Tags.tags);
})

//Scores
app.get('/scores/:id', async (req, res) => {
    console.log(req);
    return res.status(200).json(await api.Scores.scores({
        id: req.params.id,
        offset: req.query.offset,
        limit: req.query.limit
    }));
})
app.post('/scores/:id', async (req, res) => {
    const resp = await api.Scores.add_score({
        id: req.params.id,
        score: req.body.score, 
        comment: req.body.comment,
        ip: req.body.ip
    })
    if (resp !== 1) {
        return res.status(200).json({
            status: "success"
        });
    } else {
        return res.status(500).json({
            status: "error",
            error: "Вы уже поставили оценку этому домену"
        });
    }
})
app.get('/scores', async (req, res) => {
    return res.status(200).json(await api.Scores.scores({
        offset: req.query.offset,
        limit: req.query.limit
    }));
})
app.get('/score/:id', async (req, res) => {
    return res.status(200).json(await api.Scores.score({
        id: req.params.id ?? null
    }));
})
//Fakes
app.get('/fakes', async (req, res) => {
    return res.status(200).json(await api.Fakes.fakes({
        offset: req.query.offset,
        limit: req.query.limit
    }));
})
app.post('/fakes', async (req, res) => {
    return res.status(200).json(await api.Fakes.fakes({
        fact: req.body.fact ?? null
    }));
})
app.listen(api.port, () => {
    console.log(`Express listening on port ${api.port}`)
})