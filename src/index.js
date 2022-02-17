// External Imports
const express = require("express");
const cors = require("cors");
const { connect } = require("mongoose");
const { success, error } = require("consola");

// Internal Imports
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const { MDB, PORT } = require("./config");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

// Initialize the Application
const app = express();

// Request Parsers
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routing Setup
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

// Default Error Handler
app.use(notFound);
app.use(errorHandler);

// Connection With Database
const startApp = async () => {
  try {
    await connect(MDB, {
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    success({
      message: "Successfully connected with the Database",
      badge: true,
    });
    // Start Listening for the server on PORT
    app.listen(PORT, () => {
      success({ message: `Server started on Port ${PORT}`, badge: true });
    });
  } catch (err) {
    error({
      message: `Unable to connect with Database \n${err}`,
      badge: true,
    });
  }
};
startApp();
