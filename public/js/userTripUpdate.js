$(document).ready(function(){
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
    


    function cancelTrip () {
        usn1 = document.getElementById("studentUSN").innerHTML;
        usn = usn1.replace(/\s+/g,'');
        var data = {usn: usn , tripID :tripID};
        var url = '/userTripUpdate';
        cancelRequest(data,url);
    }

    removerTrip = (responseUser) => {
        $("#" +tripID).remove();

    }

    displayError = (error) => {
        console.log(error);
    }

    cancelRequest =(data,url) => {
       
        $.ajax({
            url:url,
            data:data,
            method:'PUT',
            success:removerTrip,
            error:displayError
        });
    }
});


