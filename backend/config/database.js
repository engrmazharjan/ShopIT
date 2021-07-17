const mongoose = require("mongoose");

const connectDB = () => {
  mongoose
    .connect(process.env.DB_LOCAL_URI, {
      useCreateIndex: true,
      useFindAndModify: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((con) => {
      console.log(`MongoDB Connected with HOST: ${con.connection.host}`);
    });
};
module.exports = connectDB;
