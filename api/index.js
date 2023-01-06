const models = require('../models');
//
const express = require('express')
const app = express()
//
const websites = require("./websites");
const links = require("./links");
const tags = require("./tags");
const scores = require("./scores");

class API {
    constructor () {
        this.port = 3000;
        //
        this.models = models;
        //
        this.Websites = new websites(this);
        this.Links = new links(this);
        this.Tags = new tags(this);
        this.Scores = new scores(this);
    }
}

const api = new API();
console.log(api);

//Websites
app.get('/websites', async (req, res) => {
    if(req.query.id !== null && req.query.id !== undefined || req.query.domain !== null && req.query.domain !== undefined){
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

//Tags
app.get('/tags', async (req, res) => {
    return res.status(200).json(await api.Tags.tags);
})

app.listen(api.port, () => {
  console.log(`Express listening on port ${api.port}`)
})