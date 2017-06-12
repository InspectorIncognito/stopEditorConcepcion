// guarda los paraderos que agregaron los usuarios
function forms_load() {
    $('#addstop_form').on('submit', function(e) {
        e.preventDefault();
        console.log($(this).serializeArray());
        $.ajax({
            url : $(this).attr('action') || window.location.pathname,
            type: "POST",
            data: $(this).serialize()+"&lat="+lastmarkeropen.latlng.lat+"&lon="+lastmarkeropen.latlng.lng,
            success: function (data) {
            	var response = JSON.parse(data);
                var services = response[1]["services"].match(/[a-zA-Z\d]+/g);
    	        if(response[0]["response"] == "success"){
    	        	var markerpop = '<div class="title_marker"><b>'+response[1]["name"]+'</b></div>';
    	        	for(var i=0; i < services.length; i++){
                        if(i%6 == 0 && i!= 0){
                            markerpop += "<br>";
                        }
                        markerpop += '<div class="service_marker">'+services[i]+'</div>';
                    }
                    //markerpop += '<br><button type="button" class="btn btn-default">Eliminar</button>';
                    var marker = getMarker(lastmarkeropen);
                    marker.bindPopup(markerpop).openPopup();
    	        }
    	        else{
    	        	alert("No se pudo guardar la información")
    	        }
                Message(response[0]["response"]);
            },
            error: function (jXHR, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        });
    });
};

// permite editar la info de las paradas del gtfs
function edit_forms_load(){
    $('#editstop_form').on('submit', function(e) {
        e.preventDefault();
        console.log($(this).serializeArray());
        var services = $(this).serializeArray()[0]
        $.ajax({
            url : $(this).attr('action') || window.location.pathname,
            type: "POST",
            data: $(this).serialize()+"&lat="+lastmarkeropen.latlng.lat+"&lon="+lastmarkeropen.latlng.lng+"&stop_id="+lastmarkeropen.name,
            success: function (data) {
                var response = JSON.parse(data);
                if(response[0]["response"] == "success"){
                    var services = response[1]["services"].match(/[a-zA-Z\d]+/g);
                    var markerpop = '<div class="title_marker"><b>'+response[1]["stop_id"]+'</b></div>';
                    for(var i=0; i < services.length; i++){
                        if(i%6 == 0 && i!= 0){
                            markerpop += "<br>";
                        }
                        markerpop += '<div class="service_marker">'+services[i]+'</div>';
                    }
                    
                    var marker = getMarker(lastmarkeropen);
                    marker.bindPopup(markerpop).openPopup();
                }
                else{
                    alert("No se pudo guardar la información")
                }
                Message(response[0]["response"]);
            },
            error: function (jXHR, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        });
    });
}
