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
