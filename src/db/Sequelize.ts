import  {Sequelize, Dialect} from '.';
import dotenv from "dotenv";
dotenv.config();

export interface OptionsSequelize {
    host:string;
    dialect: Dialect;
    port:number;
}

export interface DBOptions {
    DB_NAME: string
    DB_USERNAME: string
    DB_PASSWORD: string
    DB_HOST: string
    NODE_ENV: string
}

/**
 * SequelizeApi class. A class that deals with working with Sequelize
 */
export class SequelizeApi {
    private _database: string;
    private _username: string;
    private _password: string;
    private _options: OptionsSequelize;

    /**
     * Constructor for class
     * @param database
     * @param username
     * @param password
     * @param options
     */
    constructor(database: string, username: string, password: string, options: OptionsSequelize) {
        this._database = database;
        this._username = username;
        this._password = password;
        this._options = options;
        console.log(this);
    }

    /**
     * Initialization function for sequelize
     */
    public initialize() {
      return new Sequelize(this._database, this._username, this._password, this._options);
    };
}
/*
let options;

if (process.env.NODE_ENV === 'dev') {
    options = {host: process.env.DB_HOST, dialect: 'mysql', port:3306}
//    options = {host: '127.0.0.1', dialect: 'mysql', port:3306}
} else if ( process.env.NODE_ENV === 'stage') {
    options = {host: process.env.DB_HOST, dialect: 'mysql', port:3306}
} else {
    options = {host: process.env.DB_HOST, dialect: 'mysql', port:3306}
}

let sequelizeClass = new SequelizeApi(process.env.DB_NAME, process.env.DB_USERNAME,process.env.DB_PASSWORD, options );//.initialize();
let sequelize = sequelizeClass.initialize();

export {sequelize};
*/