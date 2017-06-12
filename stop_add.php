<?php
	require_once 'connect.php';
	
 	if($_POST){
 		$name = $conn->real_escape_string($_POST['name']);
 		$services = $conn->real_escape_string($_POST['services']);
 		$extra = $conn->real_escape_string($_POST['extra']);
 		$lat = $_POST['lat'];
 		$lon = $_POST['lon'];
 		$today = getdate();
 		$d = $today['mday'];
 		$m = $today['mon'];
 		$y = $today['year'];
 		$date = $y."-".$m."-".$d;
 		$data = array(
 			"name"=>$name,
 			"services"=>$services,
 			);
 		$sql=utf8_decode("INSERT INTO stop (name, lat, lon, services, extra, date) VALUES ('$name', '$lat', '$lon', '$services', '$extra', '$date')");
 		if ($conn->query($sql) === TRUE) {
		    $response = array(
		    	array("response"=>"success"),
		    	$data);
		} else {
		    $response = array(array("response"=>"fail"),$data);
		}
		echo json_encode($response);
		$conn->close();
	}
?>
