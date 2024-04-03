const app = require("./app");
const { config } = require("./config/config");
const port = config.app.port
app.listen(port,()=>{
    console.log(`server is runngin at http://localhost:${port}`);
}) 