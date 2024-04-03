require('dotenv').config()

exports.config = {
    app:{
        port: process.env.port
    },
    db:{
        url: process.env.URL_DB || "mongodb://127.0.0.1:27017/accountUser"
    }
}