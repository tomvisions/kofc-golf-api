import { BaseMapper } from ".";
import moment from "moment";
import {Tag, GalleryTag} from "../models";
import * as uuid from 'uuid';

export class TagMapper extends BaseMapper {
    private _PARAMS_NAME: string = 'name';
    private _DEFAULT_SORT: string = 'name';



    constructor() {
        super();
        this.DATABASE_NAME = 'photo_gallery';
        this.initalizeSequelize()
        this.initializeTag();
    }


    private async initializeTag() {
        Tag.initialize(this.SEQUELIZE);
    }

    public async createTag(params) { //: Promise<string[] | string> {

        try {
            const tag = {
                id: params.id,
                name: params.name,
                description: params.description,
                createdAt: moment().format('YYYY-MM-DD'),
                updatedAt: moment().format('YYYY-MM-DD'),
            };

            return await Tag.findOrCreate({ where: { name: params.name }, defaults: tag });
        } catch (error) {
            console.log(error);
            return error.toString();
        }
    }

    /**
 * 
 * @param options 
 * @returns 
 */
    public async getAllTagsForGallery(options) {
        try {


            const gallery = {
                include: [{
                    model: GalleryTag,
                    association: GalleryTag.Tag,
                    required: true
                }],
                where: {
                    '$gallery_tag.gallery_id$': options.gallery_id
                },
                //  'gallery_tag.gallery': '975f63c6-8a0f-4536-a126-ffdde09c217c'
                //  group: ['gallery_tag.tag_id']

            }
            //            console.log('the gallery');
            //          console.log(gallery);

            return await Tag.findAll(gallery).then(data => {
                return data[0];
            }).catch(err => {
                return err;
            })
        } catch (error) {
            console.log(`Could not fetch gallery ${error}`)
        }
    }

    public async getAllTags(params) { //: Promise<string[] | string> {
        let offset;

        try {

            const offset = ((params.pageIndex - 1) * params.pageSize)
            
            const tagConfig = {
                offset: offset,
                limit: params.pageSize,

            }

            return await Tag.findAll(tagConfig).then(images => {
                return this.processArray(images);
            }).catch(err => {
                return err;
            })
        } catch (error) {
            console.log(error);
            return error.toString();
        }
    }

    get DEFAULT_SORT(): string {
        return this._DEFAULT_SORT;
    }

    get PARAMS_NAME(): string {
        return this._PARAMS_NAME;
    }

}

export const tagMapper = new TagMapper();