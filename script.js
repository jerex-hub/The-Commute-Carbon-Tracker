const carbonRates = {
    car: 0.2,
    bus: 0.1,
    bike: 0,
    walk: 0
};

let trips = [];

let tripCounts = {
    car: 0,	
    bus: 0,
    bike: 0,
    walk: 0
};

function showTracker() {
    document.getElementById("homePage").style.display = "none";
    document.getElementById("trackerPage").style.display = "block";
}

function goHome() {
    document.getElementById("trackerPage").style.display = "none";
    document.getElementById("homePage").style.display = "block";
}

function logTrip() {
    const distance = parseFloat(document.getElementById("distance").value);
    const mode = document.getElementById("mode").value;

    if (!distance || distance <= 0) {
        alert("Please enter a valid distance.");
        return;
    }

    const saved = distance * (carbonRates.car - carbonRates[mode]);

    trips.push({
        distance: distance,
        mode: mode,
        saved: saved
    });

    tripCounts[mode]++;

    document.getElementById("todayResult").innerText =
        saved.toFixed(2) + " kg CO2 saved";

    updateWeekly();

    document.getElementById("distance").value = "";
}

function updateWeekly() {
    let total = 0;
    const tripList = document.getElementById("tripList");

    tripList.innerHTML = "";

    trips.forEach(function(trip, index) {
        total += trip.saved;

        const li = document.createElement("li");
        li.innerText =
            (index + 1) + ". " +
            trip.mode.toUpperCase() +
            " - " +
            trip.distance +
            " km → Saved " +
            trip.saved.toFixed(2) +
            " kg CO2";

        tripList.appendChild(li);
    });

    document.getElementById("weeklyTotal").innerText =
        total.toFixed(2) + " kg CO2";

    document.getElementById("tripCount").innerHTML =
        "🚗 Car: " + tripCounts.car + "<br>" +
        "🚌 Bus: " + tripCounts.bus + "<br>" +
        "🚴 Bike: " + tripCounts.bike + "<br>" +
        "🚶 Walk: " + tripCounts.walk;

    const tips = [
        "🚴 Bike once a week to cut emissions.",
        "🚶 Walking short distances saves fuel.",
        "🚌 Public transport reduces traffic pollution.",
        "🌍 Small daily choices create big environmental impact.",
        "♻️ Consistency matters more than perfection."
    ];

    const randomTip =
        Math.floor(Math.random() * tips.length);

    document.getElementById("ecoTip").innerText =
        tips[randomTip];
}
function increaseDistance() {
    let distance = document.getElementById("distance");
    distance.value = (parseFloat(distance.value) || 0) + 1;
}

function decreaseDistance() {
    let distance = document.getElementById("distance");

    let current = parseFloat(distance.value) || 0;

    if (current > 0) {
        distance.value = current - 1;
    }
}