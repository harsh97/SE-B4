/**
 * Alert the user through a message if the USN is avaialble or not 
 */
$('#usn').change(() => {
    var data = { usn : $('#usn').val() };
    var url = `${location.protocol}//${location.host}/existUSN`;
    // Function which displays whether the USN is avaialable for use or not
    displayMessage = (res) => {
        $("#usn_response").show();
        if(res.exist) {
            $("#usn_response").html("<span class='not-exists'>* USN Already in use.</span>");       
        }
        else {
            $("#usn_response").html("<span class='exists'>Available.</span>");
        }
    }
    // Ajax request to check the existence of USN
    $.ajax({
        url:url,
        data:data,
        success:displayMessage
    });
});
