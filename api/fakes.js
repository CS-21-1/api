const { Sequelize, Op } = require('sequelize');
class Fakes {
    constructor (obj) {
        this.obj = obj;
    }
    fakes ({ offset = 0, limit = 20, fact = null }) {
        if(fact !== null){
            return this.obj.models.fakes.findAll({ where: { fact: { [Op.like]: '%' + fact + '%' } }, offset: Number(offset), limit: Number(limit) }).catch(err => console.log(err));
        }else{
            return this.obj.models.fakes.findAll({ offset: Number(offset), limit: Number(limit) }).catch(err => console.log(err));;
        }
    }
}
module.exports = Fakes;