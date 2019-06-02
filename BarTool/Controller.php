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
        $Art = $_POST['Art'];
        $Groesse = $_POST['Groesse'];
        $Preis = $_POST['Preis'];
        
        $mysqli = new mysqli("localhost", "root", "root", "kabaret");
        if ($mysqli->connect_errno) {
            die("Verbindung fehlgeschlagen: " . $mysqli->connect_error);
        }
        
        $sql = "INSERT INTO getraenke (Art, Groesse, Preis) VALUES (?, ?, ?)";
        $statement = $mysqli->prepare($sql);
        $statement->bind_param("sdd", $Art, $Groesse, $Preis);
        $statement->execute();
        $result = $statement->get_result();

    break;

    // remove all occurences from one product from DB
    case 3: 
        $Art = $_POST['Art'];

        $mysqli = new mysqli("localhost", "root", "root", "kabaret");
        if ($mysqli->connect_errno) {
            die("Verbindung fehlgeschlagen: " . $mysqli->connect_error);
        }
        
        $sql = "DELETE FROM getraenke WHERE Art = ?";
        $statement = $mysqli->prepare($sql);
        $statement->bind_param("s", $Art);
        $statement->execute();
        $result = $statement->get_result();

    break;

    // append the defined product Sizes to overlay
    case 4:
        $Art = $_POST['Art'];
        $sizes = array();
        $mysqli = new mysqli("localhost", "root", "root", "kabaret");
        if ($mysqli->connect_errno) {
            die("Verbindung fehlgeschlagen: " . $mysqli->connect_error);
        }
        
        $sql = "SELECT Groesse FROM getraenke WHERE Art = ?";
        $statement = $mysqli->prepare($sql);
        $statement->bind_param("s", $Art);
        $statement->execute();
        $result = $statement->get_result();

        while($row = $result->fetch_assoc()) {
            array_push($sizes, $row['Groesse']);
        }

        echo json_encode($sizes);

    break;
}

function array_push_assoc(&$array, $key, $value){
    $array[$key] = $value;
    return $array;
    }

?>