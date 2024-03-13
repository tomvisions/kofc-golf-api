import {S3Client, PutObjectCommand, ListObjectsCommand} from "@aws-sdk/client-s3";
import fs, {existsSync} from "fs";
const sizeOf = require('image-size');
import * as uuid from 'uuid';
const { exec } = require("child_process");

export interface FileProperties {
    content_type?: string;
    extension?: string;
    error?: string;
    image_type?: string;
}

export interface EditProperties {
    "resize": {
        width?: number,
        height?: number,
        fit?: string
    }
}

export class S3Mapper {
    private _client;
    private _UPLOAD_BUCKET: string = 'tomvisions-original-images';

    constructor() {
        const options = {
            version: "latest",
            region: "us-east-1"
        }

        this._client = new S3Client(options);
    }

    /**
     *
     * @param imageBased64
     * @param s3PrePath
     * @param identifier
     */
    async upload(imageBase64: string, s3PrePath: string, identifier: string) {
        let fileProperties: FileProperties;
        try {
            const id = uuid.v4();
            await this.generatePrePath(`/tmp/${s3PrePath}`);
            fileProperties = await this.getImageReadyForUpload(`${s3PrePath}${identifier}`, imageBase64);

            return `${s3PrePath}${identifier}.${fileProperties.extension}`;

        } catch (error) {
            console.log('the error');
            console.log( error.toString());
            //   return {results: "error", message: error.toString()}
            return {result: "error", message: error.toString()}
        }
    }

    /**
     * Function that write based 64 images to disk
     * @param key: string
     * @param image: string the base64 image
     *
     * @returns contentType:string
     */
    async writeToDisk(key: string, image: string) {
        let imageModified: string;
        let contentType: string;
        let extension: string;
        let imageType: string;

        imageType = 'landscape';
console.log('start of write disk');
        try {
            if (image.includes('jpeg;base64')) {
                imageModified = image.replace(/^data:image\/jpeg;base64,/, "");
                contentType = 'image/jpeg';
                extension = 'jpeg';
            } else if (image.includes('png;base64')) {
                imageModified = image.replace(/^data:image\/png;base64,/, "");
                contentType = 'image/png';
                extension = 'png';
            }

            await fs.writeFileSync(`/tmp/${key}.${extension}`, imageModified, 'base64');

            const imageSize = await this.checkSize(`/tmp/${key}.${extension}`);

            if (imageSize.height > imageSize.width) {
                imageType = 'portrait';
            }

            return {
                "content_type": contentType,
                "extension": extension,
                "image_type" : imageType
            }
        } catch (error) {
            return {error: error.toString()}

        }
    }

    async checkSize(image) {
        try {
            return sizeOf(image);
        } catch (error) {
            return error.toString();
        }
    }

    /**
     *
     * @param path
     */
    async generatePrePath(path:string) {
        if (!existsSync(path)) {
            fs.mkdirSync(path, {recursive: true});
        }
    }


    /**
     * Function that
     * @param key:string
     * @param image:string
     */
    async getImageReadyForUpload(key: string, image: string) {
        let fileProperties: FileProperties;

        fileProperties = await this.writeToDisk(key, image)

        await this.uploadToS3(`${key}.${fileProperties.extension}`, fileProperties.content_type);

        return fileProperties;
    }

    /**
     * Function that uploads file to an s3 bucket
     * @param key: string
     * @param contentType: string
     *
     */
    async uploadToS3(key: string, contentType: string) {
        try {
            const fileStream = fs.createReadStream(`/tmp/${key}`);
            let params = {
                Bucket: this._UPLOAD_BUCKET,
                Key: key,
                ContentType: contentType,
                Body: fileStream
            };

            return await this._client.send(new PutObjectCommand(params));
        } catch (error) {
            console.log('the error that showed up');
            console.log(error);

            return error.toString();
        }
    }

    /**
     * Setup Signature so that a specific bucket and key are resized with the resized serverless app that is running along with the edits
     * being applied
     * @param key
     * @param edits
     */
    public resizeWithInS3(key: string, edits: EditProperties) {
        const imageRequest = JSON.stringify({
            bucket: "tomvisions-original-images",
            key: key,
            edits: edits
        })

        return `${Buffer.from(imageRequest).toString('base64')}`;
    }
}

export const s3Mapper = new S3Mapper();
