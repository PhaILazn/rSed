const express = require('express');
const User = require('../models/user');
const Address = require('../models/address');
const Menu = require('../models/menu');
const MenuItem = require('../models/menuitem');
const Order = require('../models/order');
const Preference = require('../models/preference');
const Restaurant = require('../models/restaurant');
const Review = require('../models/review');
const Cart = require('../models/shoppingcart');

const router = express.Router();
const ShoppingCart = require('../models/shoppingcart');

router.get('/', isLoggedIn, function(req, res) {
    Cart.findById(req.user.shoppingCart)
    .populate({
        path: 'items',
    })
    .exec(function(err, foundCart) {
        if(err) {
            res.redirect('/');
        }
        console.log(foundCart);
        res.render('shoppingcart', {currentOrder: foundCart});
    });
});

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect("/signin");
}

module.exports = router;