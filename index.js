const axios = require('axios')
const convertToMS = 100
let time = randomIntFromInterval(4, 15)

const testData = `<script src="test">whoelseeeee "price":{"discount":"-78%","originalPrice":{"text":"RM50.00","value":50},"salePrice":{"text":"RM10.90","value":10.9}},"quantity":{"limit":{"max":19,"min":1},"text":"","type":"default"},wakakakakakakakk"price":{"discount":"-78%","originalPrice":{"text":"RM22","value":50},"salePrice":{"text":"RM22","value":10.9}},"quantity":{"limit":{"max":19,"min":1},"text":"","type":"default"}, fui yohhhh "price":{"discount":"-78%","originalPrice":{"text":"RM50.00","value":50},"salePrice":{"text":"RM10.90","value":10.9}},"quantity":{"limit":{"max":19,"min":1},"text":"","type":"default"},</script>`

function randomIntFromInterval(min, max) { // min and max included 
    return (Math.floor(Math.random() * (max - min + 1) + min)) * convertToMS
}
  
function isPriceInfo(data){
  return data.includes("salePrice") || data.includes("originalPrice")
}


    const testLazada = axios.get('https://www.lazada.com.my/products/pls-use-voucher-vanzo-car-gel-duo-series-refill-air-freshener-car-perfume-refresher-carall-regalia-waxco-i667282785-s11577541373.html?',{
        headers: {
            "Accept-Encoding": 'gzip, deflate, br',
            "Connection":'keep-alive',
            'User-Agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.99 Safari/537.36',
            'Content-Type':'application/json; charset=UTF-8',            
            'Accept':"text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
            'Origin': 'https://www.lazada.com.my',
            'Referer': 'https://www.lazada.com.my/',
            'cache-control':'max-age=0',
            'sec-ch-ua': `"Not;A Brand";v="99", "Google Chrome";v="97", "Chromium";v="97"`
          }
    })

    testLazada.then((result)=>{      
      const extractedResult = Object.values(result.data.match(/<script.*?>([\s\S]*?)<\/script>/gmi)).map((val)=>{
        let tempVal = val.replace(/<\/?script>/g,'');
        tempVal = tempVal.replace(/<script.*?>/g,'')
        return tempVal
      })    

      for(let i = 0; i < Object.keys(extractedResult).length; i++){        
        if(isPriceInfo(extractedResult[i])){
          const matchedPriceIndexes = findOccuranceIndexes(extractedResult[i],`"price":`)
          const matchedQuantityIndexes = findOccuranceIndexes(extractedResult[i],`,"quantity":`)

          console.log("matchedPriceIndexes",matchedPriceIndexes)
          console.log("matchedQuantityIndexes",matchedQuantityIndexes)
          const minLength = matchedPriceIndexes.length < matchedQuantityIndexes.length ? matchedPriceIndexes.length : matchedQuantityIndexes.length

          for(let j=0; j<minLength; j++){ 
            const data = extractedResult[i].slice(matchedPriceIndexes[j], matchedQuantityIndexes[j])
            const parsedJsonData = JSON.parse(`{${data}}`)
            console.log("data",parsedJsonData.price.salePrice.value)


          }

        }
      }

    })


function findOccuranceIndexes(string, parameter){
  let array = []
  const tuneBackValue = parameter.length
  function occuranceIndexs(string, parameter, array){
    const matchedIndex = string.indexOf(parameter)
    if(matchedIndex === -1){
      return
    }
    array.push(matchedIndex)    
    //if we only include matchedIndex but no tuneBackValue. It will caused max stack error as the matched Index will be always 0, need slice out the matched result after get their index
    string = string.slice(matchedIndex+tuneBackValue)     
    occuranceIndexs(string,parameter,array)
  }

  occuranceIndexs(string,parameter,array)


  //Mapping + sum indexes
  for(let i = 0; i < array.length; i++){
    if(i !==0){
      array[i] = array[i] + array[i-1] + tuneBackValue //add back the value so that it will remove/ deduct the additional/extra index we added earlier
    }
  }

  return array


}    






