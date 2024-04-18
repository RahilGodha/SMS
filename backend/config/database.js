const mongoose = require("mongoose");
// uU4y2iRck9NIhBLO

const connectDatabase = () => {
  mongoose
    .connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((data) => {
      console.log(`Mongodb is connected with server ${data.connection.host} `);
    });
};

module.exports = connectDatabase;




