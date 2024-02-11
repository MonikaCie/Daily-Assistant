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