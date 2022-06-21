const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const Model = sequelize.define('tokens', {
    hash: {type: Sequelize.STRING},
    tx_count: {type: Sequelize.STRING},
    total_holder: Number,
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
});

module.exports = Model;
