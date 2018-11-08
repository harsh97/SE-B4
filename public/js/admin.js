$(document).ready(function(){
    
    function selectTab(id) {
        var others = document.getElementsByClassName("hide");
        for (var i = 0; i < others.length; i++) {
            others[i].style.display = "none";
        }
        var tab = document.getElementById(id);
        tab.style.display = "block";
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
});