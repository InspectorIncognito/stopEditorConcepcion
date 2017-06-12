
/************************************** VARIABLES *********************************************/
var mymap,timeout,newMarker,lastmarkeropen={};
var flag_edit = 0;
var flag_menu = 0;
var markerslist = new Array();
var form = '<form id="addstop_form" action="stop_add.php" method="post"><input type="text" name="name" class="form-control" placeholder="Nombre de parada (Opcional)"><br> <input type="text" name="services" class="form-control" placeholder="Servicios que se detienen" required><br><textarea name="extra" class="form-control" placeholder="Información adicional (Opcional)"></textarea></br><input type="submit" class="btn btn-default" value="Aceptar"></form><button type="button" id="delete_stop" class="btn btn-default width100" onclick="newMarkerProcess(this)">Eliminar</button>';
var accept_position = '<div class="title_marker"><b>¿ Desea conservar esta posición ?</b></div><button type="button" id="button_accept_position" class="btn btn-default" onclick="newMarkerProcess(this)">Si (Conservar)</button><button type="button" id="button_decline_position" class="btn btn-default" onclick="newMarkerProcess(this)">No (Cambiar)</button><br><button type="button" id="delete_stop" class="btn btn-default width100" onclick="newMarkerProcess(this)">Eliminar</button>';
var edit = '<form id="editstop_form" action="stop_edit.php" method="post"><input id="services_input" type="text" name="services" class="form-control" placeholder="Servicios que se detienen" required><br><textarea name="extra" class="form-control" placeholder="Información adicional (Opcional)"></textarea></br><input type="submit" class="btn btn-default" value="Aceptar"></form><button type="button" id="cancel" class="btn btn-default width100" onclick="newMarkerProcess(this)">Cancelar</button>';
var stopIcon = L.icon({
    iconUrl: 'img/paradero.png',
    iconSize:     [48, 72], // size of the icon
    iconAnchor:   [15, 75], // point of the icon which will correspond to marker's location
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

// botón para agregar paradas al mapa
var customControl =  L.Control.extend({
    options: {
        position: 'topleft'
    },
    onAdd: function (map) {
        var container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom');
        container.style.backgroundColor = 'white';     
        container.style.backgroundImage = "url(img/addmarker.png)";
        container.style.backgroundRepeat = 'no-repeat';
        container.style.backgroundPosition= 'center';
        container.style.backgroundSize = "20px 25px";
        container.style.width = '32px';
        container.style.height = '32px';
        container.onclick = addNewStops;
        return container;
    }
});

// menú lateral cuando está siendo visto desde un smartphone
var menuControl =  L.Control.extend({
    options: {
        position: 'topleft'
    },
    onAdd: function (map) {
        var container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom');
        container.style.backgroundColor = 'rgba(255,255,255,0.6)';     
        container.style.backgroundImage = "url(img/menu_icon.png)";
        container.style.backgroundRepeat = 'no-repeat';
        container.style.backgroundPosition= 'center';
        container.style.backgroundSize = "30px 30px";
        container.style.width = '40px';
        container.style.height = '40px';
        container.onclick = menuListener;
        return container;
    }
});

/************************************ FUNCIONES *************************************************/
function load_map(){
    var height = $(window).height();   // returns height of browser viewport
    var width = $(window).width();
    $(document).ready(function() {
        $(addstop).click(addNewStops);
        $(mapid).css("height",(height*0.9));
        mymap = L.map('mapid').setView([-36.8269900, -73.0497700], 13);
        mymap.on("click",preventDataLost);
        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoianJvYWVzIiwiYSI6ImNpeG0zbTEzZDAwaDEycWxqNXVrOWRoeTcifQ.YBAIDC2hK85zhoBbVahJAA', {
            maxZoom: 18,
            id: 'mapbox.streets'
        }).addTo(mymap);

        var stop = stops.getStops();
        var markers = L.markerClusterGroup();
        
        for(var i=0; i < stop.length; i++){
            var marker = L.marker([stop[i][1], stop[i][2]], {icon: stopIcon});
            var aux = stop[i][4].split("-");
            var services = '<div class="title_marker"><b>'+stop[i][3]+'</b></div>';
            for(var j=0;j<aux.length;j++){
                if(j%6 == 0 && j != 0){
                    services += '<br>';
                }
                services += '<div class="service_marker">'+aux[j]+'</div>';
                
            }
            services += '<br><button id="button_edit_static_stop" type="button" class="btn btn-default" onclick="newMarkerProcess(this)">Editar</button>';
            marker.bindPopup(services);
            marker.name = stop[i][3];
            marker.services = stop[i][4];
            marker.on("click",markerOpen);
            markerslist.push(marker);
            markers.addLayer(marker);
        }
        mymap.addLayer(markers);
        
        

        if(width < 1000){
            $(mapid).css("height",(height-30));
            $(".leaflet-control-zoom").css("display","none");
            mymap.addControl(new menuControl());
            $("#addstop").on("click",menuListener);
        }
        mymap.addControl(new customControl());
    });
};

