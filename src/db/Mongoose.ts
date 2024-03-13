import Mongoose, {Connection, Model, Schema} from 'mongoose';
import  {Sequelize, Dialect} from '.';
import dotenv from "dotenv";
dotenv.config();

export interface OptionsMongoose {
    useNewUrlParser:boolean;
    useUnifiedTopology: boolean;
    port:number;
}

/**
 * SequelizeApi class. A class that deals with working with Sequelize
 */
export class MongooseApi {
    private _databaseName: string;
    private _options: OptionsMongoose;
    private _mongoose: typeof Mongoose;

    /**
     * Constructor for class
     * @param database
     * @param options
     */
    constructor(database: string, options: OptionsMongoose) {
        this._databaseName = database;
        this._options = options;
        this._mongoose = Mongoose;
    }

    /**
     * Initialization function for sequelize
     *
     *
     */
      public async initialize() {
       const conn = this._mongoose.createConnection(this._databaseName, options);

        return conn;
       //await conn.readyState


  //      console.log('testing');
    //    console.log(conn);
    //  const db = this._mongoose.connection;

//      conn.on("error", console.error.bind(console, "MongoDB connection error:"));

  //    return  conn;
 //     console.log(test);
      //  return test;

//        const db = this._mongoose.connection;
  //      db.on("error", console.error.bind(console, "MongoDB connection error:"));
      //  console.log(this._databaseName);
      //  console.log(db);
    //   return db;
//        return new Mongoose(this._database, this._username, this._password, this._options);
    };
}

let options;
if (process.env.NODE_ENV === 'dev') {
    options = { useNewUrlParser: true, useUnifiedTopology: true }
} else if ( process.env.NODE_ENV === 'stage') {
    options = { useNewUrlParser: true, useUnifiedTopology: true }
} else {
    options = { useNewUrlParser: true, useUnifiedTopology: true }
}

const mongoose = Mongoose.createConnection(process.env.MONGO_DATABASE, options);
const mongooseLive = Mongoose.createConnection(process.env.MONGO_LIVE_DATABASE, options);


//console.log(mongoose);
export {mongoose, mongooseLive, Model, Schema};
