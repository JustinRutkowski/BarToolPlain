<?php
$cmd = $_POST['cmd']; 

switch ($cmd){
    // GetDataBaseData
    case 1: 
        $products = array();

        $mysqli = new mysqli("localhost", "root", "root", "kabaret");
        if ($mysqli->connect_errno) {
            die("Verbindung fehlgeschlagen: " . $mysqli->connect_error);
        }
        
        $sql = "SELECT * FROM getraenke";
        $statement = $mysqli->prepare($sql);
        $statement->execute();
        $result = $statement->get_result();
        
        while($row = $result->fetch_assoc()) {
            array_push($products, $row['Art'], $row['Groesse'] ,$row['Preis']);
        }

        echo json_encode($products);
        break;

    // Insert Order into DB
    case 2:             
        echo "insert Product into DB ";
        $Art = $_POST['Art'];
        $Groesse = $_POST['Groesse'];
        $Preis = $_POST['Preis'];
        break;

    case 3: 
        echo "case3";
        break;
}

function array_push_assoc(&$array, $key, $value){
    $array[$key] = $value;
    return $array;
    }

?>