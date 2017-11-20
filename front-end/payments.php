<?php
    require_once('header.php');
?>

<html>
    <head>
        <!-- Required meta tags -->
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css" integrity="sha384-PsH8R72JQ3SOdhVi3uxftmaW6Vc51MKb0q5P2rRUpPvrszuE4W1povHYgTpBfshb" crossorigin="anonymous">
    </head>
    <body>
    
        <div class="container">
           <br> 
           <br> 
           <br> 
   
            <div class="d-flex justify-content-center align-content-center">
                <form>
                    <div class="form-group"> 
                        <label for= 'product'> Produto </label>
                        <select class="form-control" id="exampleFormControlSelect1">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="price">Preço</label>
                    </div>

                    <div class="form-group">
                    <label for="desconto">Desconto</label>
                    <input type="text" class="form-control" id="desconto">
                    </div>

                    <div class="form-group">
                    <label for="payment_date">Data do pagamento</label>
                    <input type="date" class="form-control" id="payment_date" placeholder="dd/mm/aaaa">
                    </div>

                    <div class="form-group">
                        <label for="price">Total</label>
                    </div>
                </form>
            </div>
    
               
           
        </div>
    </body>
</html>
