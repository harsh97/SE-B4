$(document).ready(function(){
    var tripID;
    $('.cancelHandeller').click((event) => {
        tripID =  event.target.parentElement.parentElement.parentElement.id;
        console.log(`in cancell handeller trip id   ${tripID}`);
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
        
       tripID1 = event.target.parentElement.id;
        console.log(`tripid1  in change address handeller ${tripID1}`);
        tripID2 = event.target.parentElement.parentElement.id;
        tripID3 = event.target.parentElement.parentElement.parentElement.id;
        console.log(`tripid2  ${tripID2}`);
        console.log(`tripid3  ${tripID3}`);



       //tripID = event.target.parentElement.parentElement.parentElement.parentElement.parentElement.id;
        //console.log(`came to handeller ${tripID}`);
         const [latitude, longitude] = $("#end").val().split(",");
         usn = document.getElementById("studentUSN").innerHTML;
         usn = usn.replace(/\s+/g,'');
         var data = {usn:usn, tripID:tripID2, 'latitude':latitude, 'longitude':longitude}
         var url = '/changeAddress';
         console.log(`to send request tripID ${data.tripID}  latitude:${data.latitude}`);
         sendRequest(data,url);
    //css()
    /*
    Metro.dialog.create({
        title: "Change Address",
        content: `<div data-role="panel">	
                    <div id="map" style="height:200px"></div>	
                </div>	
                <input class="mt-4 mb-4 ml-2 mr-2" type="text" data-role="input" id="end" data-prepend="Lat.,Long." style="width:100%!important;" disabled="disabled"/>	,
        actions: 
        [
            {
                caption: "Ok",
                cls: "js-dialog-close alert",
                onclick: function() {
                    alert('changeAddress ok');
                },
                
            },
            {
                caption: "Cancel",
                cls: "js-dialog-close",
            }
        ]
        });

    */
    });
    
<<<<<<< HEAD


    $('.changeTimeHandeller').click((event) => {
        tripID =  event.target.parentElement.parentElement.parentElement.id;
        console.log(`in cancell handeller trip id   ${tripID}`);
        // var myLib = {
        //     time: {
        //         set:function(val){
        //             console.log(val);
        //         }
        //     }
        // }
        Metro.dialog.create({
        title: "Change Time",
        content: `<input data-role="timepicker" id ="time1" data-on-set="console.log(arguments[0])">`,
       // content: `<input data-role="timepicker" data-on-set="func1(arguments[0])">`,
      // content: `<input data-role="timepicker" id ="time1" data-on-set="myLib.time.set">`,
        actions: 
        [
            {
                caption: "OK",
                cls: "js-dialog-close alert",
                // onclick: function(){
                //     temp1 =$('#time1').val;
                //     console.log(`value in temp ${temp1}`  );
                //     changeTime;  
                onclick: changeTime ,
                    
            },
            {
                caption: "Cancel",
                cls: "js-dialog-close",
            }
        ]

        // myLib = {
        //     time: {
        //         set:function(val){
        //             console.log(val);
        //         }
        //     }
        // }        
        });

        // function func1(){
        //     console.log(`came here`);
        // }
        // var myLib ={
        //     time: {
        //         set:function(val){
        //             console.log(`camehere`);
        //             console.log(val);
        //             console.log(`Inside function set : ${val} time here`);
        //             console.log(`Inside function set : ${val1} time here`);
        //         }
        //     }
        // }

        

    });

    performAction  = (responseUser) => {
        if(responseUser.action == "cancelTrip"){
            $("#" +tripID).remove();
        }
        else if(responseUser.action == "changeAdd"){
            console.log(`Change Address Done`);
        }
        else if(responseUser.action == "changeTime"){
            console.log(`Change Time Done`);
        }
    }

    function changeTime() {
        usn1 = document.getElementById("studentUSN").innerHTML;
        usn = usn1.replace(/\s+/g,'');
        var testTime = '17:00:00';
        var data = {usn:usn , tripID: tripID, timing: testTime};
        console.log(`tripId: ${data.tripID} Usn:  ${data.usn}  time: ${data.timing}}`);
        var url = '/changeTime';
        sendRequest(data, url);
=======
    function cancelTrip () {
        usn1 = document.getElementById("studentUSN").innerHTML;
        usn = usn1.replace(/\s+/g,'');
        var data = {usn: usn , tripID :tripID};
        var url = '/cancelTrip';
        cancelRequest(data,url);
>>>>>>> bdfb5b9ec5e8aaed70cc6add6ed1cd09d8176952
    }

    function cancelTrip () {   
        usn1 = document.getElementById("studentUSN").innerHTML;
        usn = usn1.replace(/\s+/g,'');
        var data = {usn: usn , tripID :tripID};
        console.log(`tripid  from cancel trip${tripID}`);
        var url = '/cancelTrip';
        sendRequest(data,url);
    }

    displayError = (error) => {
        console.log(error);
    }

<<<<<<< HEAD
    sendRequest =(data,url) => { 
        console.log(`sending request`);
=======
    cancelRequest =(data,url) => {
>>>>>>> bdfb5b9ec5e8aaed70cc6add6ed1cd09d8176952
        $.ajax({
            url:url,
            data:data,
            method:'PUT',
            success:performAction,
            error:displayError
        });
    }

    $('#SOS').click(() => {
        const usn = document.getElementById('studentUSN').innerHTML;
        const pickupAddress = document.getElementById('pickUp').innerHTML;
        const dropAddress = document.getElementById('drop').innerHTML;
        emergencyRequest({usn: usn.replace(/\s+/g, ''), pickUp: pickupAddress, drop: dropAddress}, '/sos');
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
