var Stops = Class.extend({
	init: function(){
		this.stops = new Array();
		this.stops_map = new Map();
	},
	getStops: function(){
		return this.stops;
	},
	addStop: function(stop_id,lat,lon,name,services){
		this.stops[this.stops.length] = new Array();
		this.stops[this.stops.length-1].push(stop_id);
		this.stops[this.stops.length-1].push(lat);
		this.stops[this.stops.length-1].push(lon);
		this.stops[this.stops.length-1].push(name);
		this.stops[this.stops.length-1].push(services);
		this.stops_map.set(name,(this.stops.length-1));
	},
	getStop: function(name){
		return this.stops[this.stops_map.get(name)];
	}
});

var Services = Class.extend({
	init: function(){

	},
	addService: function(service_name){
		
	}
});

var MarkerController = Class.extend({
	init: function(map){
		this.map = map;
		this.markers = new Array();
	},
	getAllMarker(){
		return this.merkers;
	},
	addMarker(marker){
		this.markers.push(marker);
	},
	getMarker(lastmarkeropen){
		var length = this.markers.length;
		for(var i=0; i < length; i++){
			if(markers[i]._latlng.lat == lastmarkeropen.latlng.lat && markers._latlng.lon == lastmarkeropen.latlng.lon){
				return markers[i];
			}
		}
		return null;
	},
	editMarker(lastmarkeropen,bindpopup){
		this.marker = this.getMarker(lastmarkeropen);
		this.marker.bindPopup(bindpopup);
	}
});