
// var express = require('express');
// const { json } = require('express/lib/response');
// var router = express.Router();
var express = require('express');
var router = express.Router();
var fs = require("fs");

let ServerOrderArray = [];
let ServerOrderObject = function (pStoreId, pSalesPersonId, pCdId, pPricePaid, pDate){
  this.StoreID = pStoreId,
  this.SalesPersonID = pSalesPersonId,
  this.CdID = pCdId,
  this.PricePaid = pPricePaid,
  this.Date = pDate
}

// add mongoDb support
const mongoose = require("mongoose");
const OrderSchema = require("../orderSchema");

const connectionString = "mongodb+srv://iluvjuntae:iluvjuntae@haleynisit420.cj3rn.mongodb.net/500CDs?retryWrites=true&w=majority";

mongoose.set("useFindAndModify", false);

const options = {
  reconnectTries: Number.MAX_VALUE,
  poolSize: 10
}

mongoose.connect(connectionString, options).then(
  () => {
    console.log("Database connection established!");
  },
  err => {
    console.log("Error connecting Database instance due to: ", err);
  }
);

//=======================================================

/*INTERESTING QUEREY find the storeID w/ the most expensive cds between 10-15 dollars */


router.get('/getExpensiveCds', function(req, res) {

  //let which = "CdID";
  // OrderSchema.find({CdID,  PricePaid: { $gt: 10, $lt: 15} }).sort({ PricePaid: -1}
OrderSchema.aggregate([
{
  $match : {PricePaid : "13"}
},
{$group:{_id:"$StoreID", count:{$sum:1}}}
])
  .sort('-count')

  .exec(function(err, ExpensiveCds) {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }
    console.log(ExpensiveCds);
    res.status(200).json(ExpensiveCds);
  });
});


  

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('index.html');
});

router.get('/getAllOrders', function(request, response) {
  OrderSchema.find({}, (err, allOrders) => {
    if(err){
      console.log(err);
      response.status(500).send(err);
    }
    response.status(200).json(allOrders);
  });
});



/* Add 500 new Order to DB */
router.post('/Add500Order', function(req, res) {
  const newOrder = req.body;  // get the object from the req object sent from browser
  // write to db
  let newOrderToDb = new OrderSchema(newOrder);
  console.log(newOrder);
  newOrderToDb.save(function(err, result){
    if(err){
      res.status(500).send(err);
    } else {
      console.log(result);

      let response = {
        status: 200,
        success: "Added new order successfully."
      }
      res.end(JSON.stringify(response));
    }
  });
});

/* Add one new Order */
router.post('/AddOrder', function(req, res) {
  const newOrder = req.body;  // get the object from the req object sent from browser
  let newOrderObject = new ServerOrderObject(newOrder.StoreID, newOrder.SalesPersonID, newOrder.CdID, newOrder.PricePaid, newOrder.Date);
  console.log(newOrderObject, "new order object");
  ServerOrderArray.push(newOrderObject);  // add it to our "DB"  (array)
  console.log(`added 1 to server array ${ServerOrderArray.length}`);
  // prepare a reply to the browser
  let response = {
    status  : 200,
    success : 'Added Successfully'
  }
  res.end(JSON.stringify(response)); // send reply
});

module.exports = router;