<?php
$cmd = $_POST['cmd']; 

switch ($cmd){
    // GetDataBaseData
    case 1: 
        echo "load database data here";
        break;

    // Insert Order into DB
    case 2:    
        $name = $_POST['name'];     
        echo "insert Order into DB ";
        echo $name;
        break;

    case 3: 
        echo "case3";
        break;
}

?>