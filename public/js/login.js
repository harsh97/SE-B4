$('#forgotPassword').on('click', function(){
    Metro.dialog.create({
        title: "Enter the USN",
        content: `<input type="text" id="usn" data-role="input" data-prepend="<span class='mif-envelop'>" placeholder="Enter your USN..." required>`,
        actions: [
            {
                caption: "Send",
                cls: "js-dialog-close alert",
                onclick: function(){
                    var url = `/forgotPassword`;
                    data = { usn : $('#usn').val() };
                    success = (msg) => {
                        alert('Sent successfully'+msg);
                    }
                    $.ajax({
                        type: "POST",
                        url: url,
                        data: data,
                        success: success,
                    });
                }
            },
            {
                caption: "Cancel",
                cls: "js-dialog-close",
                onclick: function(){
                }
            }
        ]
    });
    return false;
});
