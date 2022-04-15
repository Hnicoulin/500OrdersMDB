// key value pairs for stores and employees
let storeEmployeeObjects = {
    98053: [1, 2, 3, 4],
    98007: [5, 6, 7, 8],
    98077: [9, 10, 11, 12],
    98055: [13, 14, 15, 16],
    98011: [17, 18, 19, 20],
    98046: [21, 22, 23, 24]
};

let keys = Object.keys(storeEmployeeObjects);
let randomStoreNumber = keys[keys.length * Math.random() << 0]
let randomEmployeeId = storeEmployeeObjects[randomStoreNumber].length * Math.random() << 0;

// define a constructor to create order objects
let OrderObject = function (pStoreId, pSalesPersonId, pCdId, pPricePaid, pDate) {
    this.StoreID = pStoreId;
    this.SalesPersonID = pSalesPersonId;
    this.CdID = pCdId;
    this.PricePaid = pPricePaid;
    this.Time = pDate;
}


let initialDateTime = Date.now();
let newOrder;
let CdIDs = [123456, 123654, 321456, 321654, 654123, 654321, 543216, 354126, 621453, 623451];

function getRandomCd() {
    let randomIndex = getRandomIntInclusive(0, CdIDs.length - 1);
    return CdIDs[randomIndex];
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}


function generateRandomOrder() {
    keys = Object.keys(storeEmployeeObjects);
    randomStoreNumber = keys[keys.length * Math.random() << 0];
    randomEmployeeId = storeEmployeeObjects[randomStoreNumber].length * Math.random() << 0;

    newOrder = new OrderObject(randomStoreNumber, storeEmployeeObjects[randomStoreNumber][randomEmployeeId], getRandomCd(), getRandomIntInclusive(5, 15), initialDateTime);
    initialDateTime = initialDateTime + getRandomIntInclusive(5000, 30000);
}

function createDisplay() {
    generateRandomOrder();
    let divOrderList = document.getElementById("divOrderList");
    divOrderList.innerHTML = `StoreID = ${newOrder.StoreID} <br>
                                SalesPersonID = ${newOrder.SalesPersonID} <br>
                                CdID = ${newOrder.CdID} <br>
                                PricePaid = ${newOrder.PricePaid} <br>
                                Date = ${newOrder.Date} <br>`
}

function addOneToServer(isOneOrder = true) {
    createOne();

    if (isOneOrder) {
        console.log("adding a single order")
        fetch('/AddOrder', {
            method: "POST",
            body: JSON.stringify(newOrder),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        })
            .then(response => response.json())
            .then(json => console.log(json)
            )
            .catch(err => console.log(err));
    } else {
        console.log("adding 500 orders")
        fetch('/Add500Order', {
            method: "POST",
            body: JSON.stringify(newOrder),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        })
            .then(response => response.json())
            .then(json => console.log(json)
            )
            .catch(err => console.log(err));
    }
}

function add500ToServer() {
    for (let i = 0; i < 500; i++) {
        addOneToServer(false);
    }
}

document.addEventListener("DOMContentLoaded", function () {

    document.getElementById("buttonCreate").addEventListener("click", function () {
        createOne();
    });

    document.getElementById("buttonAddOne").addEventListener("click", function () {
        addOneToServer();
    });

    document.getElementById("buttonAdd500").addEventListener("click", function () {
        add500ToServer();
    })
});
// end of wait until document has loaded event  *************************************************************************

let timeElapsed = Date.now();
function GetTimeString(rt) {
    timeElapsed += rt;
    let rightNow = new Date(timeElapsed);
    console.log(rightNow, "rightnow");
    return rightNow.toISOString();
}

function hourSM(seconds) {

    var numhours = Math.floor(((seconds % 31536000) % 86400) / 3600);
    var numminutes = Math.floor((((seconds % 31536000) % 86400) % 3600) / 60);
    var numseconds = (((seconds % 31536000) % 86400) % 3600) % 60;
    var numillsec = Math.floor((((seconds % 31536000) % 86400) % 3600) / 7.74597);
    return " hh " + numhours + " mm " + numminutes + " ss " + numseconds + " ms " + numillsec;

}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

const storeID = [98053, 98007, 98077, 98055, 98011, 98046];
const cdID = [123456, 123654, 321456, 321654, 654123,
    654321, 543216, 354126, 621453, 623451];

function modifiedCreateOne(min, max, randomStore){
    const randomSPID = randomInt(min, max);
    var rcd = randomInt(0, 9);
    //getting a random index
    var randomCD = cdID[rcd];
    const randomPrice = randomInt(5, 15);
    var rt = randomInt(1800000, 1800000 * 2); // 1800000 == 30min
    let randomDate = GetTimeString(rt);
    newOrder = new OrderObject(randomStore, randomSPID, randomCD, randomPrice, randomDate);
    let divOrderList = document.getElementById("divOrderList");
    divOrderList.innerHTML = `StoreID = ${randomStore} <br> 
    SalesPersonID = ${randomSPID} <br> 
    CdID = ${randomCD} <br> 
    PricePaid = ${randomPrice} <br> 
    Date = ${randomDate} <br>`
} 

