<?php

require("dbConfig.php");

set_time_limit(120);

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// $sql = "INSERT INTO `geo_names_org` (`country_code`, `postal_code`, `place_name`, `admin_name1`, `admin_code1`, `admin_name2`, `admin_code2`, `admin_name3`, `admin_code3`, `latitude`, `longitude`)
// VALUES (\'na\', \'0000\', \'pc\', \'an1\', \'ac1\', \'an2\', \'ac2\', \'an3\', \'ac3\', \'la\', \'lo\')";

$lines = file("../data/AT.txt") or die("Unable to open file!");

$sql = "INSERT INTO `geo_names_org` (`country_code`, `postal_code`, `place_name`, `admin_name1`, `admin_code1`, `admin_name2`, `admin_code2`, `admin_name3`, `admin_code3`, `latitude`, `longitude`)
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

$stmt = $conn->prepare($sql);
$stmt->bind_param("sssssssssss", $cc, $pc, $pn, $an1, $ac1, $an2, $ac2, $an3, $ac3, $lat, $lon);

foreach ($lines AS $currentLine) {
    $line_array = explode("\t", $currentLine);

    $cc = $line_array[0];
    $pc = $line_array[1];
    $pn = $line_array[2];
    $an1 = $line_array[3];
    $ac1 = $line_array[4];
    $an2 = $line_array[5];
    $ac2 = $line_array[6];
    $an3 = $line_array[7];
    $ac3 = $line_array[8];
    $lat = $line_array[9];
    $lon = $line_array[10];
    $stmt->execute();
}

$stmt->close();
$conn->close();