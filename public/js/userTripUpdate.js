$(document).ready(function(){
    var tripID;
    $('.cancelHandeller').click((event) => {
        tripID =  event.target.parentElement.parentElement.parentElement.id;
        Metro.dialog.create({
        title: "Cancel Trip",
        content: "<div>Are you sure you want to cancel this trip ?</div>",
        actions: 
        [
            {
                caption: "Yes",
                cls: "js-dialog-close alert",
                onclick: cancelTrip,
                
            },
            {
                caption: "No",
                cls: "js-dialog-close",
            }
        ]
        });
    });


    
    // Make use of ids rather than classes
    $('.changeAddHandeller').click((event)=>{
        tripID = event.target.parentElement.parentElement.parentElement.id;
        Metro.dialog.open('#changeAddressClick');
      
    });

    $('.changeAddress').click(()=>{
        const [latitude, longitude] = $("#end").val().split(",");
         usn = document.getElementById("studentUSN").innerHTML;
         usn = usn.replace(/\s+/g,'');
         var data = {usn:usn, tripID:tripID, 'latitude':latitude, 'longitude':longitude}
         var url = '/changeAddress';
         sendRequest(data,url);
    })
    


    $('.changeTimeHandeller').click((event) => {
        tripID =  event.target.parentElement.parentElement.parentElement.id;
        Metro.dialog.create({
        title: "Change Time",
        content: `<input data-role="timepicker" id ="time"><p> Valid trip timing 12:45P.M and 3:30P.M only</p>`,
        actions: 
        [
            {
                caption: "OK",
                cls: "js-dialog-close alert",
                onclick: changeTime ,
                    
            },
            {
                caption: "Cancel",
                cls: "js-dialog-close",
            }
        ]
    
        });

    });

    performAction  = (responseUser) => {
        if(responseUser.action == "cancelTrip"){
            $("#" +tripID).remove();
        }
        /*
        else if(responseUser.action == "changeAddress"){
            console.log(`Change Address Done`);
        }
        else if(responseUser.action == "changeTime"){
            console.log(`Change Time Done`);
        }
        */
    }

    function changeTime() {
        usn1 = document.getElementById("studentUSN").innerHTML;
        usn = usn1.replace(/\s+/g,'');
        time = document.getElementById("time");
        var data = {usn:usn , tripID: tripID, timing: time.value};
        var url = '/changeTime';
        sendRequest(data, url);
    }

    function cancelTrip () {   
        usn1 = document.getElementById("studentUSN").innerHTML;
        usn = usn1.replace(/\s+/g,'');
        var data = {usn: usn , tripID :tripID};
        var url = '/cancelTrip';
        sendRequest(data,url);
    }

    displayError = (error) => {
        console.log(error);
    }

    sendRequest =(data,url) => { 
        $.ajax({
            url:url,
            data:data,
            method:'PUT',
            success:performAction,
            error:displayError
        });
    }

    $('#SOS').click(() => {
        if($('#pickUp').length) {
            const usn = document.getElementById('studentUSN').innerHTML;
            const pickupAddress = document.getElementById('pickUp').innerHTML;
            const time = document.getElementById('timeOfPickUp').innerHTML;
            const busNumber = document.getElementById('busNumber').innerHTML;
            const driverName = document.getElementById('driverName').innerHTML;
            const contactNumber = document.getElementById('contactNumber').innerHTML;
            emergencyRequest({usn: usn.replace(/\s+/g, ''), pickUp: pickupAddress, time: time, busNumber: busNumber, driverName: driverName, contactNumber: contactNumber}, '/sos');
        }
        else {
            alert('No current ongoing trips');
        }
    });
    
    emergencyMessage = () => {
        alert('Alert sent to admin');
    }
    
    emergencyError = (error) => {
        console.log(error);
        alert('Unable to alert the admin');
    }
    
    emergencyRequest = (data, url) => {
        $.ajax({
            url:url,
            data:data,
            method:'GET',
            success:emergencyMessage,
            error:emergencyError
        });    
    }
});
