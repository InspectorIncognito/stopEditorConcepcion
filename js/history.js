var flag_history=0;
var history_data;
var history_marker = new Array();
var history_marker_active = new Array();
$(document).ready(function() {
	$.ajax({
        url : "history.php",
        type: "GET",
        success: function (data) {
        	var response = JSON.parse(data);
	        history_data = response;
	        if(response[0]["response"] == "success"){	        	
	        	if(response.length >= 1){
	        		$( "a.history_expand" ).after('<a id="all_new_stop" class="add_all_stop" href="#">Agregar todos al mapa</a>');
	        		$("#all_new_stop").on("click",history_all_stops);
	        	}
	        	$( "#history" ).append('<ul id="ul_history" class="history_ul"></ul>');    	
	        	for(var i=1; i < response.length; i++){
	        		$( "#ul_history" ).append('<li id = "'+i+'"class="history_li">Nombre: '+response[i]["name"]+' <br><div class="space"></div>Servicios: '+response[i]["services"]+' <br><div class="space"></div>Fecha: '+response[i]["date"]+'</li>');
	        		var marker = new L.marker([history_data[i]["lat"],history_data[i]["lon"]], {icon: stopIcon});
	        		marker.id = i;
	        		history_marker.push(marker);
	        	}
	        	historyListener();
	        }
	        else{
	        	console.log("No se pudo guardar la información")
	        }
        },
        error: function (jXHR, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
	$( "a.history_expand" ).click(function() {
		if(!flag_history){  
	   		$("#history").css("display","block");
	   		$("#all_new_stop").css("display","block");
	   		flag_history=1;
	   	}
	   	else{
	   		$("#history").css("display","none");
	   		$("#all_new_stop").css("display","none");
	   		flag_history=0;
	   	}
	});
	function history_all_stops(e){
		var history_class=$(this)[0].className;
		if(history_class == "add_all_stop"){
			$(this)[0].innerHTML = "Quitar todos";
			$("#all_new_stop").css("color","rgba(255,0,0,0.7)");
			$("#all_new_stop").removeClass("add_all_stop");
			$("#all_new_stop").addClass("remove_all_stop");
			var length = history_data.length;
			for(var i=1; i < length; i++){
				var marker = new L.marker([history_data[i]["lat"],history_data[i]["lon"]], {icon: stopIcon}).addTo(mymap);
				marker.id = i;
				var text = "Nombre:"+history_data[i]["name"]+"<br>Servicios:"+history_data[i]["services"]+"<br>Fecha"+history_data[i]["data"];
				text += '<button type="button" id="delete_stop'+i+'" class="btn btn-default width100" onclick="HistoryMarkerDelete(this)">Eliminar</button>';
				//lastmarkeropen.latlng = {"lat": parseFloat(history_data[i]["lat"]),"lon": parseFloat(history_data[i]["lon"])};
				//history_marker.push(marker);
				marker.bindPopup(text);
				history_marker_active.push(marker);
				marker.on("click",markerOpen);
			}
		}
		else{
			$(this)[0].innerHTML = "Agregar todos al mapa";
			$("#all_new_stop").css("color","rgba(0,250,0,0.5)");
			$("#all_new_stop").removeClass("remove_all_stop");
			$("#all_new_stop").addClass("add_all_stop");
			var length = history_data.length;
			for(var i=0; i < length; i++){
				var simulated_button={};
				simulated_button.id = "delete_stop"+(i+1);
				HistoryMarkerDelete(simulated_button);
				/*var marker = history_marker[i];
				marker.remove();*/
			}
		}
	}
});

function historyListener(){
	$("li.history_li").on("click",function(){
		var id= $(this)[0].id;
		var text = $(this)[0].outerText;
		var line = text.split("\n");
		text = "";
		for(var i=0; i < line.length; i++){
			text += line[i]+"<br>";
		}
		text+='<button type="button" id="delete_stop'+id+'" class="btn btn-default width100" onclick="HistoryMarkerDelete(this)">Eliminar</button>';
		console.log($(this));
		var onMap = 0;
		for(var i=0; i < history_marker_active.length; i++){
			if(id == history_marker_active[i].id){
				onMap = 1;
			}
		}
		if(!onMap){
			var marker = new L.marker([history_data[id]["lat"],history_data[id]["lon"]], {icon: stopIcon}).addTo(mymap);
			marker.id = id;
			history_marker_active.push(marker);
			lastmarkeropen.latlng = {"lat": parseFloat(history_data[id]["lat"]),"lon": parseFloat(history_data[id]["lon"])};
			markerslist.push(marker);
			marker.on("click",markerOpen);		
			marker.bindPopup(text).openPopup();
		}
		
	});
}

function HistoryMarkerDelete(button){
	//remove();
	var id = button.id.replace("delete_stop","");
	for(var i =0; i < history_marker_active.length; i++){
		if(history_marker_active[i].id == id){
			history_marker_active[i].remove();
			history_marker_active.splice(i,1);
		}
	}
}

