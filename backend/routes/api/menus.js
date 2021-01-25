const express = require('express');
const router = express.Router();
const Menus = require("../../database/models/Menu");
const {check, validationResult} = require("express-validator");

/**
 * @route POST api/menus
 * @desc create a menu
 * @access public
 */ 
router.post("/", 
[
    check("menu", "Restaurant id missing" ).not().isEmpty(),
    check("restaurant", "Must provide a restaurant name" ).not().isEmpty(),
    check("address", "Must provide an address" ).not().isEmpty(),
    check("courses", "Must include at least 1 course").not().isEmpty(),
    check("courses","Submitted data for the restaurant's courses should be an array").isArray(),
    check("courses", "Must include at least one course").isLength({min:1}),
], 
async (req, res)=>{
    const validationErrors = validationResult(req);
    if(!validationErrors.isEmpty()) {
        return res.status(400).json({errors: validationErrors.array()});
    }
    try {
        const {menu, restaurant, address, courses, additional_charges, discount} = req.body;

        let foundMenu = await Menus.findOne({menu: menu});
        if (foundMenu) {
            return res.status(400).json({
                msg: "Menu already exist!"
            })
        }
        // check menu item data format
        let courseDataErrorMsg = [];
        courses.forEach((item, index)=>{
            let errorMsg = {};
            let {id, name, price} = item;
            if (!id) errorMsg.idError = `Course ${index} id missing`;
            if (!name) errorMsg.nameError = `Course ${index} name missing`;
            if (!price) errorMsg.priceError = `Course ${index} price missing`;
            if (Object.keys(errorMsg).length > 0) courseDataErrorMsg.push(errorMsg);
        })

        if (courseDataErrorMsg.length > 0) {
            return res.status(400).json(courseDataErrorMsg);
        }

        // no errors collected and record new document
        let Menu = new Menus({
            menu: menu,
            restaurant: restaurant,
            address: address,
            courses: courses,
            additional_charges: additional_charges,
            discount: discount,            
        });
        await Menu.save();
        res.status(200).json({
            msg: "Menu successfully created",
        })
        return console.log("Menu successfully added!")

    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
})

// ****************************************************

/**
 * @route GET api/menus 
 * @desc return all menus
 * @access public
 */ 
router.get("/", async (req, res) => {
    try {
        const menus = await Menus.find({});
        res.status(200).json(menus);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
})

// ****************************************************

/**
 * @route GET api/menus:menuId
 * @desc return all menus
 * @access public
 */ 

// ****************************************************

module.exports = router;