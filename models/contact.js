const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
 
const Contact = sequelize.define('Contact', {
   
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
 
 
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
 
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    message: {
        type: DataTypes.TEXT,
        allowNull: false,
    }
}, {
 
 
    tableName: 'Contacts',
    timestamps: true,
});
 
 
module.exports = Contact;
 
 
 