export function failToGetLazadaProductList(){
    return{
        title:'Fail to get Lazada Product List',
        message:'Fail to get Lazada Product List',
        errorCode: "LAZADA_ERROR_001"
    }
}
export function maxProductQueryError(){
    return{
        title:'Maximum Lazada product query error',
        message:'Lazada product list api error. Please wait and try again',
        errorCode: "LAZADA_ERROR_002"
    }
}
export function maxProductBrandQueryError(){
    return{
        title:'Maximum Lazada product brand query error',
        message:'Lazada product brand list api error. Please wait and try again',
        errorCode: "LAZADA_ERROR_003"
    }
}