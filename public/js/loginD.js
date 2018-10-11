$('#login').click(() => {
    var data = { dId : $('#dId').val(), pass: $('#pass').val(),id:"driver"};
    var url = `${location.protocol}//${location.host}/login/driver`;
   
    // Function which displays whether the login password is right and takes actions accordingly
   
    displayMessage = (res) => {
        if(res==false)
        {
            $("#usn_response").html("<span class='exists'>Incorrect USN or password</span>");
        }
        else
        {
         html = $.parseHTML(res);
         $('body').html(html);
        }
    }
    
    // Ajax request to check the existence of USN
    $.ajax({
        url:url,
        data:data,
        method:'POST',
        success:displayMessage
    });
});