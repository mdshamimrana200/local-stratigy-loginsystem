const { default: mongoose } = require("mongoose");
const { config } = require("../config/config");

mongoose.connect(config.db.url)
.then(()=>console.log("db is connected"))
.catch((err)=>console.log(err))