/**
 * @param {Request} request object
 * @description return object with concated req.body, req.param and req.query
 */

import { Request } from "express";
import { Query, Params } from 'express-serve-static-core';

export interface TypedRequestQuery<T extends Query> extends Express.Request {
    query: T
}

export interface TypedRequestBody<T> extends Express.Request {
    body: T
}

export interface TypedRequest< T extends Query,U> extends Request {
    body: U,
    query: T,
}


export default (req:Request) =>{
    let body = req.body || {}
    let params = req.params || {}
    let query = req.query || {}

    return Object.assign({}, {body: body}, params,query)
}


