var express = require('express');
var router = express.Router();
var ProdutoController = require('../controllers/productController');
var PaymentController = require('../controllers/paymentController');


router.get('/get/payments',function(req,res){
    PaymentController.list(function(resp){
        //passa a resposta como um json
        res.json(resp);
    });
});

router.post('/payments2',function(req,res){
    var payment_date = req.body.payment_date;
    var payment_type = req.body.payment_type;
    var product = req.body.product;
    var product_price = req.body.product_price;
    var discount = req.body.discount;
    var price = req.body.price;
    var transaction_id = req.body.transaction_id;
    PaymentController.save(payment_date, payment_type, product, product_price, discount, price, transaction_id,function(resp){
        res.json(resp);
    });
});

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

