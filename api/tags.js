let resp;
class Tags {
    constructor (obj) {
        this.obj = obj;
    }
    get tags () {
        return this.obj.models.tags.findAll();
    }
    async get_website ({ id }) {
        await this.obj.models.websites_tags.findAll({ where: { domain_id: id } }).then(function(task){
            task.save;
            resp = Object.assign({ status: "success" }, { task } );
        }).catch(error => {
            resp = Object.assign({ status: "error" }, { error } );
        });
        return resp;
    }
}
module.exports = Tags;