const express = require('express');

const app = express();

const PORT = process.env.PORT || 6969;

app.get("/", (req, res)=>{
    res.send("Chow time!")
})

app.listen(PORT, ()=>{
    console.log(`Server up on port: ${PORT}...`);
})