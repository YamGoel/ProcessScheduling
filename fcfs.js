function calculate() {
    // Get the input value and split it into an array of processes
    const input = document.getElementById('processes').value;
    const processes = input.split(',');
  
    // Create an empty array to hold the process data
    const data = [];
  
    // Loop through each process and prompt the user for its arrival and burst times
    for (const process of processes) {
      const arrivalTime = prompt(`Enter arrival time for process ${process}:`);
      const burstTime = prompt(`Enter burst time for process ${process}:`);
      data.push({
        process,
        arrivalTime: parseInt(arrivalTime),
        burstTime: parseInt(burstTime)
      });
    }
  
    // Sort the processes by their arrival time (FCFS)
    data.sort((a, b) => a.arrivalTime - b.arrivalTime);
  
    // Calculate the waiting and turnaround times for each process
    let currentTime = 0;
    for (const process of data) {
      const waitingTime = currentTime - process.arrivalTime;
      const turnaroundTime = waitingTime + process.burstTime;
      process.waitingTime = waitingTime;
      process.turnaroundTime = turnaroundTime;
      currentTime += process.burstTime;
      process.startTime = currentTime - process.burstTime;
      process.endTime = currentTime;
    }
  
    // Update the results table
    const tableBody = document.createElement('tbody');
    for (const process of data) {
      const row = tableBody.insertRow();
      row.insertCell().textContent = process.process;
      row.insertCell().textContent = process.arrivalTime;
      row.insertCell().textContent = process.burstTime;
      row.insertCell().textContent = process.waitingTime;
      row.insertCell().textContent = process.turnaroundTime;
    }
    const resultsTable = document.getElementById('results');
    resultsTable.replaceChild(tableBody, resultsTable.tBodies[0]);
  
    // Generate the Gantt chart
    const ganttChart = document.getElementById('gantt-chart');
    ganttChart.innerHTML = '';
    for (const process of data) {
      const task = document.createElement('div');
      task.classList.add('gantt-task');
      task.style.width = `${process.burstTime * 20}px`;
      task.style.left = `${process.startTime * 20}px`;
      task.textContent = process.process;
      ganttChart.appendChild(task);
    }
  }
  