var app = require('./config/app_config');
var db = require('./config/db_config');
var url_routers = require('./routers/routers');
var http = require('http');
var url = require('url');



//configuração rota principal
/*app.get('/',function(req,res){
    var page = url.parse(req.url).pathname;
    console.log(page);
    res.writeHead(200,{"Content-Type": "text/plain"});
    res.write('Bem-vindo a API de produtos');
    res.end();
});*/

// atribui as rotas
app.use('/',url_routers);