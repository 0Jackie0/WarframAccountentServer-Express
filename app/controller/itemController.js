var router = require('express').Router()
var itemRepo = require('../dbConnection/itemRepo')

router.get("/", function (request, respond)
{
    console.log("Get all item list")
    itemRepo.getAllItem(function(result)
    {
        respond.json(result);
    })
});

router.get("/name", function (request, respond)
{
    console.log("Get all item list order name")
    itemRepo.getAllItemOrder('name', function(result)
    {
        respond.json(result)
    })
});

router.get("/quantity", function (request, respond)
{
    console.log("Get all item list order quantity")
    itemRepo.getAllItemOrder('quantity', function(result)
    {
        respond.json(result)
    })
});

router.get("/:itemType/name", function (request, respond)
{
    console.log("Get filter item list order name")
    itemRepo.getFilterOrderItemList(request.params.itemType, 'name',function(result)
    {
        respond.json(result)
    })
});

router.get("/:itemType/quantity", function (request, respond)
{
    console.log("Get filter item list order quantity")
    itemRepo.getFilterOrderItemList(request.params.itemType, 'quantity',function(result)
    {
        respond.json(result)
    })
});

router.post("/new", function (request, respond)
{
    console.log("Add new item")

    let newItem = request.body;
    newItem.quantity = parseInt(newItem.quantity, 10);
    newItem.bprice = parseInt(newItem.bprice, 10);
    newItem.eprice = parseInt(newItem.eprice, 10);

    itemRepo.addOne(newItem, function(result)
    {
        newItem.itemId = result.insertId;
        respond.json(newItem);
    })
});

router.put("/all", function (request, respond)
{
    console.log("Update all item")

    let index = 0;

    let recursiceFunction = (index, length, list) =>
    {
        itemRepo.updateOne(list[index], function(result, status)
        {
            if(status == false)
            {
                respond.json({result: "faill"});
            }
            else if (index >= length - 1)
            {
                respond.json({result: "success"});
            }
            else
            {
                recursiceFunction(index + 1, length, list);
            }
        })
    }

    recursiceFunction(index, request.body.itemList.length, request.body.itemList)
})

router.put("/one", function(request, respond)
{
    console.log("Update one")

    itemRepo.updateOne(request.body, function(result, status)
    {
        if (status == false)
        {
            respond.status(500)
        }
        respond.json(request.body)
    })
})

router.delete("/remove/:itemId", function(request, respond)
{
    console.log("Remove Item -- Id: " + request.params.itemId)

    itemRepo.removeOne(request.params.itemId, function(target)
    {
        respond.json(target)
    })
})

router.put("/changeOne/:itemId/:amount", function(request, respond)
{
    console.log("Change item " + request.params.itemId + " quantityt " + request.params.amount)

    itemRepo.changeQuantity(request.params.itemId, parseInt(request.params.amount, 10), function(result)
    {
        respond.json(result)
    })
})

module.exports = router