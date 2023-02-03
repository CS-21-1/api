const fs = require("fs");

let resp;
class Websites {
    constructor (obj) {
        this.obj = obj;
    }
    websites ({ offset = 0, limit = 20 }) {
        return this.obj.models.websites.findAll({
            offset: Number(offset),
            limit: Number(limit)
        });
    }
    async website ({ id, domain }) {
        let db;
        if (id !== null && id !== undefined) {
            db = await this.obj.models.websites.findOne({ where: { id }, limit: 1 });
            if(db !== null){
                const whois = await this.obj.axios.get(`http://api.whois.vu/?q=${db.domain}`)
                return Object.assign({ database: db }, { whois: whois.data } )
            }else{
                return Object.assign({ database: null }, { whois: null });
            }
        }else{
            if (domain !== null && domain !== undefined) {
                db = await this.obj.models.websites.findOne({ where: { domain: { [this.obj.Op.like]: '%' + domain + '%' } }, limit: 1 });
                const whois = await this.obj.axios.get(`http://api.whois.vu/?q=${domain}`)
                return Object.assign({ database: db }, { whois: whois.data } )
            }
        }
    }
    async add_website ({ domain }) {
        console.log(domain)
        await this.obj.models.websites.create({ domain }).then(function(task){
            task.save;
            resp = Object.assign({ status: "success" }, { task } );
        }).catch(error => {
            resp = Object.assign({ status: "error" }, { error } );
        });
        return resp;
    }
}
module.exports = Websites;