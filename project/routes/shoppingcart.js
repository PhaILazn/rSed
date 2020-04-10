const express = require('express');
const User = require('../models/user');
const Address = require('../models/address');
const Menu = require('../models/menu');
const MenuItem = require('../models/menuitem');
const Order = require('../models/order');
const Preference = require('../models/preference');
const Restaurant = require('../models/restaurant');
const Review = require('../models/review');
const Cart = require('../models/cart');

const router = express.Router();

router.get('/', function(req, res) {
    var menuItems = req.params.menuItem;
    console.log(req.params.menuItems);
    console.log(menuItems);
    var jsonMenuItems = {"menuItem":[]};
    menuItems.forEach(menuItem => {
        MenuItem.findById(menuItem._id).populate('restaurant').exec(function(err, foundMItem) {
            if(err) {
                console.log(err);
            }
            else {
                jsonMenuItems['menuItem'].push(menuItem);
            }
        });
    });
    console.log(jsonMenuItems);
    res.render('shoppingcart', jsonMenuItems); 
});

router.get('/add/:id', isLoggedIn, function(req, res) {
    var menuItemId = req.menuItemId;
    var cart = new Cart(req.session.cart? req.session.cart : {});
    MenuItem.findById(menuItemId, function(err, menuItem) {
        if(err) {
            return res.redirect('/');
        }
        cart.add(product, product.id);
        req.session.cart = cart;
        res.redirect('/');
    });
});

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect("/signin");
}

module.exports = router;