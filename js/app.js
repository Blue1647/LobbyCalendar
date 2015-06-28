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
                console.log(new Date(event.end.dateTime).toString('hh:mm tt'));
                today(event.summary, startDate, startTime, endTime);

			}
	};
})
console.log("Today = " + new Date().getDate().toString());
console.log(typeof new Date().getDate());
function today(title, date, startTime, endTime) {
    var pre = document.getElementById('todayOutput');
    var titleNode = document.createTextNode(title + '\n');
    var dateNode = document.createTextNode(date + '\n');
    var startTimeNode = document.createTextNode(startTime +'\n');
    var endTimeNode = document.createTextNode(endTime +'\n');
    var dash = document.createTextNode("- ");
    var br = document.createElement("br");
    pre.appendChild(br);
    pre.appendChild(dateNode);
    pre.appendChild(br);
    pre.appendChild(startTimeNode);
    pre.appendChild(dash);
    pre.appendChild(endTimeNode);
    pre.appendChild(br);
    pre.appendChild(dash);
    pre.appendChild(br);
    pre.appendChild(titleNode);
    pre.appendChild(br);
}
function tomorrow(title, date){
    var pre = document.getElementById('tomOutput');
    var titleContent = document.createTextNode(title + '\n');
    var dateContent = document.createTextNode(date + '\n');
    var br = document.createElement("br");
    pre.appendChild(br);
    pre.appendChild(titleContent);
    pre.appendChild(dateContent);
}
function nextDay(title,date){
    var pre = document.getElementById('nextDayOutput');
    var titleContent = document.createTextNode(title + '\n');
    var dateContent = document.createTextNode(date + '\n');
    var br = document.createElement("br");
    pre.appendChild(br);
    pre.appendChild(titleContent);
    pre.appendChild(dateContent);
}}
