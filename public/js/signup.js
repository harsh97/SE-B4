
$('#usn').change(() => {
    var host = location.protocol + '//' + location.host;
    var url = `${host}/existUSN`;
    success = (res) => {
        $("#usn_response").show();
        if(res.exist){
            $("#usn_response").html("<span class='not-exists'>* USN Already in use.</span>");       
        }
        else{
            $("#usn_response").html("<span class='exists'>Available.</span>");
        }
    }
    var data = { usn : $('#usn').val() };
    $.ajax({
    url:url,
    data:data,
    success:success
});
});
