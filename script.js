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


    // checkbox
    checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    newTask.append(checkbox);
    checkbox.addEventListener('click', lineThrough);
    // assign id to checkbox
    checkbox.setAttribute('id', `checkbox${nextId++}`);
    checkbox.setAttribute('class', 'checkbox');

    // delete btn
    deleteBtn = document.createElement('button');
    newTask.append(deleteBtn);
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', deleteTask);
    // assign id to delete button
    deleteBtn.setAttribute('id', `deleteBtn${nextId++}`)
    deleteBtn.setAttribute('class', 'deleteBtn');

    // edit btn
    editBtn = document.createElement('button');
    newTask.append(editBtn);
    editBtn.textContent = 'Edit';
    editBtn.addEventListener('click', edit);
    editBtn.addEventListener('click', function () {
        saveBtn.hidden = false;
    })
    editBtn.setAttribute('class', 'editBtn');

    // save btn
    saveBtn = document.createElement('button');
    newTask.append(saveBtn);
    saveBtn.textContent = 'Save';

    // hiding save button after saving
    function hideSave() {
        saveBtn.hidden = true;
    }

    saveBtn.addEventListener('click', savingToLocalStorage);
    saveBtn.hidden = true;
    saveBtn.addEventListener('click', hideSave);
    saveBtn.setAttribute('class', 'saveBtn');


    // clear
    tasksInput.value = "";
    tasksInput.focus();


})


// Edit function

function edit(event) {
    let task = event.target.parentElement;
    task.contentEditable = true;
}


// Line through

function lineThrough(event) {
    let task = event.target.parentElement;
    if (event.target.checked == true) {
        task.style.textDecoration = 'line-through';
    } else {
        task.style.textDecoration = 'none';
    }
}


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
        tasks.push(tasksItems[i].childNodes[0].textContent);
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
}



// 

// checkbox status
function savingCheckboxes() {
    let checkboxes = [];
    let checkbox = tasksList.getElementsByTagName('input');
    // let checked = [];

    for (let i = 0; i < checkbox.length; i++) {
        checkboxes.push(checkbox[i].checked)
    }

    localStorage.setItem(`checkboxes`, JSON.stringify(checkboxes))
}
setInterval(savingCheckboxes, 1000)
savingCheckboxes()

// Loading from local storage

function retriveFromLocalStorage() {
    let tasks = JSON.parse(localStorage.getItem('tasks'));

    if (tasks) {
        tasks.forEach((taskText, index) => {
            let li = document.createElement('li');
            li.textContent = taskText;
            tasksList.appendChild(li);
            li.setAttribute('id', `newTask${nextId++}`)


            // checkbox
            let checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.addEventListener('click', lineThrough);
            li.appendChild(checkbox);
            checkbox.setAttribute('id', `checkbox${nextId++}`);
            checkbox.setAttribute('class', 'checkbox');

            // delete button
            let deleteBtn = document.createElement('button');
            li.appendChild(deleteBtn);
            deleteBtn.textContent = 'Delete';
            deleteBtn.addEventListener('click', deleteTask);
            deleteBtn.setAttribute('class', 'deleteBtn');

            // edit button
            let editBtn = document.createElement('button');
            li.appendChild(editBtn);
            editBtn.textContent = 'Edit';
            editBtn.addEventListener('click', edit);
            editBtn.addEventListener('click', function () {
                saveBtn.hidden = false;
            })
            editBtn.setAttribute('class', 'editBtn');

            // save button
            let saveBtn = document.createElement('button');
            li.appendChild(saveBtn);
            saveBtn.textContent = 'Save';

            // hiding save button after saving
            function hideSave() {
                saveBtn.hidden = true;
            }

            saveBtn.addEventListener('click', savingToLocalStorage);
            saveBtn.hidden = true;
            saveBtn.addEventListener('click', hideSave)
            saveBtn.setAttribute('class', 'saveBtn');




            // checkbox state
            let checkboxesState = JSON.parse(localStorage.getItem('checkboxes'));
            checkbox.checked = checkboxesState[index];

            // line through for completed items
            if (checkbox.checked) {
                li.style.textDecoration = 'line-through';
            }

            deleteBtn.setAttribute('id', 'deleteBtn');

        }
        )
    }
}








// -----: WEATHER :-----



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

        tempToday.innerText = `max: ${data.daily.temperature_2m_max[0]}°C min: ${data.daily.temperature_2m_min[0]}°C`;
        tempTomorrow.innerText = `max: ${data.daily.temperature_2m_max[1]}°C    min: ${data.daily.temperature_2m_min[1]}°C`
    }
    catch (error) {
        console.error(error);
    }
}

// Editing tasks



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





