var express = require('express');
var router = express.Router();
var ProdutoController = require('../controllers/productController');



router.get('/get/plans',function(req,res){
    ProdutoController.list(function(resp){
        //passa a resposta como um json
        res.json(resp);
    });
});


router.post('/cadastrar',function(req,res){
    var product = req.body.product;
    var price = req.body.price;
    var description = req.body.description;
    ProdutoController.save(product,price,description, function(resp){
        res.json(resp);
    });
});

/*
router.delete('/deletar/:id',function(req,res){
    var id = req.params.id;

    ProdutoController.delete(id,function(resp){
        res.json(resp);
    });
});*/
module.exports = router;

