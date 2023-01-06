class Tags {
    constructor (obj) {
        this.obj = obj;
    }
    get tags () {
        return this.obj.models.tags.findAll();
    }
}
module.exports = Tags;