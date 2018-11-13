function initMap(e) {
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 6,
        center: {lat: 41.85, lng: -87.65}
    });
    directionsDisplay.setMap(map);

    document.getElementById('trackLocation').addEventListener('click', function() {
        calculateAndDisplayRoute(directionsService, directionsDisplay, e);
    });
}

    

function displayError(err) {
    console.log(err);
}

function getRouteLocationsByTrip(id,cb) {
$.ajax({
    async: true,
    url:'/getRoutePointsById',
    data:{id:id},
    method:'GET',
    success:function(data) {
        cb(data)
    },
    error:displayError
});
}

function calculateAndDisplayRoute(directionsService, directionsDisplay, e) {
    getRouteLocationsByTrip(document.getElementById('driverId').innerHTML,function(dataPoints){
        var coordsRaw = dataPoints.map(value => (Object.values(value).toString()))
        // console.log(coordsRaw)
        var coords = [];
        var temp=0;
        for(var i=0;i<coordsRaw.length-1;i++)
        {
            temp=coordsRaw[i].split(",");
            temp.map(function(y,i,arr){arr[i]=parseFloat(y)})
            var latlang=new google.maps.LatLng(temp[0], temp[1]);
            coords.push({
                location: latlang,
                stopover: true
            });
        }
        var collegeLocation =["12.9345","77.5345"]
        directionsService.route({
            origin: new google.maps.LatLng(collegeLocation[0], collegeLocation[1]), // {lat: e.coords.latitude,lng: e.coords.longitude}, // 
            destination: new google.maps.LatLng(collegeLocation[0], collegeLocation[1]),
            waypoints: coords,
            optimizeWaypoints: true,
            travelMode: 'DRIVING'
        }, function(response, status) {
            if (status === 'OK') {
                directionsDisplay.setDirections(response);
            } else {
                window.alert('Directions request failed due to ' + status);
            }
        });
    });
}

function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            alert("User denied the request for Geolocation.")
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Location information is unavailable.")
            break;
        case error.TIMEOUT:
            alert("The request to get user location timed out.")
            break;
        case error.UNKNOWN_ERROR:
            alert("An unknown error occurred.")
            break;
    }
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(initMap, showError);
    }
    else {
        alert("Geolocation is not supported by this browser.");
    }
}
