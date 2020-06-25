var mysql = require('mysql');

//local mysql db connection
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'LIANGjie6B',
    database : 'warframe_accountance'
});

connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;