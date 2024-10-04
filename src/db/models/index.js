'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const dbConfig = require(__dirname + '../config/config.js');
const databases = {};

for (const dbKey in dbConfig) {
    const config = dbConfig[dbKey];
    databases[dbKey] = new Sequelize(config.database, config.username, config.password, config);
}

const db = {}

console.log(dbConfig)

for(const dbKey in databases) {

}


module.exports = db;