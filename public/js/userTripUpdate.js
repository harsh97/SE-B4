$(document).ready(function(){
    $('#CancelTrip').click(() => {
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
    
    `
    $('#ChangeTimeConfirm').click(()=>{
        changeTime();
    });

    function changeTime(){
        usn = document.getElementById("studentUSN").innerHTML;
        tripID = document.getElementById("tripID").innerHTML;
    }
    `


    function cancelTrip () {
        usn = document.getElementById("studentUSN").innerHTML;
        var tripID = document.getElementById("tripID").innerHTML;
        console.log(`cancel trip function with user ${usn} and tripId ${tripID}`);
        var data = {usn: usn , tripID : tripID};
        console.log(`${data.usn}  ${data.tripID}`);
        var url = '/userTripUpdate';
        cancelRequest(data,url);
    }

    reloadPage = (resHTML) => {
        
        console.log('Im still remaining');
        html = $.parseHTML(resHTML, true);
        $('body').html(html);
        console.log('Im still remaining2');

    }

    displayError = (error) => {
        console.log(`resulted in error`);
        console.log(error);
    }

    cancelRequest =(data,url) => {
        console.log(`sending request ${data.usn}  ${data.tripID}`);
        $.ajax({
            url:url,
            data:data,
            method:'PUT',
            success:reloadPage,
            error:displayError
        });
    }
});


