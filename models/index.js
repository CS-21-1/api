const path = require('path');
const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config()

const sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USERNAME, process.env.DATABASE_PASSWORD, {
  host: process.env.DATABASE_HOST,
  dialect: 'mysql',
  define: {
    collate: 'utf8_general_ci',
    timestamps: false
  },
  logging: console.log
});

// const sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USERNAME, process.env.DATABASE_PASSWORD ?? "", {
//   host: process.env.DATABASE_HOST,
//   dialect: 'mysql',
//   define: {
//     collate: 'utf8_general_ci',
//     timestamps: false
//   },
//   logging: console.log
// });
// Load models
const models = [
  'websites',
  'tags',
  'websites_tags',
  'scores',
  'fakes'
];
models.forEach(function (model) {
  module.exports[model] = require(path.join(__dirname, model))(sequelize, Sequelize.DataTypes)
});
sequelize.sync().catch((error) => {
  console.error('[ERROR] Unable to create table : ', error);
});
// module.exports["products"] = sequelize.import(__dirname + '/' + model);