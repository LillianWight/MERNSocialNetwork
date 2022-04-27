const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const dotenv = require("dotenv");
dotenv.config();

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
  })
  .then(() => console.log("DB Connected! 👍"));

mongoose.connection.on("error", (err) => {
  console.log(`DB connection error: ${err.message}`);
});

//ROUTES
const postRoutes = require("./routes/post");

//MIDDLEWARE
app.use(express.json());
app.use(morgan("dev"));
app.use("/", postRoutes);

//START SERVER
const port = process.env.PORT || 5309;
app.listen(port, () => {
  console.log(`A Node.js API is listening on port ${port}`);
});
