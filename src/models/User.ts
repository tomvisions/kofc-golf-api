const {DataTypes, Model} = require("sequelize");
//import {sequelize} from '../db/';
import {S3Mapper} from "../mapper/s3.mapper";

class User extends Model {
    static PARAM_FRONTCLOUD = 'https://images.mamboleofc.ca'

    private avatar:string;

    public static initialize(sequelize) {
        return this.init({
            id: {
                type: DataTypes.STRING,
                primaryKey: true
            },
            userName: {
                type: DataTypes.STRING,
            },
            password: {
                type: DataTypes.STRING,
            },
            email: {
                type: DataTypes.STRING,
            },
            createdAt: {
                type: DataTypes.DATE,
            },
            updatedAt: {
                type: DataTypes.DATE,
            },
        }, {
            modelName: 'User', sequelize, tableName: "user"
        });

    }
}

export {User}

