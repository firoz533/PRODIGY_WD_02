let startTime;
let interval;
let currentTime;
let lapCounter = 0;
let prevTime = 0;
let lapTime = 0;
let overallTime = 0;

function update() {
    currentTime = new Date().getTime() - startTime;
    let minutes = Math.floor(currentTime / 60000);
    // console.log(currentTime);
    let seconds = ((currentTime % 60000) / 1000).toFixed(2);
    document.getElementById("display").innerHTML = (minutes < 10 ? '0' : '') + minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}


function stopWatch() {
    let btn = document.getElementById('stopWatch').innerHTML;
    if (btn == 'Start') {
        startTime = new Date().getTime();
        interval = setInterval(update, 10);
        document.getElementById('stopWatch').innerHTML = 'Stop';
        document.getElementById('stopWatch').style.backgroundColor = '#ff2f1d';
        document.getElementById('lap').innerHTML = 'Lap';
    }
    else if (btn == 'Stop') {
        clearInterval(interval);
        document.getElementById('stopWatch').innerHTML = 'Resume';
        document.getElementById('stopWatch').style.backgroundColor = '#0d6efd';
        document.getElementById('lap').innerHTML = 'Reset';
    }
    else if (btn == 'Resume') {
        startTime = new Date().getTime() - currentTime;
        interval = setInterval(update, 10);
        document.getElementById('stopWatch').innerHTML = 'Stop';
        document.getElementById('stopWatch').style.backgroundColor = '#ff2f1d';
        document.getElementById('lap').innerHTML = 'Lap';
    }
}

function reset() {
    let bt = document.getElementById('lap').innerHTML;
    let table = document.getElementById('lapTable');
    if(bt == 'Reset') {
        let tr = document.querySelectorAll('tr:nth-child(n+2)');
        clearInterval(interval);
        document.getElementById("display").innerHTML = "00:00:00";
        document.getElementById('stopWatch').innerHTML = 'Start';
        document.getElementById('stopWatch').style.backgroundColor = '#0d6efd';
        startTime = null;
        lapCounter = 0;
        prevTime = 0;
        lapTime = 0;
        overallTime = 0;
        table.style.display = 'none';
        tr.forEach(tr => {
            tr.remove();
        });
    }
    else if (bt == 'Lap') {
        table.style.display = 'table';
        lap();
        newRow = document.createElement("tr");
        newData1 = document.createElement("td");
        newData1.innerHTML = String(lapCounter);
        newData2 = document.createElement("td");
        newData2.innerHTML = (Math.floor(lapTime / 60000) < 10 ? '0' : '') + Math.floor(lapTime / 60000) + ":" + (((lapTime % 60000) / 1000).toFixed(2) < 10 ? '0' : '') + ((lapTime % 60000) / 1000).toFixed(2);
        newData3 = document.createElement("td");
        newData3.innerHTML = (Math.floor(lapTime / 60000) < 10 ? '0' : '') + Math.floor(overallTime / 60000) + ":" + (((overallTime % 60000) / 1000).toFixed(2) < 10 ? '0' : '') + ((overallTime % 60000) / 1000).toFixed(2);
        newRow.appendChild(newData1);
        newRow.appendChild(newData2);
        newRow.appendChild(newData3);
        table.appendChild(newRow);
    }
}

function lap() {
    lapTime = currentTime - prevTime;
    overallTime = currentTime;
    prevTime = lapTime;
    lapCounter++;
}
