<?php
require_once('connect.php');
$cmd = $_POST['cmd'] * 1; 


switch ($cmd){
    // GetDataBaseData
    case 1: 
        $products = array();

        $sql = "SELECT * FROM produkte";
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
        
        $sql = "INSERT INTO produkte (Art, Groesse, Preis) VALUES (?, ?, ?)";
        $statement = $mysqli->prepare($sql);
        $statement->bind_param("sdd", $Art, $Groesse, $Preis);
        $statement->execute();
        $result = $statement->get_result();

    break;

    // remove all occurences from one product from DB
    case 3: 
        $Art = $_POST['Art'];
        $Groesse = $_POST['Groesse'];

        $sql = "DELETE FROM produkte WHERE Art = ? && Groesse = ?";
        
        $statement = $mysqli->prepare($sql);
        $statement->bind_param("sd", $Art, $Groesse);
        $statement->execute();
        $result = $statement->get_result();
    break;

    // append the defined product Sizes to overlay
    case 4:
        $Art = $_POST['Art'];
        $sizes = array();
        
        $sql = "SELECT Groesse FROM produkte WHERE Art = ?";
        $statement = $mysqli->prepare($sql);
        $statement->bind_param("s", $Art);
        $statement->execute();
        $result = $statement->get_result();

        while($row = $result->fetch_assoc()) {
            array_push($sizes, $row['Groesse']);
        }

        echo json_encode($sizes);

    break;

    case 5:
        $Art = $_POST['Art'];
        $Groesse = $_POST['Groesse'];
        $prices = array();
        
        $sql = "SELECT Preis FROM produkte WHERE Art = ? AND Groesse = ?";
        $statement = $mysqli->prepare($sql);
        $statement->bind_param("sd", $Art, $Groesse);
        $statement->execute();
        $result = $statement->get_result();

        while($row = $result->fetch_assoc()) {
            array_push($prices, $row['Preis']);
        }

        echo json_encode($prices);
    break;

    case 6:
        $Bestellungspreis = $_POST['Bestellungspreis'];
        $GutscheinWert = $_POST['GutscheinWert'];
        $GeldErhalten = $_POST['GeldErhalten'];
        $TrinkGeld = $_POST['TrinkGeld'];
        $RueckGeld = $_POST['RueckGeld'];
        $Nutzer = $_POST['Nutzer'];

        $sql = "INSERT INTO bestellungen (Bestellungspreis, GutscheinWert, GeldErhalten, TrinkGeld, RueckGeld, Nutzer) VALUES (?, ?, ?, ?, ?, ?)";
        $statement = $mysqli->prepare($sql);
        $statement->bind_param("ddddds", $Bestellungspreis, $GutscheinWert, $GeldErhalten, $TrinkGeld, $RueckGeld, $Nutzer);
        $statement->execute();
        $result = $statement->get_result();



        $sql2 = "SELECT MAX(BestellungsID) FROM bestellungen";
        $statement = $mysqli->prepare($sql2);
        $statement->execute();
        $result = $statement->get_result();

       
        echo json_encode($result->fetch_assoc());
        
    break;
    

    case 7:
        $productIDs = array();

        $Art = $_POST['Art'];
        $Groesse = $_POST['Groesse'];
        $Preis = $_POST['Preis'][0];
       
        $sql = "SELECT produkteID FROM produkte WHERE Art = ? AND Groesse = ? AND Preis = ?";
        $statement = $mysqli->prepare($sql);
        $statement->bind_param("sdd", $Art, $Groesse, $Preis);
        $statement->execute();
        $result = $statement->get_result();

        while($row = $result->fetch_assoc()) {
            array_push($productIDs, $row['produkteID']);
        }

        echo json_encode($productIDs);

    break;

    case 8:
    $productIDs = array();

    $BestellungsID = $_POST['BestellungsID'];
    $ProdukteID = $_POST['ProdukteID'][0];
    $Menge = $_POST['Menge'];
   
    print_r($BestellungsID);
    print_r($ProdukteID);
    print_r($Menge);

    $sql = "INSERT INTO produktebestellung (BestellungsID, ProdukteID, Menge) VALUES (?, ?, ?)";
    $statement = $mysqli->prepare($sql);
    $statement->bind_param("iii", $BestellungsID, $ProdukteID, $Menge);
    $statement->execute();
    $result = $statement->get_result();

    while($row = $result->fetch_assoc()) {
        array_push($productIDs, $row);
    }

    echo json_encode($productIDs);

    

break;
}

function array_push_assoc(&$array, $key, $value){
    $array[$key] = $value;
    return $array;
    }

?>