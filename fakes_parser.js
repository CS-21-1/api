const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
// const { Op } = require("sequelize");
const models = require('./models');
class FakesParser {
    constructor({ stopfake, order = 0, limit = 1 }) {
        this.links = Object.assign({
            stopfake
        });
        this.$ = null;
        this.order = order;
        this.limit = limit;
        this.data = [];
    }
    async delay() {
        return new Promise(resolve => setTimeout(resolve, 1000));
    }
    async stopfake_parse() {
        this.$ = null;
        let resp;
        for (let index = this.order; index <= this.limit; index++) {
            this.data = [];
            console.log(index)
            resp = await axios.get(this.links.stopfake[1] + index + '/').catch(err => console.log(err));
                this.$ = cheerio.load(resp.data);
                this.$('.item-details > h3 > a').each((index, element) => {
                    this.data.push({
                        fact: element.attribs.title,
                        link: element.attribs.href
                    });
                });
            models.fakes.bulkCreate(this.data).catch(err => { console.log(err) })
            await this.delay();
        }
    }
}

const parser = new FakesParser({
    stopfake: [
        "https://www.stopfake.org/ru/category/factcheck_for_facebook_ru/page/",
        "https://www.stopfake.org/uk/category/factcheck_facebook_ua/page/"
    ],
    order: 0,
    limit: 182
});
parser.stopfake_parse();