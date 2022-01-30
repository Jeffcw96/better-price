import createServer from "./server";
require('dotenv').config()

const app = createServer()
const port = process.env.PORT ||16789;
app.listen(port, ()=>{
    console.log(`App is running in port ${port}`)
})
