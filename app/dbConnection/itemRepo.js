var sql = require('./dbConnect');

var itemRepo = {};

itemRepo.getAllItem = (callback) =>
{
    sql.query("Select * from item", function (err, res) {

        if(err) 
        {
            console.log("error: ", err);
        }
        else
        {
            callback(res);
        }
    });
}

itemRepo.getAllItemOrder = (order, callback) =>
{
    var query = "select * from item order by " + order + " asc"

    sql.query(query, function (err, res) {

        if(err) 
        {
            console.log("error: ", err);
        }
        else
        {
            callback(res);
        }
    });
}

itemRepo.getFilterOrderItemList = (typeId, order, callback) =>
{
    var query = "select * from item where type=? order by " + order + " asc"

    sql.query(query, typeId, function (err, res) {

        if(err) 
        {
            console.log("error: ", err);
        }
        else
        {
            callback(res);
        }
    });
}

itemRepo.addOne = (newItem ,callback) =>
{
    var query = "INSERT INTO item (name, imageString, quantity, type, bprice, eprice) VALUES (?, ?, ?, ? ,? ,?)"

    sql.query(query, [newItem.name, newItem.imageString, newItem.quantity, newItem.type, newItem.bprice, newItem.eprice], function (err, res) {

        if(err)
        {
            // console.log("error: ");
            console.log("error: ", err);
        }
        else
        {
            callback(res);
        }
    });
}

itemRepo.updateOne = (targetItem, callback) =>
{
    var query = "UPDATE item SET name=?, imageString=?, quantity=?, type=?, bprice=?, eprice=? WHERE itemId=?";

    sql.query(query, [targetItem.name, targetItem.imageString, targetItem.quantity, targetItem.type, targetItem.bprice, targetItem.eprice, targetItem.itemId], function (err, res) {

        if(err)
        {
            console.log("error: ", err);
            callback(res, false)
        }
        else
        {
            callback(res, true);
        }
    });
}

itemRepo.removeOne = (targetId, callback) =>
{
    sql.query("SELECT * from item where itemId=?", targetId, function (err, target) {

        if(err)
        {
            console.log("error: ", err);
        }
        else
        {
            var query = "DELETE FROM item where itemId=?"

            sql.query(query, targetId, function (err, res) {

                if(err)
                {
                    console.log("error: ", err);
                }
                else
                {
                    callback(target);
                }
            });
        }
    });
}

itemRepo.changeQuantity = (targetId, amount, callback) =>
{
    var query = "UPDATE item SET quantity=quantity+? WHERE itemId=?"

    sql.query(query, [amount, targetId], function (err, res) {

        if(err)
        {
            console.log("error: ", err);
        }
        else
        {
            callback(res);
        }
    });
}

module.exports = itemRepo
