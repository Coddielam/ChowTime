const mongoose = require('mongoose');

const MenusSchema = mongoose.Schema({
    restaurant: String,
    address: String,
    courses: [
        {
            id: String,
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

const Menus = mongoose.model("restaurantsSchema", MenusSchema);

module.exports = Menus;