/**
 * Alert the user through a message if the USN is avaialble or not 
 */
$('#usn').change(() => {
    var data = { usn : $('#usn').val() };
    var url = "/existUSN"; 
    // Function which displays whether the USN is avaialable for use or not
    displayMessage = (res) => {
        $("#usn_response").show();
        if(res.exist) {
            $("#usn_response").html("<span class='not-exists'>* USN Already in use.</span>");     
            $('#regForm').prop('disabled', true);  
        }
        else {
            $("#usn_response").html("<span class='exists'>Available.</span>");
            $('#regForm').prop('disabled', false);
        }
    }
    // Ajax request to check the existence of USN
    $.ajax({
        url:url,
        data:data,
        success:displayMessage
    });
});

/**
 * Registration form 
 */
$("#regForm").click(function(){
    var name  = $("#name").val();
    var usn = $("#usn").val();
    var email = $("#email").val();
    var contact = $("#contact").val();
    var parentName = $("#parentName").val();
    var parentContact = $("#parentContact").val();
    var [latitude, longitude] = $("#end").val().split(",");
    var regData ={'name': name,'usn': usn, 'email': email, 'contact': contact, 'parentName': parentName, 'parentContact': parentContact};
      $.ajax({
        type : 'POST',
        url : '/registerStudent',
        data : regData,
        success: function(data){
            $("#mainDiv").html(data);
        }
      });
  });