const mongoose = require("mongoose");

// const serverURI = "mongodb://CPLMain:CPLQAZX@172.31.21.192:23047/CPL_MainDB";
const serverURI = "mongodb://127.0.0.1:27017/CPL_MainDB";

class DBConnection {
  constructor() {
    this._connect();
  }
  _connect() {
    mongoose
      .connect(serverURI, {
        keepAlive: 1,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("Database connection successful11");
      })
      .catch((err) => {
        console.error("Database connection error");
        console.log(err);
      });
  }
}

module.exports = new DBConnection();
