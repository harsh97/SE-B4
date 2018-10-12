$('#usn,#password,#dId,#pass').keyup(function(){
    if ($(this).val()) {
        $('[id^=login]').attr('disabled', false);
    }
    else {
        $('[id^=login]').attr('disabled', true);
    }
});

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

$('#loginStudent').click(() => {
    var data = { usn : $('#usn').val(), pass: $('#pass').val(), id:'student'};
    var url = '/login/student';  
    loginRequest(data, url);
});

$('#loginDriver').click(() => {
    var data = { dId : $('#dId').val(), pass: $('#pass').val(),id:'driver'};
    var url = '/login/driver';  
    loginRequest(data, url);
});


// Ajax request to check the existence of USN
loginRequest = (data, url) => {
    $.ajax({
        url:url,
        data:data,
        method:'POST',
        success:displayMessage
    });    
}