<?php
    $mysqli = new mysqli("localhost", "root", "", "kabaret");
    if ($mysqli->connect_errno) {
        die("Verbindung fehlgeschlagen: " . $mysqli->connect_error);
    }
?>