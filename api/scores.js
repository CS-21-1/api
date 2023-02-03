class Scores {
    constructor (obj) {
        this.obj = obj;
    }
    scores ({ offset = 0, limit = 20, id = null }) {
        if(id !== null){
            return this.obj.models.scores.findAll({ where: { domain_id: id }, offset, limit });
        }else{
            return this.obj.models.scores.findAll({ offset, limit });
        }
    }
    async score ({ id }) {
        let rating = 0;
        let i = 0;
        const db = await this.obj.models.scores.findAll({ attributes: ['score'], where: { domain_id: id } });
        db.map(score => {
            rating += score.dataValues.score;
            i++;
        });
        return { score: rating / i };
    }
    async add_score ({ id, score, comment = null, ip }) {
        const db = await this.obj.models.scores.findOne({ where: { domain_id: id, ip } });
        if (db === null) {
            await this.obj.models.scores.create({ domain_id: id, score, comment, ip }).then(function(task){
                task.save;
            });
        }else{
            return 1;
        }
    }
}
module.exports = Scores;