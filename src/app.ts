import cors from "cors";
import express, { Request, Response } from "express";
import path from "path";
import compression from "compression";
import { getCurrentInvoke } from "@vendia/serverless-express";
const ejs = require("ejs").__express;
const app = express();
const router = express.Router();
import {mailRouter, mediaRouter, userRouter, weddingRouter} from './routes';


const fileUpload = require('express-fileupload');
import bodyparser from 'body-parser';


app.use(express.static("/tmp"));
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json({limit: '50mb'}));
app.use(cors());
app.use(compression());

app.use(async (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Accept-Encoding, Content-Length")
 // res.header("Access-Control-Allow-Headers", "*")
  res.header('Access-Control-Allow-Methods', '*');

  next()
});

app.use("/api/v1/mail", mailRouter);
app.use("/api/v1/media", mediaRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/wedding", weddingRouter);


app.use("/", express);
export { app };
