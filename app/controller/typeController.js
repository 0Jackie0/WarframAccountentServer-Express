var router = require('express').Router()
var typeRepo = require('../dbConnection/typeRepo')


function getAlltype (request, respond)
{
    typeRepo.getAllItem(function(result){
        respond.json(result)
    })
}



router.get("/", getAlltype);

module.exports = router