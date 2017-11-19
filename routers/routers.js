var express = require('express');
var router = express.Router();
var ProdutoModel = require('../models/product');
var PaymentModel = require('../models/payment');
var s = require('string');
var isNumber = require('is-number');


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
    var transaction_id = req.body.transaction_id;
    var price = 0.0;

    ProdutoModel.findOne({'product':product},function(err,product_find){
        if(!err){
            if(product_find!=null){
                if(product_price){
                    //verifica se o preço está no formato correto
                    if(!isNumber(product_price)){
                        res.status(400).json({error:400,msg:"Price is not in the correct format XX.X"});                           
                    }else{
                    //se o preço está no formato correto converte para number    
                    product_price = Number(product_price);
                    //se o preço informado ao incluir pagamento não é igual ao produto cadastrado
                    if(product_price!= product_find.price){
                        res.status(400).json({error:400,msg:"Price informed is divergent. Please check parameters. Price "+product_find.price});
                    }else{
                        // se o preço for igual ao informado
                        if(payment_date){
                            if(payment_type){
                                //se payment type foi informado
                                if(discount){
                                    //se desconto foi informado
                                    //verifica se o desconto está no formato correto, float
                                    if(!isNumber(discount)){
                                        res.status(400).json({error:400,msg:"Discount is not in the correct format XX.X"});   
                                    }else{
                                        //se está no formato correto, converte para number
                                        discount=Number(discount);
                                        discount = discount/100;
                                        if(discount<=0.5){
                                            //desconto válido
                                            price = product_price - (product_price*discount);
                                            if(!transaction_id){
                                                res.status(400).json({error:400,msg:"Transaction_id not informed. Please digit the transaction_id"});  
                                            
                                            }else{
                                           
                                            PaymentModel.findOne({'transaction_id':transaction_id},function(err,product_transaction){
                                     
                                                if(!err){
                                                    if(product_transaction!=null){
                                                        //erro transaction id já existe
                                                        res.status(400).json({error:400,msg:"Transaction_id exists. Please digit the transaction_id"});  
                                                
                                                    }else{
                                                        //transaction id não existe, pode inserir
                                            
                                                        // a partir daqui tudo está validado conforme regras de negocio

                                                        //inserindo no banco de dados

                                                        var paymentModel = new PaymentModel();
                                                        paymentModel.payment_date = payment_date;
                                                        paymentModel.payment_type = payment_type;
                                                        paymentModel.product = product;
                                                        paymentModel.product_price = product_price;
                                                        paymentModel.discount = discount;
                                                        paymentModel.price = price;
                                                        paymentModel.transaction_id = transaction_id;
                                                        paymentModel.save(function(err,payment){
                                                            payment.save(function(err,_payment){
                                                                res.json({_payment});
                                                            });
                                                        });
                                                    }
                                                }else{
                                                    res.status(400).json({error:400,msg:"Error in find. Check the connection."});  
                                                }
                                            });
                                        }

                                        }else{
                                            //desconto inválido
                                            res.status(400).json({error:400,msg:"Discount cant be greater than 50%"});  
                                        }
                                    }
                                }else{
                                    //se discount não foi informado
                                    res.status(400).json({error:400,msg:"Discount not found. Please enter the discount"});  
                                }
                            }else{
                                //se payment type não foi informado
                                res.status(400).json({error:400,msg:"Payment Type not found. Please enter the payment_type"});  
                            
                            }
                        }else{
                            // se payment date nao foi informado
                            res.status(400).json({error:400,msg:"Payment Date not found. Please enter the payment_date"});  
                        }
                    }
                }
                }else{
                    //se nao foi infomado o preço
                    res.status(400).json({status:400,msg:"Product Price not found. Please enter the product_price"});                
                }
            
            }else{
                res.status(400).json({status:200,msg:"Product not found. Please check the parameters."});
            }
            }
    
    });

});





module.exports = router;