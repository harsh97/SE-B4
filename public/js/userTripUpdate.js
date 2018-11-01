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


const cancelTrip = () =>{
    usn = document.getElementById("studentUSN").innerHTML;
    console.log(`cancel trip function with user ${usn}`);
    var data = {usn: usn , tripId : 1};
    var url = '/userTripUpdate';
    cancelRequest(data,url);
    console.log('cancel trip function2');
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
    $.ajax({
        url:url,
        data:data,
        method:'PUT',
        success:reloadPage,
        error:displayError
    });
}