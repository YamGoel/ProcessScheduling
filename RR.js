let processes = [];

function addProcess() {
	const processName = prompt("Enter Process Name:");
	const burstTime = parseInt(prompt("Enter Burst Time:"));
	processes.push({name: processName, burst: burstTime});
	renderProcesses();
}

function renderProcesses() {
	const tbody = document.getElementById("processes");
	tbody.innerHTML = "";
	for (let i = 0; i < processes.length; i++) {
		const tr = document.createElement("tr");
		const nameTd = document.createElement("td");
		const burstTd = document.createElement("td");
		nameTd.textContent = processes[i].name;
		burstTd.textContent = processes[i].burst;
		tr.appendChild(nameTd);
		tr.appendChild(burstTd);
		tbody.appendChild(tr);
	}
}

function runRoundRobin() {
	const quantumTime = parseInt(document.getElementById("quantum").value);
	let time = 0;
	const chartTbody = document.getElementById("chart");
	chartTbody.innerHTML = "";
	const processesTableTbody = document.getElementById("processes-table");
	processesTableTbody.innerHTML = "";
	while (processes.length > 0) {
		const process = processes.shift();
        // check if the process can finish within the quantum time or not
if (process.burst <= quantumTime) {
    // process finishes within quantum time
    time += process.burst;
    const tr = document.createElement("tr");
    const td = document.createElement("td");
    td.textContent = process.name;
    td.setAttribute("colspan", process.burst);
    td.classList.add("process");
    tr.appendChild(td);
    chartTbody.appendChild(tr);
    processesTableTbody.appendChild(createProcessTableRow(process, time - process.burst, time));
    } else {
    // process does not finish within quantum time
    time += quantumTime;
    process.burst -= quantumTime;
    const tr = document.createElement("tr");
    const td = document.createElement("td");
    td.textContent = process.name;
    td.setAttribute("colspan", quantumTime);
    td.classList.add("process");
    tr.appendChild(td);
    chartTbody.appendChild(tr);
    // put the process at the end of the queue
    processes.push(process);
    }
    }
    }
    
    function createProcessTableRow(process, startTime, endTime) {
    const tr = document.createElement("tr");
    const nameTd = document.createElement("td");
    const waitingTimeTd = document.createElement("td");
    const turnaroundTimeTd = document.createElement("td");
    nameTd.textContent = process.name;
    waitingTimeTd.textContent = startTime;
    turnaroundTimeTd.textContent = endTime;
    tr.appendChild(nameTd);
    tr.appendChild(waitingTimeTd);
    tr.appendChild(turnaroundTimeTd);
    return tr;
    }
