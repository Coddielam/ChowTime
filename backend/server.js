const express = require('express');
const connectDB = require("./config/db");
const cors = require('cors');

// var menuRouter = require('./database/models/menu');

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST", "PUT"]
    }
});

// connect db
connectDB();

app.use(express.json());
app.use(cors());

// routes
app.get("/", (req, res)=>{
    res.send("Chow time!")
});


const PORT = process.env.PORT || 6969;

http.listen(PORT, ()=>{
    console.log(`Server up on port: ${PORT}...`);
})


// Leon
// io.on('connection', function(socket){
//     console.log('a user connected')
//     socket.on('message', function(msg){
//         console.log('emit: ', msg);
//         io.emit('message', msg)
//     })
// })

const config = require('config');
let MongoClient = require('mongodb').MongoClient;
MongoClient.connect(config.get('mongoURI'), {
    useUnifiedTopology: true,
}, (err, client) => {
    if (err) return console.error(err)
    console.log('Connected to Database');
    const db = client.db('ChowTime');


    app.get("/menu", (req, res)=>{
        db.collection('restaurantsschemas').find().toArray()
          .then(results => {
            res.send(results);
          })
          .catch(error => console.error(error))
    });

    app.put('/menu', (req, res) => {
        console.log('put fired');
        db.collection('restaurantsschemas').findOneAndUpdate(
            {menu: "1"},
            {
                $set: {
                    restaurant: req.body.restaurant
                }
            }
        ).then(result => {
            io.emit('message', 'menu updated');
            console.log('menu updated');
        })
        .catch(err => console.log(err));
    });

    app.post('/postTest', (req, res) => {
        console.log(req.body);
        db.collection('restaurantsschemas').insertOne(req.body)
            .then(result => console.log(result))
            .catch(error => console.error(error));
    });
})

