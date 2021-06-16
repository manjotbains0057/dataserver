<?php
$host = "mysql-server";
$user = "it06";
$pass = "innovativegeeks";
$db = "it06";
try {
    $conn = new PDO("mysql:host=$host;dbname=$db", $user, $pass);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
 
    echo "Connected successfully to mysql running docker ";
} catch(PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
}
?>

