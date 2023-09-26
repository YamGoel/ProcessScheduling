// JavaScript code for implementing SJF algorithm and updating the Gantt chart
let processes = []; // array to store process details
const ganttChart = document.getElementById('gantt-chart');

function addProcess() {
    // Get input values
    const processID = document.getElementById('process-id').value;
    const arrivalTime = parseInt(document.getElementById('arrival-time').value);
    const burstTime = parseInt(document.getElementById('burst-time').value);

    // Create new process object and add to array
    const newProcess = {
        id: processID,
        arrivalTime: arrivalTime,
        burstTime: burstTime,
        completionTime: 0
    };
    processes.push(newProcess);

    // Sort processes by burst time
    processes.sort((a, b) => a.burstTime - b.burstTime);

    // Calculate completion times
    let currentTime = 0;
    processes.forEach((process) => {
        process.completionTime = currentTime + process.burstTime;
        currentTime = process.completionTime;
    });

    // Draw Gantt chart
    let ganttHTML = '';
    processes.forEach((process) => {
        const width = process.burstTime / currentTime * 100;
        ganttHTML += `<div class="gantt"><div class="gantt-bar" style="width: ${width}%;">${process.id}</div></div>`;
    });
    ganttChart.innerHTML = ganttHTML;
}