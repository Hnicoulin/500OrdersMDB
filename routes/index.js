
var express = require('express');
const { json } = require('express/lib/response');
var router = express.Router();


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

const connectionString = "mongodb+srv://jsablaon:jsablaon@josablao-cluster-0.pl1cg.mongodb.net/OrdersDB?retryWrites=true&w=majority";

mongoose.set("useFindAndModify", false);

const options = {
  reconnectTries: Number.MAX_VALUE,
  poolSize: 10
}

mongoose.connect(connectionString, options).then(
  () => {
    console.log("DB CONNECTION SUCCESSFUL!");
  },
  err => {
    console.log("CONNECTION FAILED!!!!");
  }
);

//=======================================================

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