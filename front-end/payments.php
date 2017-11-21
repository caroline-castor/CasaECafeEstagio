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
            <div class="thumbnail">
                <form>
                    <div class="form-group"> 
                        <label for= 'product'> Produto </label>
                        <select class="form-control" id="product" value=''>
                            <option value="" selected disabled hidden> Escolha um produto </option>
                          <?php
                                $results = file_get_contents('http://localhost:3000/plans');
                                $results = json_decode($results);
                                for($i = 0; $i < count($results); $i++) {
                                    $product= $results[$i]->{'product'};
                                    $price = $results[$i]->{'price'};
                                  
                                    $nome=str_replace('_',' ',$product);
                                    $nome = mb_convert_case($nome,MB_CASE_TITLE,'UTF-8');     
                                    echo '<option>';
                                    echo $nome;
                                    echo '</option>';
                            }
                          ?>
                          
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="price">Preço</label>
                        <input type="text" class="form-control" id="price">
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
                            <label>Forma de Pagamento</label>
                    <div class="form-check">
                        <label class="form-check-label">
                        <input class="form-check-input" type="checkbox" value="">
                            Cartão
                        </label>
                        <br>
                        <label class="form-check-label">
                        <input class="form-check-input" type="checkbox" value="">
                            Boleto
                        </label>
                    </div>

                    </div>
                    

                    <div class="form-group">
                        <label for="price">Total</label>
                    </div>

                    <button type="submit" class="btn btn-primary">Cadastrar</button>
                </form>
                </div>
            </div>
    
               
           
        </div>
    </body>
</html>
