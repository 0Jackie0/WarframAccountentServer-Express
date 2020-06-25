var sql = require('./dbConnect');

var typeRepo = {};

typeRepo.getAllItem = function(callback)
{
    sql.query("Select * from type", function (err, res) {

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

module.exports = typeRepo