var CLIENT_ID = '739379389102-e2e5g2i4pjbc48icc9h98q2n9lcr33ai.apps.googleusercontent.com';
var SCOPES = ["https://www.googleapis.com/auth/calendar.readonly"];

console.log("app.js loaded!");

function checkAuth() {
        gapi.auth.authorize(
        {
            'client_id': CLIENT_ID,
            'scope': SCOPES,
            'immediate': true

        }, handleAuthResult);
    }
    function handleAuthResult(authResult) {
        var authorizeDiv = document.getElementById('authorize-div');
        if (authResult && !authResult.error) {
            authorizeDiv.style.display = 'none';
            loadCalendarApi();
        }
        else {
            authorizeDiv.style.display = 'inline';
        }
    }
    function handleAuthClick(event) {
        gapi.auth.authorize(
        {client_id: CLIENT_ID, scope: SCOPES, immediate: false},
        handleAuthResult);
        return false;
    }
    function loadCalendarApi() {
        gapi.client.load('calendar', 'v3', listUpcomingEvents);
    }
    function listUpcomingEvents () {
        var request = gapi.client.calendar.events.list({
            'calendarId': 'oifj0r6ik0s58t7vm457irf0lk@group.calendar.google.com',
            'timeMin': (new Date()).toISOString(),
            'showDeleted': false,
            'singleEvents': true,
            'maxResults': 10,
            'orderBy': 'startTime'
        });
        request.execute(function (resp) {
            var events = resp.items;

            if (events.length > 0) {
                for (var i = 0; i <events.length; i++) {
                    var event = events[i];
                    var when = event.start.date;
                    var startDate = new Date(event.start.dateTime).toString('ddd MMMM/dd/yyyy');
                    var startTime = new Date(event.start.dateTime).toString('hh:mm tt');
                    var endTime = new Date(event.end.dateTime).toString('hh:mm tt');
                    var todayDate = new Date().getDate();
                    var location = event.location;
                    if(!when){
                        when = event.start.date;
                    }
                    insertEventIntoTable(startDate, startTime, endTime, event.summary, location);
                }
        };
    })

    function insertEventIntoTable(date, startTime, endTime, title, location) {
        var table = document.getElementById('table-body');
        var insertDate = date;
        var insertTime = startTime + " - " + endTime;
        var insertTitle = title;
        var insertLocation = location;
        var dateNode = document.createTextNode(insertDate);
        var timeNode = document.createTextNode(insertTime);
        var titleNode = document.createTextNode(insertTitle);
        console.log(location);
        if(date == new Date().toString('ddd MMMM/dd/yyyy')){
            table.innerHTML += "<tr class =\"success\"><td>" + insertDate + "</td>" + "<td>"+insertTime+"</td>"+"<td>"+insertTitle+"</td>"+"<td>"+insertLocation+"</td></tr>"
        }
        else if (date != new Date().toString('ddd MMMM/dd/yyyy')){
            table.innerHTML += "<tr class =\"info\"><td>" + insertDate + "</td>" + "<td>"+insertTime+"</td>"+"<td>"+insertTitle+"</td>"+"<td>"+insertLocation+"</td></tr>"
        }
        else if (location == 'undefined'){
            console.log("is this getting fired?");
            table.innerHTML += "<tr class =\"info\"><td>" + insertDate + "</td>" + "<td>"+insertTime+"</td>"+"<td>"+insertTitle+"</td>"+"<td>No specific room</td></tr>"
        }



    }
}
