// -----: CLOCK :-----

const clock = document.getElementById('clock');
const clockFace = document.getElementById('clockFace');

function time() {
    let date = new Date();
    let hour = date.getHours();
    let minutes = date.getMinutes();
    let minutesCorrected;
    let hourCorrected;

    if (minutes.toString().length == 1) {
        minutesCorrected = `0${minutes}`;
    } else {
        minutesCorrected = minutes;
    }

    if (hour.toString().length == 1) {
        hourCorrected = `0${hour}`;
    } else {
        hourCorrected = hour;
    }

    clockFace.innerText = `${hourCorrected}:${minutesCorrected}`;

    clockFace.style.backgroundColor = '#2f3e46';
    clockFace.style.width = '200px';
    clockFace.style.fontFamily = '';
    clockFace.style.fontSize = '3rem';
    clockFace.style.borderRadius = '10px';
    clockFace.style.padding = '10px';
}
time()
setInterval(time, 1000);
console.log(new Date());






// -----: DATE :-----

const todaysDate = document.getElementById('todaysDate');

function date() {
    let date = new Date();
    let day = date.getDay();
    let dayDate = date.getDate();
    let monthDate = date.getMonth();
    let yearDate = date.getFullYear();

    const dayName = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];

    const monthName = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];
    const dateFace = document.getElementById('dateFace');
    dateFace.innerText = `${dayName[day]}, ${dayDate} ${monthName[monthDate]} ${yearDate}`;
}
date()
setInterval(date, 1000);






// -----: TO DO LIST :-----

const tasksInput = document.getElementById('tasksInput');
const addBtn = document.getElementById('addBtn');
const tasksList = document.getElementById('tasksList');

let checkbox;

let checkboxId;
let newTaskID;

let nextId = 0;

retriveFromLocalStorage()

// Adding tasks

addBtn.addEventListener('click', () => {
    // li item
    let newTask;
    newTask = document.createElement('li');
    newTask.innerText = tasksInput.value;
    tasksList.append(newTask);
    // assign id to newTask
    newTask.setAttribute('id', `newTask${nextId++}`)
    // newTask.setAttribute('id', `newTask${document.querySelectorAll("li").length}`);

    // checkbox
    checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    newTask.append(checkbox);
    checkbox.addEventListener('click', lineThrough);
    // assign id to checkbox
    checkbox.setAttribute('id', `checkbox${nextId++}`);

    // delete btn
    deleteBtn = document.createElement('button');
    newTask.append(deleteBtn);
    deleteBtn.addEventListener('click', deleteTask);
    // assign id to delete button
    deleteBtn.setAttribute('id', `deleteBtn${nextId++}`)

    // clear
    tasksInput.value = "";
    tasksInput.focus();

    console.log(document.querySelectorAll("li").length);

    deleteBtn.style.height = '20px';
    deleteBtn.style.width = '20px';
    deleteBtn.style.backgroundColor = '#2f3e46';
    deleteBtn.style.color = '#cad2c5';
})

// Line through

function lineThrough(event) {

    let task = event.target.parentElement;
    if (event.target.checked == true) {
        task.style.textDecoration = 'line-through';
    } else {
        task.style.textDecoration = 'none';
    }
}

// function lineThrough() {
//     for (let i = 1; i < document.querySelectorAll("li").length; i++) {
//         if (document.getElementById("checkbox" + i).innerHTML.checked) {
//             document.getElementById("newTask" + i).innerHTML.style.textDecoration = 'line-through'
//         } else {
//             document.getElementById("newTask" + i).innerHTML.style.textDecoration = 'none'
//         }
//     }
// }

// function lineThrough() {
//     for (let i = 1; i < document.querySelectorAll("li").length; i++) {
//         if (checkbox[i].checked) {
//             newTask[i].style.textDecoration = 'line-through'
//         } else {
//             newTask[i].style.textDecoration = 'none'
//         }
//     }
// }

