const mongoose = require('mongoose');
const config = require('config');
const dbURI = config.get('mongoURI');

const connectDB = async () => {
    try {
        await mongoose.connect(dbURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log("Database connected...")
    } catch (error) {
        console.error(error);
        process.exit();
    }
}

module.exports = connectDB;