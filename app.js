var app = require('./config/app_config');
var db = require('./config/db_config');
var url_routers = require('./routers/routers');
//configuração rota principal
app.get('/',function(req,res){
    res.end('Bem-vindo a API de produtos')
});

// atribui as rotas
app.use('/',url_routers);