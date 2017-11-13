var express = require('express');
var router = express.Router();
var ProdutoController = require('../controllers/productController');
var PaymentController = require('../controllers/paymentController');
var ProdutoModel = require('../models/product');

router.get('/get/payments',function(req,res){
    PaymentController.list(function(resp){
        //passa a resposta como um json
        res.json(resp);
    });
});
router.get('/get/plans',function(req,res){
    ProdutoController.list(function(resp){
        //passa a resposta como um json
        res.json(resp);
    });
});

router.post('/cadastrarPayment',function(req,res){
    var payment_date = req.body.payment_date;
    var payment_type = req.body.payment_type;
    var product = req.body.product;
    var product_price = req.body.product_price;
    var discount = req.body.discount;
    var price = req.body.price;
    var transaction_id = req.body.transaction_id;

    ProdutoModel.findOne({'product':product},function(err,product_find){
        if(!err){
            if(product_find!=''){
                if(product_price){
                    product_price = Number(product_price);
                    if(product_price!= product_find.price){
                        res.json({status:400,msg:"Price is divergent. Please check parameters. Price "+product_find.price});
                    }else{
                        // se o preço for igual ao informado
                        if(payment_date){
                            payment_date = new Date(payment_date);
                            if(payment_type){
                                if(discount){
                                    discount=Number(discount);
                                    discount = discount/100;
                                    if(discount<=0.5){
                                        //desconto válido
                                        if(discount.indexOf(",")){
                                            res.json({status:400,msg:"Discount is not format XX,X"});   
                                        }else{
                                        price = price - (price*discount);
                                        }
                                    }else{
                                        //desconto inválido
                                        res.json({status:400,msg:"Discount cant be greather 50%."});  
                            
                                    }
                                }else{
                                    //se discount não foi informado
                                    res.json({status:400,msg:"Discount not informed. Please digit the discount "});  
                                }
                            }else{
                                //se payment type não foi informado
                                res.json({status:400,msg:"Payment Type not informed. Please digit product price "});  
                            
                            }
                        }else{
                            // se payment date nao foi informado
                            res.json({status:400,msg:"Payment Date not informed. Please digit product price "});  
                        }
                    }
                }else{
                    //se nao foi infomado o preço
                    res.json({status:400,msg:"Price not informed. Please digit product price "});                
                }
            }else{
                res.json({status:200,msg:"Product not find, please check parameters"});
            }
        }
    });


   /* PaymentController.save(payment_date, payment_type, product, product_price, discount, price, transaction_id, function(resp){
        res.json(resp);
    });*/
});

router.post('/cadastrarPlan',function(req,res){
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