function ClickListener(){
    mymap.on('click', addMarker);
    window.clearTimeout(timeout);
}

function addMarker(e){
    mymap.on("mousemove",function(){$('.leaflet-container').css('cursor','');});
    newMarker = new L.marker(e.latlng, {icon: stopIcon}).addTo(mymap);
    lastmarkeropen.latlng = e.latlng;
    markerslist.push(newMarker);
    newMarker.bindPopup(accept_position).openPopup();
    newMarker.on("click",markerOpen);
    mymap.removeEventListener("click",addMarker);
}

function addNewStops(){
    mymap.on("mousemove",function(){$('.leaflet-container').css('cursor','crosshair');});
    mymap.removeEventListener("click",addMarker);
     timeout = window.setTimeout(ClickListener, 200);
}

// eventos de botones del popup del paradero
function newMarkerProcess(button){
    if(button.id == "button_accept_position"){
        var marker = getMarker(lastmarkeropen);
        if(!(marker === undefined || marker === null)){
            marker.bindPopup(form).openPopup();
            marker.on("click",forms_load);
            forms_load();
        }
    }
    else if(button.id == "delete_stop"){
        remove();
    }
    else if(button.id == "button_edit_static_stop"){
        flag_edit = 1;
        var marker = getMarker(lastmarkeropen);
        lastmarkeropen.name = marker.name;
        lastmarkeropen.services = marker.services;
        if(!(marker === undefined || marker === null)){
            var stop = stops.getStop(marker.name);
            marker.bindPopup(edit).openPopup();
            $("#services_input").val(stop[4]);
            edit_forms_load();
        }
    }
    else if(button.id == "cancel"){
        preventDataLost(null);
    }
    else{
        mymap.on("mousemove",function(){$('.leaflet-container').css('cursor','crosshair');});
        remove();
        mymap.on('click', addMarker);
    }
}
function remove(){
    var marker = getMarker(lastmarkeropen);
    if(!(marker === undefined || marker === null)){
        marker.remove();
    }
}
function markerOpen(e){
    preventDataLost(e);
    lastmarkeropen = e;
}
function editMarker(button){
    if(button.id == "button_accept_position"){
        var marker = getMarker(lastmarkeropen);
        if(!(marker === undefined || marker === null)){
            
        }
    }
}
function getMarker(lastmarkeropen){
    var length = markerslist.length;
    for(var i=0; i < length; i++){
        if(markerslist[i]._latlng.lat == lastmarkeropen.latlng.lat && markerslist[i]._latlng.lon == lastmarkeropen.latlng.lon
            || markerslist[i]._latlng.lat == lastmarkeropen.latlng.lat && markerslist[i]._latlng.lng == lastmarkeropen.latlng.lon
            || markerslist[i]._latlng.lat == lastmarkeropen.latlng.lat && markerslist[i]._latlng.lng == lastmarkeropen.latlng.lng){
            return markerslist[i];
        }
    }
    return null;
}
function preventDataLost(e){
    if(flag_edit){
        var services = '<div class="title_marker"><b>'+lastmarkeropen.name+'</b></div>';
        var aux = lastmarkeropen.services.split("-");
        for(var j=0;j<aux.length;j++){
            if(j%6 == 0 && j != 0){
                services += '<br>';
            }
            services += '<div class="service_marker">'+aux[j]+'</div>';            
        }
        services += '<br><button id="button_edit_static_stop" type="button" class="btn btn-default" onclick="newMarkerProcess(this)">Editar</button>';
        var marker = getMarker(lastmarkeropen);
        marker.bindPopup(services);
        flag_edit = 0;
    }
}
function Message(response){
    var message = $("#message");
    if(response == "success"){
        message.removeClass( "alert alert-danger" );
        message.addClass( "alert alert-success" );
        message.append("<strong>Guardado</strong> Se han guardado los cambios.");
    }
    else{
        message.removeClass( "alert alert-success" );
        message.addClass( "alert alert-danger" );
        message.append("<strong>Error</strong> Ha ocurrido un error.");
    }
    message.show(500);
    setTimeout(function(){
        message.hide(1000);
    }, 3000);
}

function menuListener(e){
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
}
