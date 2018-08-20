var knex = require('../knex');

function getAllApikey() {
    return knex('api_key').select();
}

module.exports = {
    getAllApikey: getAllApikey
};