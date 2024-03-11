const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const env = require('dotenv');
const app = express();

//routes
const adminRoutes = require('./routes/admin/auth');
const categoryRoutes= require("./routes/category");
const articleRoutes= require("./routes/article");
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
// const initialDataRoutes = require('./routes/admin/initialData');


//environment variable or you can say  constants
env.config();


//mongoose connect
mongoose.connect(`mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.kmenthp.mongodb.net/?retryWrites=true&w=majority`
).then(() => {
    console.log("data connected")
})

app.use(cors());
app.use("/public", express.static(path.join(__dirname, 'uploads')));
app.use(express.json());

app.use("/api",authRoutes);
app.use("/api",adminRoutes);
app.use("/api",categoryRoutes);
app.use("/api",articleRoutes);
app.use("/api",userRoutes);
// app.use("/api",initialDataRoutes);

app.listen(process.env.PORT, () => {
    console.log(`server is running on port ${process.env.PORT}`);
})