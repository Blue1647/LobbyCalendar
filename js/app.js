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
		//today('Upcoming events:');

		if (events.length > 0) {
			for (var i = 0; i <events.length; i++) {
				var event = events[i];
				var when = event.start.date;
                var startDate = new Date(event.start.dateTime).toString('ddd MMMM/dd/yyyy');
                var startTime = new Date(event.start.dateTime).toString('hh:mm tt');
                var endDate = (new Date(event.end.dateTime).getDate());
                var endTime = new Date(event.end.dateTime).toString('hh:mm tt');
                var todayDate = new Date().getDate();
                var tomDate = todayDate + 1;
				if(!when){
					when = event.start.date;
				}
                insertEventIntoTable(startDate, startTime, endTime, event.summary);

			}
	};
})
function today(title, date, startTime, endTime) {
    var pre = document.getElementById('todayOutput');
    var titleNode = document.createTextNode(title + '\n');
    var dateNode = document.createTextNode(date + '\n');
    var startTimeNode = document.createTextNode(startTime +'\n');
    var endTimeNode = document.createTextNode(endTime +'\n');
    var dash = document.createTextNode("- ");
    var dash2 = document.createTextNode("-");
    var br = document.createElement("br");
    pre.appendChild(br);
    pre.appendChild(dateNode);
    pre.appendChild(br);
    pre.appendChild(startTimeNode);
    pre.appendChild(br);
    pre.appendChild(dash);
    pre.appendChild(br);
    pre.appendChild(endTimeNode);
    pre.appendChild(br);
    pre.appendChild(dash2);
    pre.appendChild(br);
    pre.appendChild(br);
    pre.appendChild(titleNode);
    pre.appendChild(br);
}
function insertEventIntoTable(date, startTime, endTime, title) {
    var table = document.getElementById('table-body');
    var insertDate = date;
    var insertTime = startTime + " - " + endTime;
    var insertTitle = title;
    var dateNode = document.createTextNode(insertDate);
    var timeNode = document.createTextNode(insertTime);
    var titleNode = document.createTextNode(insertTitle);
    table.innerHTML += "<tr><td>" + insertDate + "</td>" + "<td>"+insertTime+"</td>"+"<td>"+insertTitle+"</td></tr>"





    /*table.insertAdjacentHTML('beforeend', '<td>' + insertDate + '</td>');
    table.insertAdjacentHTML('beforeend', '<td>' + insertTime + '</td>');
    table.insertAdjacentHTML('beforeend', '<td>' + insertTitle + '</td>');*/


    /*
            <td id="column">Column content</td>
            <td>Column content</td>
            <td>Column content</td>*/
}
function insertIntoTableRows(content){
    var row = document.createElement("td");
    row.innerHTML = content;
    return row;
}}
