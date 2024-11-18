<?php
$DBCONFIG['db_host'] = "127.0.0.1";
$DBCONFIG['db_name'] = "ragnarok";
$DBCONFIG['db_user'] = "root";
$DBCONFIG['db_pass'] = "123456789";
$map_port = "5121";

try {
    // Correct the string interpolation for PHP array variables
    $conn = new PDO("mysql:host={$DBCONFIG['db_host']};dbname={$DBCONFIG['db_name']}", $DBCONFIG['db_user'], $DBCONFIG['db_pass']);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    // echo "Connected successfully";
} catch (PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
    exit();
}
