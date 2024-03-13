"use strict";

//import { GalleryTag } from "./GalleryTag";

const {DataTypes, Model} = require('../db');

class Tag extends Model
{
    /**
     *
     * @param sequelize
     */
    public static initialize(sequelize) {
         return this.init({
            id: {
                type: DataTypes.STRING,
                primaryKey: true
            },
            name: {
                type: DataTypes.STRING,
            },
            description: {
                type: DataTypes.STRING,
            },
            createdAt: {
                type: DataTypes.DATE,
            },
            updatedAt: {
                type: DataTypes.DATE,
            }
        }, {
            modelName: 'Tag', sequelize: sequelize, tableName:"tag"
        });
    }
}
/*
Tag.init({
    id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
    },
    description: {
        type: DataTypes.STRING,
    },
    createdAt: {
        type: DataTypes.DATE,
    },
    updatedAt: {
        type: DataTypes.DATE,
    }
}, {
    modelName: 'Tag', sequelize: sequelize, tableName:"tag"
});
*/
export {Tag}
