var express = require('express');
var router = express.Router();
var ProdutoModel = require('../models/product');
var PaymentModel = require('../models/payment');
var s = require('string');
var isNumber = require('is-number');

/*
    Get de pagamentos (não requerido)
router.get('/get/payments',function(req,res){
    PaymentController.list(function(resp){
        //passa a resposta como um json
        res.json(resp);
    });
});*/


router.get('/plans',function(req,res){
    ProdutoModel.find({},function(err,products){
        if(err){
            res.status(500).json({msg:"Error in find products"});
        }else{
            res.json(products);
        }
    });
});

router.post('/payments',function(req,res){
    var payment_date = req.body.payment_date;
    var payment_type = req.body.payment_type;
    var product = req.body.product;
    var product_price = req.body.product_price;
    var discount = req.body.discount;
    var price = 0.0;

    ProdutoModel.findOne({'product':product},function(err,product_find){
        if(!err){
            if(product_find!=null){
                if(product_price){
                    //verifica se o preço está no formato correto
                    if(!isNumber(product_price)){
                        res.json({status:400,msg:"Price is not format XX.X"});                           
                    }else{
                    //se o preço está no formato correto converte para number    
                    product_price = Number(product_price);
                    //se o preço informado ao incluir pagamento não é igual ao produto cadastrado
                    if(product_price!= product_find.price){
                        res.json({status:400,msg:"Price is divergent. Please check parameters. Price "+product_find.price});
                    }else{
                        // se o preço for igual ao informado
                        if(payment_date){
                            if(payment_type){
                                //se payment type foi informado
                                if(discount){
                                    //se desconto foi informado
                                    //verifica se o desconto está no formato correto, float
                                    if(!isNumber(discount)){
                                        res.json({status:400,msg:"Discount is not format XX.X"});   
                                    }else{
                                        //se está no formato correto, converte para number
                                        discount=Number(discount);
                                        discount = discount/100;
                                        if(discount<=0.5){
                                            //desconto válido
                                            price = product_price - (product_price*discount);
                                            // a partir daqui tudo está validado conforme regras de negocio

                                            //inserindo no banco de dados

                                            var paymentModel = new PaymentModel();
                                            paymentModel.payment_date = payment_date;
                                            paymentModel.payment_type = payment_type;
                                            paymentModel.product = product;
                                            paymentModel.product_price = product_price;
                                            paymentModel.discount = discount;
                                            paymentModel.price = price;
                                            paymentModel.save(function(err,payment){
                                                payment.save(function(err,_payment){
                                                    res.json({_payment});
                                                });
                                            });

                                             // PaymentController.save(payment_date, payment_type, product, product_price, discount, price, transaction_id, function(resp){
                                              //  res.send.json(resp);
                                             //});

                                        }else{
                                            //desconto inválido
                                            res.json({status:400,msg:"Discount cant be greather 50%."});  
                                        }
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

});

/*
    Método para cadastro de produtos (não requerido)
router.post('/cadastrarPlan',function(req,res){
    var product = req.body.product;
    var price = req.body.price;
    var description = req.body.description;
    ProdutoController.save(product,price,description, function(resp){
        res.json(resp);
    });
});

*/

module.exports = router;