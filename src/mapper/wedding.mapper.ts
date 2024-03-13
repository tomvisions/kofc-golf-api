"use strict";
import {Image} from "../models/ImageWedding";
//import {gallery as Gallery, image as Image} from "../models/";
import {BaseMapper, paramsOptions} from '.';

export class WeddingMapper extends BaseMapper {
    private _PARAMS_ID: string = 'id';
    private _PARAMS_NAME: string = 'name';
    private _DEFAULT_SORT: string = 'name';
    private _LIST_NAME: string = 'galleries';


    constructor() {
        super();
        this.DATABASE_NAME = 'wedding';
        this.initalizeSequelize()
        this.initializeWedding();
    }


    private async initializeWedding() {
        Image.initialize(this.SEQUELIZE);
    }


    public async getAllImages(params: paramsOptions) { //: Promise<string[] | string> {
        try {
            const offset = ((params.pageIndex - 1) * params.pageSize);

            const galleryConfig = {
                attributes: {exclude: ['ImageId', 'GalleryTagTagId']},
                offset: offset,
                limit: params.pageSize,
            }

            return await Image.findAll(galleryConfig).then(galleries => {
                return this.processArray(galleries);
            }).catch(err => {
                console.log('the error');
                console.log(err);
                return err;
            })
        } catch (error) {

            return error.toString();
        }
    }

}

//export const galleryMapper = await (new GalleryMapper()).initialize();

export const weddingMapper = new WeddingMapper();