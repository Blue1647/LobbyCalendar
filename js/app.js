var calendarUrl = "https://www.googleapis.com/calendar/v3/calendars/oifj0r6ik0s58t7vm457irf0lk@group.calendar.google.com/events?key=AIzaSyCG4-gSYXFsIp_R7p1e7yuzQ64xgTKwhcU&singleEvents=true&orderBy=startTime&maxResults=20&timeMin=" + new Date().toJSON();

window.onload = function(){
    getCalendarData();
}

function getCalendarData() {
    var httpReq = new XMLHttpRequest();
    httpReq.onreadystatechange = function () {
        if (httpReq.readyState === 4) {
            if (httpReq.status === 200) {
                var data = JSON.parse(httpReq.responseText);
                listUpcomingEvents(data.items.slice(0, 10));
            }
        }
    };
    httpReq.open('GET', calendarUrl);
    httpReq.send();
}
function listUpcomingEvents(events) {
    if (events.length > 0) {
        events.forEach(function (event) {
            insertEventIntoTable(event)
        });
    }
}
function insertEventIntoTable(event) {
    var table = document.getElementById('table-body');
    var eventDate = new Date(event.start.dateTime).toString('ddd MM/dd/yyyy');
    var startTime = new Date(event.start.dateTime).toString('hh:mm tt');
    var endTime = new Date(event.end.dateTime).toString('hh:mm tt');
    var timeSpan = startTime + " - " + endTime;
    var eventTitle = event.summary;
    var eventLocation = event.location || 'No specific room';
    var dateNode = document.createTextNode(eventDate);
    var timeNode = document.createTextNode(timeSpan);
    var titleNode = document.createTextNode(eventTitle);
    if (eventDate == new Date().toString('ddd MMMM/dd/yyyy')) {
        table.innerHTML += "<tr class =\"success\"><td>" + eventDate + "</td>" + "<td>" + timeSpan + "</td>" + "<td>" + eventTitle + "</td>" + "<td>" + eventLocation + "</td></tr>"
    }
    else if (date != new Date().toString('ddd MMMM/dd/yyyy')) {
        table.innerHTML += "<tr class =\"info\"><td>" + eventDate + "</td>" + "<td>" + timeSpan + "</td>" + "<td>" + eventTitle + "</td>" + "<td>" + eventLocation + "</td></tr>"
    }
}