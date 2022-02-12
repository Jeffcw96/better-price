const baseUri = "https://www.lazada.com.my"
export default{
    baseUri,
    catalogUri:`${baseUri}/catalog/`,
    uriHeaders: {
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
}