import createServer from "./server";
import test from '@/test/test'
import shopee from '@/utils/shopee'
require('dotenv').config()

const app = createServer()
const port = process.env.PORT ||16789;
app.listen(port, ()=>{
    console.log(`App is running in port ${port}`)
    console.log(test())
    console.log(shopee.api())
})
