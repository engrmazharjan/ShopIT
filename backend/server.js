const app = require("./app");
const connectDB = require("./config/database");
const dotenv = require("dotenv");

// Setting Up Config File
dotenv.config({ path: "backend/config/.env" });

// Connecting To DB
connectDB();
app.listen(process.env.PORT, () => {
  console.log(
    `Server Started On PORT:${process.env.PORT} in ${process.env.NODE_ENV} mode`
  );
});
