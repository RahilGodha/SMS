const mongoose = require("mongoose");
// uU4y2iRck9NIhBLO
// DB_URI = mongodb+srv://stokify:stokify123@cluster0.9a6w9vq.mongodb.net/Stokify?retryWrites=true&w=majority

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




