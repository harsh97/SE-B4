$('#usn,#password').keyup(function(){
    if ($(this).val()) {
        $('#login').attr('disabled', false);
    }
    else {
        $('#login').attr('disabled', true);
    }
});

$('#login').click(() => {
    var data = { usn : $('#usn').val(), pass: $('#pass').val()};
    var url = '/login';
   
    // Function which displays whether the login password is right and takes actions accordingly   
    displayMessage = (resHTML) => {
        if(resHTML==false)
        {
            $("#invalidUSNError").html("<span class='exists'>Incorrect USN or password</span>");
        }
        else
        {
            html = $.parseHTML(resHTML);
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