<?php
    require_once('header.php');
?>

<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css" integrity="sha384-PsH8R72JQ3SOdhVi3uxftmaW6Vc51MKb0q5P2rRUpPvrszuE4W1povHYgTpBfshb" crossorigin="anonymous">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script> 
        <script>
            // Ao clicar no select text do html, atualiza o campo de plano, dispensando o usuário de digitá-lo  
           function verificaPlano() {
                var produto_selecionado = document.getElementById("product").value;
                var preco_produto_selecionado = document.getElementById(produto_selecionado).name;
                document.getElementById("product_price").value = preco_produto_selecionado;
            }

            function verificaDesconto(){
                var desconto_informado = document.getElementById("discount").value;
                desconto_informado = desconto_informado/100;
                if(desconto_informado>0.5){
                    alert("Desconto maior que o permitido");
                }else{
                    calculaTotalPagamento();
                }

            }

            function calculaTotalPagamento(){
                var desconto_informado = document.getElementById("discount").value;
                desconto_informado = desconto_informado/100;
                var preco_informado = document.getElementById("product_price").value;
                document.getElementById("price").value = preco_informado - (preco_informado*desconto_informado);
            }

    

            </script>

        <?php
            //faz um get na api para obter os planos
            $results = file_get_contents('http://localhost:3000/plans');
            $results = json_decode($results);
        ?>
    </head>
    <body>
    
        <div class="container">
           <br> 
           <br> 
           <br> 
   
            <div class="d-flex justify-content-center align-content-center">
            <div class="thumbnail">
                <form action='action.php' method="POST">
                    <div class="form-group"> 
                        <label for= 'product'> Produto </label>
                        <select class="form-control" id="product" name="product" onChange="verificaPlano()" required>
                            
                          <?php
                                //faz a busca no resultado do get para preencher o select box do form
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
                            <option selected disabled>-- Selecione--</option>
                        </select>
                    </div>

                    <?php
                                //cria campos hiddens para os produtos para o campo de preço poder ser atualizado mais facilmente
                                //sem a necessidade de fazer um nvo get
                                for($i = 0; $i < count($results); $i++) {
                                    $product= $results[$i]->{'product'};
                                    $price = $results[$i]->{'price'};
                                    $nome=str_replace('_',' ',$product);
                                    $nome = mb_convert_case($nome,MB_CASE_TITLE,'UTF-8');     
                                    echo '<input type="hidden" id="'.$nome.'" name="'.$price.'" value="'.$product.'">';
                            }
                    ?>

                    <div class="form-group">
                    <label for="product_price">Preço</label>
                        <input type="text" class="form-control" name="product_price" id="product_price" required readonly>
                    </div>

                    <div class="form-group">
                    <label for="discount">Desconto</label>
                    <input type="text" class="form-control" id="discount" name="discount" required onchange="verificaDesconto()">
                    </div>

                    <div class="form-group">
                    <label for="payment_date">Data do pagamento</label>
                    <input type="date" class="form-control" id="payment_date" name="payment_date" required placeholder="dd/mm/aaaa">
                    </div>

                    <div class="form-group"> 
                            <label>Forma de Pagamento</label>
                    <div class="radio">
                        <label class="form-check-label">
                        <input class="form-check-input" name="payment_type" type="radio" value="cartao" required>
                            Cartão
                        </label>
                        <br>
                        <label class="form-check-label">
                        <input class="form-check-input" name="payment_type" type="radio" value="boleto">
                            Boleto
                        </label>
                    </div>

                    </div>
                    

                    <div class="form-group">
                        <label for="totalVenda">Total R$: </label>
                        <input type="text" class="form-control" id="price" name="price" readonly>
                    </div>

                    <button type="submit" class="btn btn-primary" onClick="validaCampos()">Cadastrar</button>
                </form>
                
                </div>
            </div>
    
               
           
        </div>
    </body>
</html>
