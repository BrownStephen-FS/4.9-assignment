const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const router = require("./routes/router")
require("dotenv").config();

const app = express();
app.use(cors());

const PORT = process.env.PORT || 4000;
const mongoDBURL = process.env.mongoDBURL;

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});

app.use(express.json());
app.use("/api/v1/cars", router);

mongoose.connect(mongoDBURL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", (err) => console.error(err));
db.once("open", () => console.log("Database Connection Established"));