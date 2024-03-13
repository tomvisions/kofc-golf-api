import nJwt from 'njwt';
import dotenv from "dotenv";
import * as uuid from 'uuid';
import { s3Mapper } from './s3.mapper';
import {SequelizeApi} from "../db/Sequelize";
import * as console from "console";
import * as process from "process";
//import {Sequelize} from "sequelize";


dotenv.config();

export interface PaginationResults {
    list:any,
    pagination: any;
}

export interface paramsOptions {
    id?: string
    pageIndex?:number
    pageSize?:number
    filterQuery?:string
    search?:string
    code?:string
    sort?: string,
    order?: string
    listLength?:number,
}

/*
The Base Mapper. Functions which are in common with others mappers are placed here to avoid duplication of code
 */
export class BaseMapper {
    private _QUERY;
    private _DEFAULT_ORDER: string = 'ASC';
    private _DATABASE_NAME: string = 'photo_gallery';
    private _PARAM_FRONTCLOUD = 'https://images.mamboleofc.ca'
    private _SEQUELIZE;

    /**
     * Initalizing the Sequelize instance with the configuration data taken from file
     * @param dbConfig
     */
    public initalizeSequelize() {

        let options = JSON.parse(`{"host": "${process.env.DB_HOST}", "dialect": "mysql", "port":3306}`);

        const sequelizeApi = new SequelizeApi(this._DATABASE_NAME,process.env.DB_USERNAME,process.env.DB_PASSWORD, options);//.initialize();
        this._SEQUELIZE = sequelizeApi.initialize();
     }

    public async processArray(listing) {
        if (listing.length) {
            const listArray = [];
                
            for (let item of listing) {
                console.log(item.get)
                listArray.push(item.get());
            }

            return listArray;
        }

        return [];
    }

    public async processImageArray(listing) {
        if (listing.length) {
            const listArray = [];
                
            for (let item of listing) {
                const key = s3Mapper.resizeWithInS3(item.key, {
                    "resize": {
                        "width": 400,
                        "height": 400,
                        "fit": "inside"
                    }
                });


                item.key = `${this._PARAM_FRONTCLOUD}/${key}`;
               
                listArray.push(item);
            }
            console.log('the list')
            console.log(listArray);    
            return listArray;
        }

        return [];
    }



    /**
     * Preparing the paginated results
     * @param list
     * @param body
     */
    public prepareListResults(list, body: paramsOptions) {
        return this.generatePagination(list, body)
    }

    /**
     * Generation of pagination for various retrieval of lists
     * @param list: string[]
     * @param query: Query
     */
    public generatePagination(list:string[], body: paramsOptions) : PaginationResults {
        let listClone;
        listClone = list;
      
        const search = body.search || null;
        const sort = body.sort || this['DEFAULT_SORT']
        const order = body.order || 'asc';
        const page = body.pageIndex || 1;
        const size = body.pageSize || 10;

        if (sort === 'identifier' || sort === body.sort)
        {
            listClone.sort((a, b) => {

                const fieldA = a[sort].toString().toUpperCase();
                const fieldB = b[sort].toString().toUpperCase();

                return order === 'asc' ? fieldA.localeCompare(fieldB) : fieldB.localeCompare(fieldA);
            });
        }
        else
        {
            listClone.sort((a, b) => order === 'asc' ? a[sort] - b[sort] : b[sort] - a[sort]);
        }

        // If search exists...
        if ( search )
        {
            // Filter the products
            listClone = listClone.filter(contact => contact.name && contact.name.toLowerCase().includes(search.toLowerCase()));
        }
        // Paginate - Start
        const listLength = body.listLength

        // Calculate pagination details
        const begin = (page -1 ) * size;
        const end = Math.min((size * (page + 1)), listLength);
        const lastPage = Math.max(Math.ceil(listLength / size), 1);

        // Prepare the pagination object
        let pagination = {};

        // If the requested page number is bigger than
        // the last possible page number, return null for
        // products but also send the last possible page so
        // the app can navigate to there
        if ( page > lastPage )
        {
            listClone = null;
            pagination = {
                lastPage
            };
        } else {
            // Paginate the results by size
         //   list = listClone.slice(begin, end);
            console.log('the final list');
            console.log(list);
            // Prepare the pagination mock-api
            pagination = {
                total    : listLength,
                pageSize      : size,
                pageIndex      : page,
                lastPage  : lastPage,
                startIndex: begin,
                endIndex  : end - 1
            };
        }

        return JSON.parse(`{"data":${JSON.stringify(list)}, "total":"${listLength}","pageSize":"${size}", "pageIndex":"${page}", "lastage":"${lastPage}"}`);
    }

    public generateJWTToken() {
        const token = nJwt.create({
            iss: "http://mamboleofc.ca/",  // The URL of your service
            sub: uuid.v4(),    // The UID of the user in your system
            scope: "self"
        },process.env.TOKEN_SECRET);

        token.setExpiration(new Date().getTime() + 60*1000)

        return token.compact();
    }

    public checkAuthenication(tokenHeader = undefined) {
        if (!tokenHeader) {
            return undefined
        }

        try {
            const token = tokenHeader.replace(/^Bearer\s/, '');

            const verified = nJwt.verify(token, process.env.TOKEN_SECRET);

            return (verified.body['exp'] < Date.now());
        } catch (error) {
            return error.toString();
        }
    }

    get DEFAULT_ORDER(): string {
        return this._DEFAULT_ORDER;
    }

    set QUERY(value: string) {
        this._QUERY = value;
    }

    set DATABASE_NAME(value: string) {
        this._DATABASE_NAME = value;
    }

    get SEQUELIZE() {
        return this._SEQUELIZE;
    }
}
