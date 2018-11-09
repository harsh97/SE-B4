$(document).ready(function(){
    
    function selectTab(id) {
        var others = document.getElementsByClassName("hide");
        for (var i = 0; i < others.length; i++) {
            others[i].style.display = "none";
        }
        var tab = document.getElementById(id);
        tab.style.display = "block";
    }

    renderUsers = (users) => {
        var userApprovalTab = document.getElementById('student-approval-tab');
        for(var Index=0 ; Index < users.length ; Index++) {
            var User = document.createElement('div');
            User.className = 'approve-student';
            User.id = users[Index].usn;
            User.innerHTML = `
                <div class="approve-student-details">
                  <div><p>User ${Index}</p></div>
                   <div>USN : <span id="usn">${users[Index].usn}</span></div>
                </div>
                <div class="approve-student-buttons">
                    <button  class="approve"> Approve</button>
                </div>
                `;
            userApprovalTab.appendChild(User);
        }
    }

    renderTrips = (trips) => {
        var trackTripsTab = document.getElementById('track-trips-tab');
        for(var tripIndex=0 ; tripIndex < trips.length ; tripIndex++) {
            var trip = document.createElement('div');
            trip.className = 'approve-student';
            trip.innerHTML = `
                        <div class="approve-student-details">
                            <div><p>Route Number : ${trips[tripIndex].routenumber}</p></div>
                            <div><p>Bus Number   : ${trips[tripIndex].busnumber}</p></div>
                            <div><p>Driver Name : ${trips[tripIndex].drivername}</p></div>
                            <div><p>Time : ${trips[tripIndex].timing}</p></div>
                            <div><p>Number of Students : ${trips[tripIndex].noofstudents}</p></div>
                        </div>
                        <div class="approve-student-buttons">
                            <button class="button trips${tripIndex}">Track Location</button>
                        </div>
                            `;
            trackTripsTab.appendChild(trip);
        }
    }

    displayError = (error) => {
        console.log(error);
    }

    getUsersRequest = (url) => {
        $.ajax({
            url:url,
            method:'GET',
            success:renderUsers,
            error:displayError
        });
    }
    
    getTripsRequest = (url) => {
        $.ajax({
            url:url,
            method:'GET',
            success:renderTrips,
            error:displayError
        });
    }

    $('#track-trips').on('click', () => {
        getTripsRequest('/tripList');
        selectTab('track-trips-tab');
        
    });
    $('#block-user').on('click',() => {
        selectTab('block-user-tab')
    });
    $('#student-approval').on('click',() => {
        selectTab('student-approval-tab')
    });

    function dropdownStudentsList() {
        var input, filter, ul, li, a, i;
        input = document.getElementById("myInput");
        filter = input.value.toUpperCase();
        ul = document.getElementById("myUL");
        li = ul.getElementsByTagName("li");
        for (i = 0; i < li.length; i++) {
            a = li[i].getElementsByTagName("a")[0];
            if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
                li[i].style.display = "";
            }
            else {
                li[i].style.display = "none";
            }
        }
    }

    $('#myInput').on('keyup', () => {
        dropdownStudentsList();
    });


removeStudent = (student) => {
    alert("Approved the student successfully");
   $("#" +student.Id).remove();
}


$('#track-trips').on('click', () => {
    getTripsRequest('/tripList');
    selectTab('track-trips-tab');
    
});
$('#block-user').on('click',() => {
    selectTab('block-user-tab');
});
$('#student-approval').on('click',() => {
    getUsersRequest('/userList');
    selectTab('student-approval-tab');
});

});

adminRequest = (data, url) => {
    $.ajax({
        async: true,
        url:url,
        data:data,
        method:'POST',
        success:removeStudent,
        error:displayError
    });    
}


$('body').on('click','.approve',( function() {
    console.log("here");
    get1=$(this).parent().parent().children().children().children('span').text();
    var data = { AId : get1,Func:"approve"};
    var url = '/admin/approve';  
    adminRequest(data, url);
}));
