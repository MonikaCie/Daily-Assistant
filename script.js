// -----: Clock :-----

const clock = document.getElementById('clock');

function time() {
    let date = new Date();
    let hour = date.getHours();
    let minutes = date.getMinutes();

    const timeNow = document.createElement('p');
    clock.append(timeNow);
    timeNow.innerText = `${hour}:${minutes}`;
}
time()

console.log(new Date())

// -----: Date :-----

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
date();