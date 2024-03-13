import {S3Client, PutObjectCommand} from "@aws-sdk/client-s3";
import fs from "fs";


const options = {
    version:"latest",
    region: "us-east-1"
}

const client = new S3Client(options);

const fileStream = fs.createReadStream('../../../Documents/twitter-logo.png');
let params = {Bucket: 'tomvisions', Key: `original-images/mamboleofc/avatars/test.png`, ContentEncoding: "7bit", ContentType: "image/png", Body: fileStream};
client.send(new PutObjectCommand(params));
