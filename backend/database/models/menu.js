const mongoose = require('mongoose');

const RestaurantsSchema = mongoose.Schema({
    restaurant: String,
    address: String,
    courses: [
        {
            id: mongoose.Schema.Types.ObjectId,
            name: String,
            price: Number,
        }
    ],
    additional_charges: {
        special_drinks: Number,
        cold: Number,
        takeout_related: Number, 
    },
    discount: Number,
})

const RestaurantsSchema = mongoose.model("restaurantsSchema", RestaurantsSchema);