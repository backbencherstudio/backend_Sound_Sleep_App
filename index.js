const app = require("./app");
const dbConnection = require("./config/config");
const dev = require("./config/db");

const port = dev.app.port

app.listen(port, async() =>{
    console.log(`http://192.168.40.10:${port}`)
    await dbConnection()
})