// function lineThrough() {
//     if (checkbox`${document.querySelectorAll("li").length}`.checked) {
//         newTask`${document.querySelectorAll("li").length}`.style.textDecoration = 'line-through'
//     } else {
//         newTask`${document.querySelectorAll("li").length}`.style.textDecoration = 'none'
//     }
// }

// Deleting tasks

function deleteTask() {
    let task = event.target.parentElement;
    tasksList.removeChild(task);
    // Deleting from local storage
    localStorage.clear();
    savingToLocalStorage();
}

// Local Storage

// Saving to local storage

addBtn.addEventListener('click', savingToLocalStorage);
function savingToLocalStorage() {
    let tasks = [];
    let tasksItems = tasksList.getElementsByTagName('li');

    for (let i = 0; i < tasksItems.length; i++) {
        tasks.push(tasksItems[i].textContent);
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Loading from local storage

function retriveFromLocalStorage() {
    let tasks = JSON.parse(localStorage.getItem('tasks'));

    if (tasks) {
        tasks.forEach(taskText => {
            let li = document.createElement('li');
            li.textContent = taskText;
            tasksList.appendChild(li);

            // checkbox
            let checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.addEventListener('click', lineThrough);
            li.appendChild(checkbox);

            // delete button
            let deleteBtn = document.createElement('button');
            li.appendChild(deleteBtn);
            deleteBtn.addEventListener('click', deleteTask);

            deleteBtn.style.height = '20px';
            deleteBtn.style.width = '20px';
            deleteBtn.style.backgroundColor = '#2f3e46';
            deleteBtn.style.color = '#cad2c5';
        }
        )
    }
}






// -----: WEATHER :-----

// fetch("https://api.open-meteo.com/v1/forecast?latitude=51.5085&longitude=-0.1257&daily=temperature_2m_max,temperature_2m_min&forecast_days=3")
//     .then(response => response.json())
//     .then(data => console.log(data))
//     .catch(error => console.error(error));


// Min & Max Temperature

fetchData()

async function fetchData() {
    try {

        const response = await fetch("https://api.open-meteo.com/v1/forecast?latitude=51.5085&longitude=-0.1257&daily=temperature_2m_max,temperature_2m_min&forecast_days=3")

        if (!response.ok) {
            throw new Error("Could not fetch");
        }
        const data = await response.json();
        console.log(data)


        const tempToday = document.getElementById('tempToday');
        const tempTomorrow = document.getElementById('tempTomorrow');

        tempToday.innerText = `max: ${data.daily.temperature_2m_max[0]}°C min: ${data.daily.temperature_2m_min[0]}°C`
            ;
        tempTomorrow.innerText = `max: ${data.daily.temperature_2m_max[1]}°C min: ${data.daily.temperature_2m_min[1]}°C`
    }
    catch (error) {
        console.error(error);
    }
}

// Rain & Clouds

fetchRain();

async function fetchRain() {
    try {

        const response = await fetch("https://api.open-meteo.com/v1/forecast?latitude=51.5085&longitude=-0.1257&daily=rain_sum&timezone=Europe%2FLondon&forecast_days=3")

        if (!response.ok) {
            throw new Error("Could not fetch");
        }
        const data = await response.json();
        console.log(data);

        const rainToday = document.getElementById('rainToday');
        const rainTomorrow = document.getElementById('rainTomorrow');

        let totalRainToday = data.daily.rain_sum[0];
        let totalRainTomorrow = data.daily.rain_sum[1];

        if (totalRainToday > 0) {
            rainToday.innerText = "Rain";
        } else {
            rainToday.innerText = "No rain";
        }

        if (totalRainTomorrow > 0) {
            rainTomorrow.innerText = "Rain";
        } else {
            rainTomorrow.innerText = "No rain";
        }
    }
    catch (error) {
        console.error(error);
    }
}







