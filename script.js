let chart;

// USER
function saveUser() {
    let name = document.getElementById("username").value;
    localStorage.setItem("user", name);
    document.getElementById("welcome").innerText = "Welcome, " + name;
}

window.onload = function () {
    let user = localStorage.getItem("user");
    if (user) {
        document.getElementById("welcome").innerText = "Welcome back, " + user;
    }
    loadHistory();
};

// CALCULATE
function calculate() {

    let travel = Number(document.getElementById("travel").value) || 0;
    let electricity = Number(document.getElementById("electricity").value) || 0;
    let food = Number(document.getElementById("food").value) || 0;

    let t = travel * 0.21;
    let e = electricity * 0.5;
    let f = food * 2.5;

    let total = t + e + f;

    let status = total > 25 ? "High " : total > 10 ? "Medium " : "Low ";

    document.getElementById("result").innerHTML =
        `Total CO₂: ${total.toFixed(2)} kg/day <br>${status}`;

    // Update stats
    document.getElementById("totalStat").innerText = total.toFixed(2);
    document.getElementById("statusStat").innerText = status;
    document.getElementById("lastStat").innerText = new Date().toLocaleTimeString();

    saveHistory(total);
    drawChart(t, e, f);
}

// HISTORY
function saveHistory(val) {
    let h = JSON.parse(localStorage.getItem("history")) || [];
    h.push(val);
    localStorage.setItem("history", JSON.stringify(h));
    loadHistory();
}

function loadHistory() {
    let h = JSON.parse(localStorage.getItem("history")) || [];
    let list = document.getElementById("history");
    list.innerHTML = "";

    h.slice(-5).reverse().forEach(v => {
        let li = document.createElement("li");
        li.innerText = v.toFixed(2) + " kg CO2";
        list.appendChild(li);
    });
}

// CHART
function drawChart(t, e, f) {

    let ctx = document.getElementById("chart");

    if (chart) chart.destroy();

    chart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Travel', 'Electricity', 'Food'],
            datasets: [{
                data: [t, e, f],
                backgroundColor: ['#28a745', '#ffc107', '#dc3545']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
}