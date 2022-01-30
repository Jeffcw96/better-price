export default class Exception extends Error{
    error:string
    message:string
    errorCode: string
    statusCode: number
    timeStamp: string

    constructor(error:any){
        super()
        this.error = error.title || 'Error'
        this.message = error.message
        this.errorCode = error.errorCode || '500'
        this.statusCode = error.statusCode || 500
        this.timeStamp = new Date().toISOString()
    }

    getStatusCode(){
        return this.statusCode
    }

    toJSON(){
        return{
            errorCode: this.errorCode,
            error: this.error,
            message:this.message
        }
    }

    getErrorDetail(){
        return{
            errorCode: this.errorCode,
            error: this.error,
            message:this.message,
            detail: this.stack
        }
    }
}