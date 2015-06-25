var CLIENT_ID = '739379389102-e2e5g2i4pjbc48icc9h98q2n9lcr33ai.apps.googleusercontent.com';
var SCOPES = ["https://www.googlepis.com/auth/calendar.readonly"];

console.log("app.js loaded!");

function checkAuth () {
	gapi.auth.authorize(
	{
		'client_id': CLIENT_ID,
		'scope': SCOPES,
		'immediate': true

	}, handleAuthResult);
}
function handleAuthResult (authResult) {
	var authorizeDiv = document.getElementById('authorize-div');
	if (authResult && !authResult.error) {
		authorizeDiv.style.display = 'none';
		loadCalendarApi();
	}
	else {
		authorizeDiv.style.display = 'inline';		
	}
}
function handleAuthClick (event) {
	gapi.auth.authorize(
	{client_id: CLIENT_ID, scope: SCOPES, immediate: false},
	handleAuthResult);
	return false;
}
function loadCalendarApi () {
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
	request.execute(function (resp){
		var events = resp.items;
		appendPre('Upcoming events:');

		if (events.length > 0){
			for (var i = 0; i <events.length; i++) {
				var event = events[i];
				var when = event.start.date;
				if(!when){
					when = event.start.date;
				}else {
				appendPre('No upcoming events found');
			}
				appendPre(event.summary + when)


			}
			
		
	};
})

function appendPre(message) {
        var pre = document.getElementById('output');
        var textContent = document.createTextNode(message + '\n');
        pre.appendChild(textContent);
}}