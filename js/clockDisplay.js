$(document).ready(
    function () {
        setInterval(runFunction, 1000);
    })

function runFunction() {
    var date = new Date().toString("dddd, MMMM d, yyyy");
    var time = new Date().toString("h:mm tt");
    var dateField = document.getElementById('date');
    var timeField = document.getElementById('time');
    dateField.innerHTML = date;
    timeField.innerHTML = time;
};
