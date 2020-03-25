const path = require("path");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
// ENV
dotenv.config({ path: "./config/config.env" });

// connect DB
connectDB();
const app = express();

// Body Parser
app.use(express.json());

// Enable Cors
app.use(cors());

// static
app.use(express.static(path.join(__dirname, "public")));

// routes
app.use("/api/v1/stores", require("./routes/stores"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`server running ${process.env.NODE_ENv} mode on port ${PORT}`)
);
