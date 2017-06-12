<?php
	require_once 'connect.php';
	
	$sql = utf8_decode("SELECT * FROM stop");
	$result = $conn->query($sql);
	$output="";
	if ($result->num_rows > 0) {
		$output = array(array("response"=>"success"));
	    // output data of each row
	    while($row = $result->fetch_assoc()) {
	    	$array = array("stop_id"=>$row['id'],"lat"=>$row['lat'],"lon"=>$row['lon'],"name"=>htmlspecialchars(utf8_encode($row['name'])),"services"=>htmlspecialchars(utf8_encode($row['services'])),"date"=>$row['date']);
         	array_push($output,$array);
	    }
	}else{
		$output= array(array("response"=>"fail"));
	}
	echo json_encode($output);
?>