var stops = new Stops();
var trips_by_stop = new Map();

function parser_invalid_character(string){ // Ejemplo: 39539,,"Ruta 156, Km 5, 8 / Oriente",,-36.858179252466,-73.0714231339152,,,0,,
    var new_line = "";
    var replace = 0;
    for(var j=0; j < string.length;j++){                   
        if(string[j] == '"'){
            replace++;
        }
        if(replace >= 1){
            if(string[j] == '"' || string[j] == ','){
                new_line += '';
            }else{
                new_line += string[j];
            }
        }
        else{
            new_line += string[j];
        }
        if(replace >=2){
            replace = 0;
        }
    }
    return new_line;
}

$.ajax({
    url : "file/Android_busstops.html",
    success : function(result){
        var line = result.split("\n");
        var stop_id,lat,lon,name,serv=4;
        for(var i = 0;i < line.length;i++){
            var lines = line[i].split(";");
            if(i == 0){
                for(var j=0; j < lines.length; j++){                
                    if(lines[j] == "code"){
                        stop_id = j;
                    }
                    if(lines[j] == "name"){
                        name = j;
                    }
                    if(lines[j] == "latitude"){
                        lat = j;
                    }
                    if(lines[j] == "longitude"){
                        lon = j;
                    }
                    if(lines[j] == "services"){
                        serv = j;
                    }
                }
            }
            else{
                stops.addStop(lines[stop_id],lines[lat],lines[lon],lines[name],lines[serv]);
            }
        }
    }
})
.done(function( html ) {
    load_map();
});
