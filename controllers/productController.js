var Produto = require('../models/product');
//permite chamar esse metodo de outro arquivo fazendo umr require desse arquivo

exports.save = function(product,price,description,callback){
    new Produto({
        'product': product,
        'price': price,
        'description': description
    }).save(function(error,produto){
        if(error){
            callback({error:'Não foi possível salvar'})
        }else{
            callback(produto);
        }
    });
}

exports.list = function(callback){
    Produto.find({},function(error,produto){
        if(error){
            callback({error:'Não foi possivel encontrar produto'});
        }else{
            callback(produto);
        }
    });
}

exports.delete = function(id,callback){
    Produto.findById(id,function(error,produto){
        if(error){
            callback({error:'Não foi possivel excluir'});
        }else{
            produto.remove(function(error){
                if(!error){
                    callback({resposta:"produto excluido com sucesso!"});
                }
            });
        }
    });
}