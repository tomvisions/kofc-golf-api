"use strict";

const {DataTypes, Model} = require('../db');

export class Gallery extends Model {


    /**
     *
     * @param sequelize
     * @param Tag
     * @param GalleryTag
     */
    public static initialize(sequelize, Tag, GalleryTag) {
        const gallery =  this.init({
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
            modelName: 'Gallery', sequelize: sequelize, tableName:"gallery"
        });
        return gallery;
    }
}
/*

//const sequelize = require('sequelize');
import { Image } from ".";
import { GalleryTag } from "./GalleryTag";
import { Tag } from "./Tag";
class Gallery extends Model {}
//const gallery = new Gallery(attributes, options);
//console.log(gallery);
Gallery.init({
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
    modelName: 'Gallery', sequelize: sequelize, tableName:"gallery"
});

//Image.Gallery = Image.hasOne(Gallery,  {sourceKey: "gallery_id", as: "gallery", foreignKey: 'id', onUpdate: 'cascade'})

//Gallery.GalleryTag = Gallery.hasMany(GalleryTag,{sourceKey: "id", as: "tags", foreignKey: 'gallery_id', onUpdate: 'cascade'} )
//Tag.hasMany(Gallery)
console.log('start of stuff');
//Gallery.Tag = Gallery.belongsToMany(Tag, { through: 'gallery_tag' }); 
//Tag.belongsToMany(Gallery, { through: 'gallery_tag' }); 

Gallery.Tag = Gallery.belongsToMany(Tag, { through: GalleryTag, throughAssociations: {
    // 1️⃣ The name of the association going from the source model (Person)
    // to the through model (LikedToot)
    fromSource: Gallery,
    
    // 2️⃣ The name of the association going from the through model (LikedToot) 
    // to the source model (Person)
    toSource: Tag,
    
    // 3️⃣ The name of the association going from the target model (Toot)
    // to the through model (LikedToot)
   // fromTarget: 'id',

    // 4️⃣ The name of the association going from the through model (LikedToot)
    // to the target model (Toot)
    toTarget: Tag,
     foreignKey: 'GalleryId',
     sourceKey: 'id'
    // targetKey: 'gallery_id'
  },} ); 

//Gallery.GalleryTag = Gallery.hasMany(GalleryTag)
//Image.Gallery = Image.hasOne(Gallery,  {sourceKey: "gallery_id", as: "gallery", foreignKey: 'id', onUpdate: 'cascade'})

//GalleryTag.Tag = Tag.hasMany(GalleryTag,  {sourceKey: "id", as: "gallery_tag",  foreignKey: 'tag_id', onUpdate: 'cascade'})
//Gallery.GalleryTag = Gallery.hasMany(GalleryTag,  {sourceKey: "gallery_i//d", as: "gallery_tag",  foreignKey: 'id', onUpdate: 'cascade'})

//const gallery = new Gallery();

export { Gallery}
*/