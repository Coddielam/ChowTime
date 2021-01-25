const express = require('express');
const connectDB = require("./config/db");

const app = express();

// connect db
connectDB();

app.use(express.json());

// routes
app.get("/", (req, res)=>{
    res.send("Chow time!")
})

const PORT = process.env.PORT || 6969;

app.listen(PORT, ()=>{
    console.log(`Server up on port: ${PORT}...`);
})