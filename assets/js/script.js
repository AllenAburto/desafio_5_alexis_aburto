let taskId = 1;
let activeTasks = 0;
let completedTasks = 0;
let deletedTasks = 0;
let showCompleted = true;

function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskList = document.getElementById("taskList");

    if (taskInput.value.trim() !== "") {
        const taskText = taskInput.value;
        const tableRow = document.createElement("tr");

        tableRow.innerHTML = `<td>${taskId}</td>
                              <td>${taskText}</td>
                              <td>
                                  <input type="checkbox" id="task${taskId}" onclick="toggleTask(${taskId})">
                                  <label for="task${taskId}">Completada</label>
                                  <button onclick="deleteTask(${taskId})">Eliminar</button>
                              </td>`;

        if (!showCompleted) {
            tableRow.style.display = "none";
        }

        taskList.appendChild(tableRow);
        taskInput.value = "";
        taskId++;
        activeTasks++;
        updateCounters();
    }
}

function toggleTask(id) {
    const checkbox = document.getElementById(`task${id}`);
    const label = checkbox.nextElementSibling;
    if (checkbox.checked) {
        label.classList.add("completed");
        activeTasks--;
        completedTasks++;
    } else {
        label.classList.remove("completed");
        activeTasks++;
        completedTasks--;
    }
    updateCounters();
}

function deleteTask(id) {
    const tableRow = document.getElementById(`task${id}`).parentNode.parentNode;
    const checkbox = tableRow.querySelector("input[type='checkbox']");
    
    if (!checkbox.checked) {
        activeTasks--;
    } else {
        completedTasks--;
    }
    
    tableRow.remove();
    deletedTasks++;
    updateCounters();
}

function updateCounters() {
    document.getElementById("activeCount").textContent = activeTasks;
    document.getElementById("completedCount").textContent = completedTasks;
    document.getElementById("deletedCount").textContent = deletedTasks;
}

function toggleCompleted() {
    showCompleted = !showCompleted;
    const taskRows = document.querySelectorAll("#taskList tr");

    taskRows.forEach((row) => {
        const checkbox = row.querySelector("input[type='checkbox']");
        if (checkbox.checked && !showCompleted) {
            row.style.display = "none";
        } else {
            row.style.display = "table-row";
        }
    });
}