const app = require("./app");
const connectDB = require("./config/database");
const dotenv = require("dotenv");

// Setting Up Config File
dotenv.config({ path: "backend/config/.env" });

// Connecting To DB
connectDB();
const server = app.listen(process.env.PORT, () => {
  console.log(
    `Server Started On PORT:${process.env.PORT} in ${process.env.NODE_ENV} mode`
  );
});

// Handle Unhandled Promise Rejections
process.on("unhandledRejection", (err) => {
  console.log(`ERROR: ${err.message}`);
  console.log(`Shutting Down The Server Due To Unhandled Promise Rejection`);
  server.close(() => {
    process.exit(1);
  });
});
