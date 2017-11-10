var Payments = require('../models/payments');
//permite chamar esse metodo de outro arquivo fazendo umr require desse arquivo

exports.save = function(payment_date,payment_type,product,product_price,discount,price,transaction_id,callback){
    new Payments({
        'payment_date':payment_date,
        'payment_type':payment_type,
        'product':product,
        'product_price':product_price,
        'discount': discount,
        'price':price,
        'transaction_id':transaction_id
    }).save(function(error,payment){
        if(error){
            callback({error:'Não foi possível salvar'})
        }else{
            callback(payment);
        }
    });
}

exports.list = function(callback){
    Payments.find({},function(error,payment){
        if(error){
            callback({error:'Não foi possivel encontrar pagamento'});
        }else{
            callback(payment);
        }
    });
}

exports.delete = function(id,callback){
    Payments.findById(id,function(error,payment){
        if(error){
            callback({error:'Não foi possivel excluir'});
        }else{
            payment.remove(function(error){
                if(!error){
                    callback({resposta:"pagamento excluido com sucesso!"});
                }
            });
        }
    });
}