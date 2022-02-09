const axios = require('axios')
const convertToMS = 100
let time = randomIntFromInterval(4, 15)


function randomIntFromInterval(min, max) { // min and max included 
    return (Math.floor(Math.random() * (max - min + 1) + min)) * convertToMS
}
  


let getLazadaInfo = setInterval(async()=>{
    let time = randomIntFromInterval(4, 15)
    const testLazada = await axios.get('https://www.lazada.com.my/catalog/?q=vanzo+car+perfume&_keyori=ss&from=input&ajax=true',{
        headers: {
            "Accept-Encoding": 'gzip, deflate, br',
            "Connection":'keep-alive',
            'User-Agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.99 Safari/537.36',
            'Content-Type':'application/json; charset=UTF-8',
            // 'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,/;q=0.8',
            'Accept':"text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
            'Origin': 'https://www.lazada.com.my',
            'Referer': 'https://www.lazada.com.my/',
            'cache-control':'max-age=0',
            'sec-ch-ua': `"Not;A Brand";v="99", "Google Chrome";v="97", "Chromium";v="97"`
          }
    })

    console.log(`!testLazada.data.hasOwnProperty('rgv587_flag')`, !testLazada.data.hasOwnProperty('rgv587_flag'))
    
    if(!testLazada.data.hasOwnProperty('rgv587_flag')){
      console.log("time to clear babe")
      clearInterval(getLazadaInfo)
    }



}, time)




