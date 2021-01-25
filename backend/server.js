const express = require('express');
const connectDB = require("./config/db");

const app = express();

/* connect db */
connectDB();

/* body parser */
app.use(express.json());

/* routes */ 
app.use("/api/menus", require("./routes/api/menus"));

const PORT = process.env.PORT || 6969;

app.listen(PORT, ()=>{
    console.log(`Server up on port: ${PORT}...`);
})