class Websites {
    constructor (obj) {
        this.obj = obj;
    }
    websites ({ offset, limit }) {
        return this.obj.models.websites.findAll({
            offset: Number(offset ?? 0),
            limit: Number(limit ?? 20)
        });
    }
    website ({ id, domain }) {
        if (id !== null && id !== undefined) {
            return this.obj.models.websites.findAll({ where: { id } });
        }else{
            if (domain !== null && domain !== undefined) {
                return this.obj.models.websites.findAll({ where: { name: { [Op.like]: '%' + domain + '%' } } });
            }
        }
    }
}
module.exports = Websites;