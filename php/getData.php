<?php

require("dbConfig.php");

$search = $_POST['search'];

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$lines = file("../data/AT.txt") or die("Unable to open file!");

$sql = "SELECT * FROM geo_names_org WHERE place_name=? OR postal_code=? OR admin_name1=? OR admin_name2=?";

$stmt = $conn->prepare($sql);
$stmt->bind_param("ssss", $search, $search, $search, $search);

$stmt->execute();

echo json_encode($stmt->get_result()->fetch_all());

$stmt->close();
$conn->close();