import {imageMapper, paramsOptions, tagMapper} from "../mapper";
import {weddingMapper} from "../mapper/wedding.mapper";

export class WeddingController {
    /**
     * Calling all galleries
     * @param req
     * @param res
     * @param next
     */
    public static async getImages(req: any, res: any, next: any) {
        try {
            //        if (!galleryMapper.checkAuthenication(req.headers.authorization)) {
            //        return res.status(500).json({error: 'Not Authorized to access the API'})
            //      }


            const options: paramsOptions = {
                pageIndex: 1,
                pageSize: 100,
                filterQuery: "",
                sort: imageMapper.DEFAULT_SORT,
                order: imageMapper.DEFAULT_ORDER
            };


            const wedding = await weddingMapper.getAllImages(options);

            if (typeof wedding === 'string') {
                return res.status(500).json({errors_string: wedding})
            }

            return res.status(200).json(wedding);


        } catch (error) {
            res.status(500).json({error_main: error.toString()})
        }
    }
}