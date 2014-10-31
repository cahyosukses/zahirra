<?php 
include('../includes/config.php');

if(isset($_GET['id'])){
$status = $_GET['id'];
}
$query="select * from affiliante where id =  '$id'";
$result = $mysqli->query($query) or die($mysqli->error.__LINE__);

$arr = array();
if($result->num_rows > 0) {
	while($row = $result->fetch_assoc()) {
		$arr[] = $row['title'];	
	}
}

# JSON-encode the response
echo $json_response = json_encode($arr);
?>