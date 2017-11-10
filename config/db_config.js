var mongoose = require('mongoose');
//url de conexão
var urlString = 'mongodb://localhost/API2';
//passa a string de conexão com o banco de dados
mongoose.connect(urlString, function(err,res){
    if(err){
        console.log('Não foi possivel conectar a: '+urlString);
    }else{
        console.log('Conectado à: '+urlString);
    }
});