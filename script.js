// -----: CLOCK :-----

const clock = document.getElementById('clock');

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

    const timeNow = document.createElement('p');
    clock.append(timeNow);
    timeNow.innerText = `${hourCorrected}:${minutesCorrected}`;

    timeNow.style.backgroundColor = '#2f3e46';
    timeNow.style.width = '200px';
    timeNow.style.fontFamily = '';
    timeNow.style.fontSize = '3rem';
    timeNow.style.borderRadius = '10px'
    timeNow.style.padding = '10px'

}

setInterval(time(), 1000);


console.log(new Date())

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

    const dateNow = document.createElement('p');
    todaysDate.append(dateNow);
    dateNow.innerText = `${dayName[day]}, ${dayDate} ${monthName[monthDate]} ${yearDate}`

}
setInterval(date(), 1000)

// -----: TO DO LIST :-----

const inputToDo = document.getElementById('inputToDo');
const addBtn = document.getElementById('addBtn');
const toDoList = document.getElementById('toDoList');



// addBtn.addEventListener('click', () => {
//     let checkbox = document.createElement('input');
//     checkbox.type = 'checkbox';
//     checkbox.id = 'checkboxId'
//     toDoList.append(checkbox);

//     let label = document.createElement('label');
//     label.htmlFor = 'checkboxId';
//     label.innerText = inputToDo.value;
//     toDoList.append(label)

//     inputToDo.value = ""
//     inputToDo.focus()

// })

addBtn.addEventListener('click', newItem())


function newItem() {
    let li = document.createElement('li');
    let inputText = inputToDo.value;
    console.log(inputText)
}
