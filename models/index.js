const path = require('path'); 
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USERNAME, process.env.DATABASE_PASSWORD, {
  host: process.env.DATABASE_HOST,
// const sequelize = new Sequelize('psqy2fuxujueyofu', 't96vld4wym4qvcd9', 'uemdi3ugt1gv9ny4', {
//   host: 'ltnya0pnki2ck9w8.chr7pe7iynqr.eu-west-1.rds.amazonaws.com',
  dialect: 'mysql',
  define: {
    collate: 'utf8_general_ci',
    timestamps: false
  },
  logging: console.log
});
// Load models
const models = [
  'websites',
  'tags',
  'websites_tags',
  'scores'
];
models.forEach(function(model) {
  module.exports[model] = require(path.join(__dirname, model))(sequelize, Sequelize.DataTypes)
});
sequelize.sync().catch((error) => {
  console.error('[ERROR] Unable to create table : ', error);
});
// module.exports["products"] = sequelize.import(__dirname + '/' + model);