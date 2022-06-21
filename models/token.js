const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const Model = sequelize.define('tokens', {
    hash: {type: Sequelize.STRING, primaryKey: true},
    tx_count: {type: Sequelize.BIGINT},
    total_holder: {type: Sequelize.BIGINT},
    status: {type: Sequelize.STRING},
    type: {type: Sequelize.STRING},
    created_at: {
        allowNull: false,
        type: Sequelize.DATE,
    },
    updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
    },
}, {
    freezeTableName: true,
});

module.exports = Model;
