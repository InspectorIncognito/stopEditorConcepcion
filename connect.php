<?php 
	header("Content-Type: text/html; charset=utf-8");
	//Datos de conexión a la base de datos
	$hostname = 'localhost';
	$database = 'smartcities_concepcion';
	$username = 'root';
	$password = 'city25';

	$conn = new mysqli($hostname, $username,$password, $database);
	if ($conn -> connect_errno){
		die( "Fallo la conexión a MySQL: (" . $conn -> mysqli_connect_errno() . ") " . $conn -> mysqli_connect_error());
	}
	
	function console_log( $data ){
		echo '<script>';
		echo 'console.log('. json_encode( $data ) .')';
		echo '</script>';
	}
	date_default_timezone_set('America/Santiago');
?>
