require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");


//MY ROUTES
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");

//DB-Connections
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => {
    console.log("DB CONNECTED"); 
}).catch((err) => {
    console.log(`DB CONNECTION ERROR: ${err.message}`);
});

//Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//My ROUTES
app.use("/api", authRoutes); // I want users to visit api before visiting any page "/api/home"
app.use("/api",userRoutes);




//PORT
const port = process.env.PORT || 8000;


//Starting a Server
app.listen(port, () => {
    console.log(`app is running at ${port}`);
});
