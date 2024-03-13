import { imageMapper, paramsOptions } from "../mapper";

export class ImageController {
    /**
       * Calling all galleries
       * @param req
       * @param res
       * @param next
       */

    public static async apiDeleteImage(req: any, res: any, next: any) {
        try {
            //        if (!galleryMapper.checkAuthenication(req.headers.authorization)) {
            //        return res.status(500).json({error: 'Not Authorized to access the API'})
            //      }  
            let id;
            if (req.params.id) {
                id = req.params.id
            }

            const images = await imageMapper.deleteImageById(id);

            
            if (typeof images === 'string') {
                return res.status(500).json({ errors_string: images })
            }

            //            const paginationResults = galleryMapper.prepareListResults(images, req.query);

            return res.status(200).json(images);

        } catch (error) {
            res.status(500).json({ error_main: error.toString() })
        }
    }
    public static async apiGetImage(req: any, res: any, next: any) {
        try {
            //        if (!galleryMapper.checkAuthenication(req.headers.authorization)) {
            //        return res.status(500).json({error: 'Not Authorized to access the API'})
            //      }  
            let id;
            if (req.params.id) {
                id = req.params.id
            }

            const images = await imageMapper.getImageById(id);

            if (typeof images === 'string') {
                return res.status(500).json({ errors_string: images })
            }

            //            const paginationResults = galleryMapper.prepareListResults(images, req.query);

            return res.status(200).json(images);

        } catch (error) {
            res.status(500).json({ error_main: error.toString() })
        }
    }

    /**
       * Calling all galleries
       * @param req
       * @param res
       * @param next
       */
    public static async apiUpdateImage(req: any, res: any, next: any) {
        try {
            //        if (!galleryMapper.checkAuthenication(req.headers.authorization)) {
            //        return res.status(500).json({error: 'Not Authorized to access the API'})
            //      }  

            let id;
            if (req.params.id) {
                id = req.params.id
            }

            const images = await imageMapper.updateImageById(id, req.body);

            if (typeof images === 'string') {
                return res.status(500).json({ errors_string: images })
            }

            return res.status(200).json(images);

        } catch (error) {
            res.status(500).json({ error_main: error.toString() })
        }

    }

    /**
     * Calling all galleries
     * @param req
     * @param res
     * @param next
     */
    public static async apiGetAllImages(req: any, res: any, next: any) {
        try {
            console.log('inside')
            //        if (!galleryMapper.checkAuthenication(req.headers.authorization)) {
            //        return res.status(500).json({error: 'Not Authorized to access the API'})
            //      }  

            const options: paramsOptions = { pageIndex: 1, pageSize: 10, filterQuery: "", sort: imageMapper.DEFAULT_SORT, order: imageMapper.DEFAULT_ORDER };
                
            Object.entries(req.params).map(([key, value]) => {
                if (value !== 'undefined') {
                    if (isNaN(Number(value))) {
                        options[key] = value;
                    } else {
                        options[key] = Number(value);
                    }
                }
            })

            const images = await imageMapper.getAllImages(options);

            if (typeof images === 'string') {
                return res.status(500).json({ errors_string: images })
            }


            console.log('the list');
            console.log(images);

            options.listLength = await imageMapper.getListLength();
            const paginationResults = imageMapper.prepareListResults(images, options);

            return res.status(200).json(paginationResults);

        } catch (error) {
            res.status(500).json({ error_main: error.toString() })
        }

    }

    /**
   * Calling all galleries
   * @param req
   * @param res
   * @param next
   */
    public static async apiGetAllPrimaryImages(req: any, res: any, next: any) {
        try {
            //        if (!galleryMapper.checkAuthenication(req.headers.authorization)) {
            //        return res.status(500).json({error: 'Not Authorized to access the API'})
            //      }
            const options: paramsOptions = { code: null };
            if (req.params.code) {
                options.code = req.params.code;
            }

            const images = await imageMapper.getAllPrimaryImages(options);

            if (typeof images === 'string') {
                return res.status(500).json({ errors_string: images })
            }

            //   const paginationResults = imageMapper.prepareListResults(galleries, req.query);

            return res.status(200).json({ "images": images });

        } catch (error) {
            res.status(500).json({ error_main: error.toString() })
        }

    }

    /**
  * Calling all galleries
  * @param req
  * @param res
  * @param next
  */
    public static async apiGetAllImagesByGallery(req: any, res: any, next: any) {
        try {
            //        if (!galleryMapper.checkAuthenication(req.headers.authorization)) {
            //        return res.status(500).json({error: 'Not Authorized to access the API'})
            //      }


            const options: paramsOptions = { id: "string", pageIndex: 1, pageSize: 20, filterQuery: "" };


            if (req.params.id) {
                options.id = req.params.id;
            }

            if (req.params.pageIndex) {
                options.pageIndex = Number(req.params.pageIndex);
            }

            if (req.params.pageSize) {
                options.pageSize = Number(req.params.pageSize);
            }

            if (req.params.filterQuery) {
                options.filterQuery = req.params.filterQuery;
            }


            const images = await imageMapper.getImagesByGallery(options);
            console.log('the images')
            
            console.log(images);
            if (typeof images === 'string') {
                return res.status(500).json({ errors_string: images })
            }


            options.listLength = await imageMapper.getListLength(options);
            const paginationResults = imageMapper.prepareListResults(images, options);
       //     const paginationResults = imageMapper.prepareListResults(galleries, req.query);

            return res.status(200).json(paginationResults);

        } catch (error) {
            res.status(500).json({ error_main: error.toString() })
        }
    }

}