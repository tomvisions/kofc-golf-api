"use strict";

const {DataTypes, Model} = require('../db');
//import { Gallery } from "./Gallery";
//import { GalleryTag } from "./GalleryTag";
import { s3Mapper } from "../mapper";
class Image extends Model {
    static PARAM_FRONTCLOUD = 'https://d34wc8uzk8vrsx.cloudfront.net'
    //static PARAM_LOCATION = ''

    public static initialize(sequelize) {
       return this.init({
            id: {
                type: DataTypes.STRING,
                primaryKey: true
            },


            key: {
                type: DataTypes.STRING,
            },
            GalleryId: {
                type: DataTypes.STRING,
            },
            name: {
                type: DataTypes.STRING,
            },
            createdAt: {
                type: DataTypes.DATE,
            },
            updatedAt: {
                type: DataTypes.DATE,
            },
            orientation: {
                type: DataTypes.SMALLINT,
            },


        }, {
            modelName: 'Image', sequelize: sequelize, tableName:"image"
        });
    }

}

/*
//Image.belongsTo(Gallery)
Image.Gallery = Image.hasOne(Gallery,  {sourceKey: "GalleryId", as: "gallery", foreignKey: 'id', onUpdate: 'cascade'})
Image.GalleryTag = Image.belongsToMany(GalleryTag, { through: Gallery, throughAssociations: {
    // 1️⃣ The name of the association going from the source model (Person)
    // to the through model (LikedToot)
    fromSource: Image,

    // 2️⃣ The name of the association going from the through model (LikedToot)
    // to the source model (Person)
    toSource: GalleryTag,

    // 3️⃣ The name of the association going from the target model (Toot)
    // to the through model (LikedToot)
    fromTarget: 'id',

    // 4️⃣ The name of the association going from the through model (LikedToot)
    // to the target model (Toot)
    toTarget: 'gallery_id',
  },} );

 */
export {Image}
