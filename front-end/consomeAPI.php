<?php
    $results = file_get_contents('http://localhost:3000/plans');
    $results = json_decode($results);
    for($i = 0; $i < count($results); $i++) {
		#pega cada elemento do array de json e insere no banco
		$_id = $results[$i]->{'_id'};
		$product= $results[$i]->{'product'};
		$price = $results[$i]->{'price'};
        $description = $results[$i]->{'description'};
        
        echo $_id;
        echo '<br>';
        echo $product;
        echo '<br>';
        echo $description;
        echo '<br>';
        echo $price;
        echo '<br>';
}


?>