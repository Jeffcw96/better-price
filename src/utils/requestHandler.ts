/**
 * @param {Request} request object
 * @description return object with concated req.body, req.param and req.query
 */

import { Request } from "express";

interface BodyInput<T>{
    body: T
}

export type RequestInputInterface<T> = BodyInput<T> & {
    [k:string]: any
}

export default (req:Request) =>{
    let body = req.body || {}
    let params = req.params || {}
    let query = req.query || {}

    return Object.assign({}, {body: body}, params,query)
}


