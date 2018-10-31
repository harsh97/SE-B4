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
});


const cancelTrip =(user) =>{
    console.log('cancel trip function');
    var data = user;
    var url = '/userTripUpdate';
    cancelRequest(data,url);
    console.log('cancel trip function');
}

reloadPage = () => {
    //to be filled
    console.log('Im still remaining');
}

displayError = (error) => {
    console.log(error);
}

cancelRequest =(data,url) => {
    $.ajax({
        url:url,
        data:data,
        method:'PUT',
        success:reloadPage,
        error:displayError
    });
}