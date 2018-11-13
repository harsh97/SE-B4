$(document).ready(function(){
    var map = new L.Map('leafletMap', { zoom: 9, center: new L.latLng([12.971599, 77.594566]), zoomControl: false });

    map.addLayer(new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'));	//base layer
    
    var endMarker;
    var popup = L.popup();
    
    function onMapClick(e) {
        if (endMarker) {
            endMarker.remove(map);
        }
        popup.setLatLng(e.latlng);
        endMarker = L.marker(e.latlng).addTo(map);
        var l = e.latlng.toString();
        var lllength = l.length;
        $('#end').val(l.slice(7, lllength - 1));
    }
        
    map.on('click', onMapClick);
    $('#map').on('click',function(){
                    var empty = false;
                    $('#end').each(function(){
                        if ($(this).val().length == 0){
                            empty = true;
                        }
                    });
                    
                    if (empty){
                        $('#regForm').attr('disabled','disabled');
                    }
                    else{
                        $('#regForm').removeAttr('disabled');
                    }
                });
});
