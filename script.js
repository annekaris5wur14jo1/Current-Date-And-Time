function updateDateTime(){
    const now = new Date();
    //current date
    document.getElementById("currentDateTime").textContent= now.toLocaleString();
// timezone
document.getElementById("timezone").textContent= Intl.DateTimeFormat().resolvedOptions().timeZone;

// daylight saving time
document.getElementById("dst").textContent = now.isDstObserved() ? "yes" : "no";

// day of the week
const daysOfWeek = ["Sun","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
document.getElementById("dayOfWeek").textContent = daysOfWeek[now.getDay()];

// week number
const weekNumber = getWeekNumber(now);
document.getElementById("weekNumber").textContent = weekNumber;

// months
const months =["January","February","March","April","May","June","July","August","September","October","November","December"]
document.getElementById("month").textContent = months[now.getMonth()];

// year
document.getElementById("year").textContent = now.getFullYear();

// hour, minutes, seconds
document.getElementById("hour").textContent = now.getHours().toString().padStart(2,"0");
document.getElementById("minutes").textContent = now.getMinutes().toString().padStart(2,"0");
document.getElementById("seconds").textContent = now.getSeconds().toString().padStart(2,"0");
document.getElementById("milliseconds").textContent = now.getMilliseconds().toString().padStart(2,"0");

// unix timestamp
document.getElementById("unixTimestamp").textContent = Math.floor(now.getTime()/ 1000);

}

function getWeekNumber(d){
d = new Date(Date.UTC(d.getFullYear(),d.getMonth(),d.getDate()));
d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
}

// check if daylight saving time is available
Date.prototype.isDstObserved = function(){
    const jan = new Date(this.getFullYear(), 0,1).getTimezoneOffset();
    const jul = new Date(this.getFullYear(), 6,1).getTimezoneOffset();
    return Math.max(jan, jul)!== this.getTimezoneOffset();
  }



// update time every second
setInterval(updateDateTime,1000);
// initial update
updateDateTime();

// button click event
document.getElementById('btn').addEventListener('click', function() {
    alert('Date and time updated!');
    updateDateTime();
  });