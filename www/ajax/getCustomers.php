<?php

include('../includes/config.php');

$query = "select * from affiliante limit 5";
$result = $mysqli->query($query) or die($mysqli->error . __LINE__);

$arr = array();
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $arr[] = array('title' => $row['title'], 'id' => $row['id']);
    }
}
# JSON-encode the response
$json_response = json_encode($arr);

// # Return the response
echo $json_response;
?>
