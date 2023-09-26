// JavaScript code for implementing SJF algorithm and updating the Gantt chart
function computeSJF() {
    // Get input values
    const processDetails = document.getElementById('process-details').value;
    const processes = processDetails.split(',');
    const numProcesses = processes.length;
    let arrivalTimes = [];
    let burstTimes = [];
    let completionTimes = [];
    let turnaroundTimes = [];
    let waitingTimes = [];

    // Parse arrival times and burst times from input
    for (let i = 0; i < numProcesses; i++) {
        const process = processes[i].trim().split(' ');
        arrivalTimes.push(parseInt(process[1]));
        burstTimes.push(parseInt(process[2]));
    }

    // Sort processes by arrival time
    let sortedIndices = Array.from(Array(numProcesses).keys());
    sortedIndices.sort((a, b) => arrivalTimes[a] - arrivalTimes[b]);

    // Calculate completion times
    let currentTime = 0;
    for (let i = 0; i < numProcesses; i++) {
        const processIndex = sortedIndices[i];
        completionTimes[processIndex] = currentTime + burstTimes[processIndex];
        currentTime = completionTimes[processIndex];
    }

    // Calculate turnaround times and waiting times
    for (let i = 0; i < numProcesses; i++) {
        const processIndex = sortedIndices[i];
        turnaroundTimes[processIndex] = completionTimes[processIndex] - arrivalTimes[processIndex];
        waitingTimes[processIndex] = turnaroundTimes[processIndex] - burstTimes[processIndex];
    }
            // Populate table with process details and compute average times
let avgTurnaroundTime = 0;
let avgWaitingTime = 0;
const tableBody = document.getElementById('sjf-table').querySelector('tbody');
tableBody.innerHTML = '';
for (let i = 0; i < numProcesses; i++) {
    const processIndex = sortedIndices[i];
    const newRow = tableBody.insertRow();
    newRow.insertCell().appendChild(document.createTextNode(`P${processIndex}`));
    newRow.insertCell().appendChild(document.createTextNode(arrivalTimes[processIndex]));
    newRow.insertCell().appendChild(document.createTextNode(burstTimes[processIndex]));
    newRow.insertCell().appendChild(document.createTextNode(completionTimes[processIndex]));
    newRow.insertCell().appendChild(document.createTextNode(turnaroundTimes[processIndex]));
    newRow.insertCell().appendChild(document.createTextNode(waitingTimes[processIndex]));
    avgTurnaroundTime += turnaroundTimes[processIndex];
    avgWaitingTime += waitingTimes[processIndex];
}
avgTurnaroundTime /= numProcesses;
avgWaitingTime /= numProcesses;

// Update Gantt chart with process details
const ganttChartDiv = document.getElementById('gantt-chart');
ganttChartDiv.innerHTML = '';
for (let i = 0; i < numProcesses; i++) {
    const processIndex = sortedIndices[i];
    const ganttBar = document.createElement('div');
    ganttBar.className = 'gantt-bar';
    ganttBar.style.width = `${(burstTimes[processIndex] / currentTime) * 100}%`;
    ganttBar.style.left = `${(arrivalTimes[processIndex] / currentTime) * 100}%`;
    ganttBar.innerText = `P${processIndex}`;
    ganttChartDiv.appendChild(ganttBar);
}

// Display average times
const avgTurnaroundTimeCell = tableBody.insertRow().insertCell();
avgTurnaroundTimeCell.setAttribute('colspan', '4');
avgTurnaroundTimeCell.style.textAlign = 'right';
avgTurnaroundTimeCell.appendChild(document.createTextNode('Average Turnaround Time:'));
tableBody.lastElementChild.appendChild(document.createTextNode(avgTurnaroundTime.toFixed(2)));
const avgWaitingTimeCell = tableBody.insertRow().insertCell();
avgWaitingTimeCell.setAttribute('colspan', '4');
avgWaitingTimeCell.style.textAlign = 'right';
avgWaitingTimeCell.appendChild(document.createTextNode('Average Waiting Time:'));
tableBody.lastElementChild.appendChild(document.createTextNode(avgWaitingTime.toFixed(2)));
}