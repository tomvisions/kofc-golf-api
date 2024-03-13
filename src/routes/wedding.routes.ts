import expressRouter from 'express';

const weddingRouter = expressRouter.Router();

import {GalleryController} from "../controllers/gallery.controller";
import { ImageController } from '../controllers/image.controller';
import { TagController } from '../controllers/tag.controller';
import {WeddingController} from "../controllers/wedding.controller";

weddingRouter.get("/", WeddingController.getImages);

export { weddingRouter };
