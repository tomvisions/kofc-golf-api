import expressRouter from 'express';

const mediaRouter = expressRouter.Router();

import {GalleryController} from "../controllers/gallery.controller";
import { ImageController } from '../controllers/image.controller';
import { TagController } from '../controllers/tag.controller';

mediaRouter.get("/id/:id", GalleryController.apiGetGalleryById);
mediaRouter.put("/id/:id", GalleryController.apiUpdateGalleryById);


mediaRouter.get("/id/:id/image/:pageIndex?/:pageSize?/:sort?/:order?", ImageController.apiGetAllImagesByGallery);
mediaRouter.get("/primary/:code?", ImageController.apiGetAllPrimaryImages);

mediaRouter.post("/page-index/:pageIndex/page-size/:pageSize?/:sort?/:order?", GalleryController.apiGetAllGalleries);
mediaRouter.post("/image/page-index/:pageIndex/page-size/:pageSize/:sort?/:order?", ImageController.apiGetAllImages);
mediaRouter.get("/image/id/:id", ImageController.apiGetImage);
mediaRouter.put("/image/id/:id", ImageController.apiUpdateImage);
mediaRouter.delete("/image/id/:id", ImageController.apiDeleteImage);


mediaRouter.post("/tag/page-index/:pageIndex/page-size/:pageSize/:sort?/:query?", TagController.apiGetAllTags);
mediaRouter.post("/tag/list", TagController.apiGetAllTagsAsLabelValues);

mediaRouter.post("/tag/new", TagController.apiCreateTag);


export { mediaRouter };
