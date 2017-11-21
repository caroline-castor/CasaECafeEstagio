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
    <?php
    $results = file_get_contents('http://localhost:3000/plans');
    $results = json_decode($results);
    
?>
        <div class="container">
           <br> 
           <br> 
           <br> 
   
    <div class="d-flex justify-content-center align-content-center">
    <table class="table table-bordered">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Produto</th>
                        <th>Valor</th>
                        <th>Descrição</th>
                     </tr>
                </thead>
                <tbody>
                    <?php
                            for($i = 0; $i < count($results); $i++) {
                                $_id = $results[$i]->{'_id'};
                                $product= $results[$i]->{'product'};
                                $price = $results[$i]->{'price'};
                                $description = $results[$i]->{'description'};

                                $nome=str_replace('_',' ',$product);
                                $nome = mb_convert_case($nome,MB_CASE_TITLE,'UTF-8');     
                                echo '<tr> <td>';
                                echo $nome;
                                echo '</td> <td>';
                                echo $product;
                                echo '</td><td>';
                                echo 'R$ '. $price;
                                echo '</td><td>';
                                echo $description;
                                echo '</td></tr>';
                        }


                    ?>
                   <!--- <tr>
                        <td>John</td>
                        <td>Doe</td>
                        <td>john@example.com</td>
                    </tr>
                    <tr>
                        <td>Mary</td>
                        <td>Moe</td>
                        <td>mary@example.com</td>
                     </tr> !-->
     
                </tbody>
            </table>
            
    </div>
    
               
           
        </div>
    </body>
</html>
