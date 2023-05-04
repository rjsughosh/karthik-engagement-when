const born_date = new Date(1990, 06, 22, 0, 0, 0, 0);
const timezoneOffsets = {
  "india": "330",
  "pdt": "-420",
  "mdt": "-360",
  "cdt": "-300",
  "edt": "-240",
  "uk": "60",
  "australia": "600",
  "bahrain": "210"
}

const timezones = {
  '-420': 'America/Seattle',
  '-360': 'America/Denver',
  '-300': 'America/Chicago',
  '-240': 'America/New_York',
  '-150': 'Pacific/Gambier',
  '-120': 'Pacific/Honolulu',
  '-180': 'America/Adak',
  '-480': 'America/Anchorage',
  '-420': 'America/Los_Angeles',
  '-360': 'America/Denver',
  '-300': 'America/Chicago',
  '-240': 'America/New_York',
  "-60": 'Atlantic/Azores',
  "0": 'Europe/London',
  "60": 'Europe/Paris',
  "120": 'Europe/Athens',
  "180": 'Europe/Moscow',
  "210": 'Asia/Tehran',
  "240": 'Asia/Dubai',
  "270": 'Asia/Kabul',
  "300": 'Asia/Karachi',
  "330": 'Asia/Bengaluru IST',
  "345": 'Asia/Kathmandu',
  "360": 'Asia/Dhaka',
  "390": 'Asia/Rangoon',
  "420": 'Asia/Bangkok',
  "480": 'Asia/Hong_Kong',
  "525": 'Australia/Eucla',
  "540": 'Asia/Tokyo',
  "570": 'Australia/Darwin',
  "600": 'Australia/Sydney',
  "630": 'Australia/Lord_Howe',
  "660": 'Pacific/Norfolk',
  "690": 'Pacific/Apia',
  "720": 'Pacific/Auckland',
  "765": 'Pacific/Chatham',
  "780": 'Pacific/Tongatapu',
  "840": 'Pacific/Kiritimati'
};

function getLocation(){
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(async position => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`);
      const data = await response.json();
      const city = data.address.city;
      console.log(city);
    });
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
}



window.onload = function (event) {

  const currentTimezone = getTimezone();
  console.log("currentTimezone", currentTimezone)

  let currentCity = "";
  currentCity = getCityByIP();
  

  const currentDateTime = new Date();
  console.log(currentDateTime)


  const targetDateTimeUTC = new Date(Date.UTC(2023, 4, 8, 4, 30, 0));
  console.log("targetDateTimeUTC", targetDateTimeUTC)

  findDifferenceDate(currentDateTime,targetDateTimeUTC);

  

};

function findDifferenceDate(date1,date2){
  var diffMs = Math.abs(date2 - date1); // difference in milliseconds
  var diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24)); // difference in days
  var diffHours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)); // difference in hours
  var diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60)); // difference in minutes

  console.log(diffDays + " days, " + diffHours + " hours, and " + diffMins + " minutes"); // Output: "2 days, 2 hours, and 30 minutes"
  document.getElementById("days").innerHTML = diffDays;
  document.getElementById("hours").innerHTML = diffHours;
  document.getElementById("minutes").innerHTML = diffMins;
}

function getDateTimeinSpecifiedTimezone(timezone, date){
  // Adjust the time zone offset
  date.setMinutes(date.getMinutes() + parseInt(timezoneOffsets[timezone]));
  return date
}

function getTimezone(){
  const currentDate = new Date();
  // Get the current time zone offset in minutes
  const timeZoneOffset = -1 * (currentDate.getTimezoneOffset());
  const currentTimezone = timezones[timeZoneOffset];
  return currentTimezone;
}

async function getCityByIP() {
  const response = await fetch("https://ipapi.co/json/");
  const data = await response.json();
  const city = data.city;
  document.getElementById("city").innerHTML = city;
  console.log(city);
}