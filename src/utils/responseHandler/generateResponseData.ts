import Exception from "./exception"

const SUCCESS_STATUS:number = 200
const FAIL_STATUS:number = 500

export default function generateResponseData(result:any){
    let responseStatusCode = SUCCESS_STATUS
    let responseData = "" || {}

    if(result instanceof Exception){
        // if it's a Exception (formatted error)

        responseStatusCode = result.getStatusCode()
        responseData = result.toJSON()

    }else if (result instanceof Error){
        // if it's normal error such as human error

        responseStatusCode = FAIL_STATUS
        responseData = {
            error:result.name,
            message: result.message
        }

    }else if (result == null){
        responseStatusCode = SUCCESS_STATUS
        
    }else{
        // good response
        responseStatusCode = SUCCESS_STATUS
        if(result instanceof Object || result instanceof String){
            responseData = result
        }else{           
            responseData = result.toString()
        }

    }

    return{
        responseStatusCode,
        responseData
    }
}