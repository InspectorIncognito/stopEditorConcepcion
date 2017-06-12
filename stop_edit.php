<?php
	require_once 'connect.php';
	if($_POST){
 		$stop_id = $conn->real_escape_string($_POST['stop_id']);
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
 			"stop_id"=>$stop_id,
 			"services"=>$services,
 			);
 		$sql=utf8_decode("INSERT INTO stops_edit (stop_id, lat, lon, services, extra, date) VALUES ('$stop_id', '$lat', '$lon', '$services', '$extra', '$date')");
 		if ($conn->query($sql) === TRUE) {
		    $response = array(
		    	array("response"=>"success"),
		    	$data);
		} else {
		    $response = array("response"=>"fail");
		}
		echo json_encode($response);
		$conn->close();
	}
?>
