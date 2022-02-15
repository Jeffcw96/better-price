import {Response} from 'express'
import { TypedRequestQuery } from '@/utils/requestHandler';
import responseHandler from '@/utils/responseHandler';
import shopee from "@/application/shopee";
import lazada from '@/application/lazada';
import processor from '@/application/processor';




export default async function getProductList(req:TypedRequestQuery<{ q: string}>, res:Response){
    // const inputData = requestHandler(req)
    const [shopeeResult, lazadaResult] = await Promise.all([shopee.getProduct(req),lazada.getProduct(req)])
    processor({shopee:shopeeResult, lazada:lazadaResult})
    responseHandler(res,{shopee:shopeeResult, lazada:lazadaResult})
}

