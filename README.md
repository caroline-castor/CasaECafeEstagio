# API REST com Node.Js e MongoDB

Este projeto foi desenvolvido para o processo seletivo de estágio da Casa e Café

Recursos utilizados no desenvolvimento:

 * Node.Js
 * Npm (Já incluso no NodeJS)
 * Express.Js
 * MongoDB
 * Mongoose
 * JSON (para retornar os dados)
 * PostMan (testar a API)

## Pré requisitos


* Antes de instalar as dependências do projeto, é necessário ter instalado em sua máquina:
	* [MongoDB - Download](https://www.mongodb.com/download-center)
	* [NodeJS - Download](https://nodejs.org/en/download/)
	* [Postman - Download (OPCIONAL)](https://www.getpostman.com/)
* Verifique se as variáveis de ambiente estão configuradas corretamente
* Teste a instalação dos requisitos usando os seguintes comandos no cmd:
> `node -v`
>  
>  `mongo -version`
>  
>  `npm --v`
      

## Executando localmente

1. Faça o clone desse repositório em sua máquina
> ` git clone https://github.com/carolinecdsantos/CasaECafeEstagio.git `

2. Abra uma nova janela do cmd e execute:
> `mongod`
> 
> Se tudo estiver ok, a seguinte mensagem será apresentada:
>
>> waiting for connections on port 27017

3. Abra uma nova janela no cmd e navegue até o path do seu projeto

4. No path do projeto, digite o seguinte comando para instalar as dependências listadas no packaje.json:

> ` npm install ` 
>
>Isso fará com que um diretório chamado node_modules seja criado no diretório raiz do projeto contendo todas as dependências necessárias para sua execução.

5. Ainda no path do projeto, execute o seguinte comando
> `npm install -g node-mongo-seeds`

6. Logo em seguida, execute o seguinte comando para popular o BD
> `seed`

7. E por fim execute (ainda no path do projeto):
> `node app.js`

## Testando API com o Postman

Depois de instalar o Postman, basta agora seguir os passos abaixo para testar a API

| Rota                    | HTTP (Verb) | Descrição                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
|-------------------------|-------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| localhost:3000/plans    | GET         | Agrupa e lista todos os produtos existentes                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| localhost:3000/payments | POST        | Cria um pagamento. Os seguintes parâmetros devem ser passados por body com **x-www-form-urlencoded**: |
- payment_date (Dia do Pagamento)  
- payment_type (Tipo do Pagamento, exemplo: cartão, dinheiro etc..)  -
- product (Product se refere ao plano (nome do plano), deve estar contido em /plans)  
- product_price (Preço do Produto (Formato XX.XX )) 
- discount (Porcentagem de desconto sobre o preço do produto (Formato XX.XX), não pode ser maior que 50%)  


> **Observação:** O preço final do produto será calculado através do backend, transaction_id é automaticamente atribuído como _id pelo mongoDB sendo único. A ideia inicial, segundo requisito era que esse campo fosse informado no post, porém não vi a necessidade de criar outro id autoincrement no banco e atribui ao id criado pelo mongo db (_id) 
>
> É necessário que o post tenha body de formato **x-www-form-url-encoded** no **postman**
>
> Após o request de /payments será retornado um JSON contendo os dados inseridos