function createOne() {

    // const storeID = [98053, 98007, 98077, 98055, 98011, 98046];
    // const cdID = [123456, 123654, 321456, 321654, 654123,
    //     654321, 543216, 354126, 621453, 623451];
    let rds = randomInt(0, 5);
    var randomStore = storeID[rds];

    // let oldDateObj = Date.now();
    // var newDateObj = new Date(oldDateObj.getTime() + diff*60000);

    if (randomStore === 98053) {

        modifiedCreateOne(1,4,randomStore);

        // const randomSPID = randomInt(1, 4);
        // var rcd = randomInt(0, 9);
        // //getting a random index
        // var randomCD = cdID[rcd];
        // const randomPrice = randomInt(5, 15);
        // var rt = randomInt(1800000, 1800000 * 2); // 1800000 == 30min
        // let randomDate = GetTimeString(rt);
        // newOrder = new OrderObject(randomStore, randomSPID, randomCD, randomPrice, randomDate);
        // let divOrderList = document.getElementById("divOrderList");
        // divOrderList.innerHTML = `StoreID = ${randomStore} <br> 
        // SalesPersonID = ${randomSPID} <br> 
        // CdID = ${randomCD} <br> 
        // PricePaid = ${randomPrice} <br> 
        // Date = ${randomDate} <br>`

    }
    else if (randomStore === 98007) {
        modifiedCreateOne(4,8);

        // const randomSPID = randomInt(4, 8);
        // var rcd = randomInt(0, 9);
        // var randomCD = cdID[rcd];
        // const randomPrice = randomInt(5, 15);
        // var rt = randomInt(1800000, 1800000 * 2);
        // let randomDate = GetTimeString(rt);
        // newOrder = new OrderObject(randomStore, randomSPID, randomCD, randomPrice, randomDate);
        // let divOrderList = document.getElementById("divOrderList");
        // divOrderList.innerHTML = `StoreID = ${randomStore} <br> 
        // SalesPersonID = ${randomSPID} <br> 
        // CdID = ${randomCD} <br> 
        // PricePaid = ${randomPrice} <br> 
        // Date = ${randomDate} <br>`

    }
    else if (randomStore === 98077) {
        modifiedCreateOne(9,12,randomStore);

        // const randomSPID = randomInt(9, 12);
        // var rcd = randomInt(0, 9);
        // var randomCD = cdID[rcd];
        // const randomPrice = randomInt(5, 15);
        // var rt = randomInt(1800000, 1800000 * 2);
        // let randomDate = GetTimeString(rt);
        // newOrder = new OrderObject(randomStore, randomSPID, randomCD, randomPrice, randomDate);
        // let divOrderList = document.getElementById("divOrderList");
        // divOrderList.innerHTML = `StoreID = ${randomStore} <br> 
        // SalesPersonID = ${randomSPID} <br> 
        // CdID = ${randomCD} <br> 
        // PricePaid = ${randomPrice} <br> 
        // Date = ${randomDate} <br>`;

    }
    else if (randomStore === 98055) {
        modifiedCreateOne(13, 16,randomStore);

        // const randomSPID = randomInt(13, 16);
        // var rcd = randomInt(0, 9);
        // var randomCD = cdID[rcd];
        // const randomPrice = randomInt(5, 15);
        // var rt = randomInt(1800000, 1800000 * 2);
        // let randomDate = GetTimeString(rt);
        // newOrder = new OrderObject(randomStore, randomSPID, randomCD, randomPrice, randomDate);
        // let divOrderList = document.getElementById("divOrderList");
        // divOrderList.innerHTML = `StoreID = ${randomStore} <br> 
        // SalesPersonID = ${randomSPID} <br> 
        // CdID = ${randomCD} <br> 
        // PricePaid = ${randomPrice} <br> 
        // Date = ${randomDate} <br>`

    }
    else if (randomStore === 98011) {
        modifiedCreateOne(17,20,randomStore);

        // const randomSPID = randomInt(17, 20);
        // var rcd = randomInt(0, 9);
        // var randomCD = cdID[rcd];
        // const randomPrice = randomInt(5, 15);
        // var rt = randomInt(1800000, 1800000 * 2);
        // let randomDate = GetTimeString(rt);
        // newOrder = new OrderObject(randomStore, randomSPID, randomCD, randomPrice, randomDate);
        // let divOrderList = document.getElementById("divOrderList");
        // divOrderList.innerHTML = `StoreID = ${randomStore} <br> 
        // SalesPersonID = ${randomSPID} <br> 
        // CdID = ${randomCD} <br> 
        // PricePaid = ${randomPrice} <br> 
        // Date = ${randomDate} <br>`

    }
    else if (randomStore === 98046) {
        modifiedCreateOne(21, 24,randomStore);

        // const randomSPID = randomInt(21, 24);
        // var rcd = randomInt(0, 9);
        // var randomCD = cdID[rcd];
        // const randomPrice = randomInt(5, 15);
        // var rt = randomInt(1800000, 1800000 * 2);
        // let randomDate = GetTimeString(rt);
        // newOrder = new OrderObject(randomStore, randomSPID, randomCD, randomPrice, randomDate);
        // let divOrderList = document.getElementById("divOrderList");
        // divOrderList.innerHTML = `StoreID = ${randomStore} <br> 
        // SalesPersonID = ${randomSPID} <br> 
        // CdID = ${randomCD} <br> 
        // PricePaid = ${randomPrice} <br> 
        // Date = ${randomDate} <br>`

    }
}