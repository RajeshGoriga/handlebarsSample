var express = require("express");
var expHBS = require("express-handlebars");
var helpers = require("handlebars-helpers")();
const handlebarHelpers = require('./helpers/handlebars');

const app = express();
const fs = require("fs");
const hbs = expHBS.create({ helpers: handlebarHelpers });

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.set("views", "./views");

const productAttribute = function (productAttributes, attributeName) {
    var productAttr = productAttributes.find(
        (attr) => attr.name === attributeName
    );
    return productAttr ? productAttr.value.label : "";
};

let rawOrder = fs.readFileSync("./data/order.json");
let order = JSON.parse(rawOrder);

let rawShipping = fs.readFileSync("./data/shipping.json");  
let shipping= JSON.parse(rawShipping);

app.get("/shipping", (req, res) => {
    // console.log('handlebars',handlebars)
    res.render("shipping",shipping)

})

app.get("/", (req, res) => {
    res.render("orderconfirmation",order)

})

// app.get("/", (req, res) => {
//     let hbOrder = {
//         shipping: [],
//     };
//     order.shipping.forEach((shipping) => {
//         let ship = {};
//         ship.shippingAddress = shipping.shippingAddress;
//         ship.billingAddress =order.billingAddress;
//         ship.customerPhoneNumber = order.custom.fields.customerPhoneNumber;
//         ship.lineItems = order.lineItems
//             .filter((item) =>
//                 item.shippingDetails.targets.some(
//                     (target) => target.shippingMethodKey === shipping.shippingKey
//                 )
//             ).map((item) => {
//                 return {
//                     productName: item.name["en-US"],
//                     unitPrice : item.price.value.centAmount/100,
//                     tinColor : productAttribute(item.variant.attributes, 'tin_color'),
//                     flavor : productAttribute(item.variant.attributes, 'cookie_flavor'),
//                     quantity: item.shippingDetails.targets.find(
//                                     (target) => target.shippingMethodKey === shipping.shippingKey).quantity,
//                 };
//             });
//         hbOrder.shipping.push(ship);
//         hbOrder.orderNumber = order.orderNumber;
//     });
//     console.log(JSON.stringify(hbOrder));
//     res.render("home1", hbOrder);
// });

app.listen(3002);
