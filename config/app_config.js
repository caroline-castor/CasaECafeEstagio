var express = require('express');
var expressValidator = require('express-validator');
var bodyParser = require('body-parser');
var util = require('util');
//define a porta
var port = '3000';

//exportar variavel app para fazer o request e usar em outro arquivo
var app = module.exports = express();
//Faz o listen da porta no localhost
app.listen(port);
app.use(bodyParser.urlencoded({extended:true}));
//receb json também por requisição não só pela URL
app.use(bodyParser.json());
app.use(expressValidator());


//Controla o acesso a api por outros apps
app.use(function(req,res,next){
    //permite que qualquer aplicação acesse a api
    res.setHeader('Access-Control-Allow-Origin','*');
    //quais metodos a api fornece para acesso
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,DELETE');
    //acesso por token
    res.setHeader('Access-Control-Allow-Headers','X-Requested-With,content-type,Authorization');
    next();
});