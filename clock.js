// init variables

const hoursDiv = document.querySelector('#hours');
const minutesDiv = document.querySelector('#minutes');
const secondsDiv = document.querySelector('#seconds');
const issImage = document.querySelector('#iss');


// init functions

function getTime() {
    let intervalId = setInterval(() => { 
        let currentTime = new Date();
        let hours = currentTime.getHours();
        let minutes = currentTime.getMinutes();
        let seconds = currentTime.getSeconds();
        
        animClockIss(hours);
        hours = checkTime(hours);
        minutes = checkTime(minutes);
        seconds = checkTime(seconds);
        hoursDiv.innerText = hours;
        minutesDiv.innerText = minutes;
        secondsDiv.innerText = seconds;
    }, 1000);
}

function checkTime(x) {
    if (x < 10) {
        x = "0" + x;
    }
    return x;
}

function animClockIss(hours) {
    switch (hours) {
        case 0:
        case 12:
            issImage.style.top = "-5%";
            break;
        case 1:
        case 13:
            issImage.style.top = "0%";
            issImage.style.right = "10%";
            break;
        case 2:
        case 14:
            issImage.style.top = "20%";
            issImage.style.right = "-10%";
            break;
        case 3:
        case 15:
            issImage.style.right = "-20%";
            break;
        case 4:
        case 16:
            issImage.style.bottom = "20%";
            issImage.style.right = "-10%";
            break;
        case 5:
        case 17:
            issImage.style.bottom = "0%";
            issImage.style.right = "10%";
            break;
        case 6:
        case 18:
            issImage.style.bottom = "-5%";
            break;
        case 7:
        case 19:
            issImage.style.bottom = "0%";
            issImage.style.left = "10%";
            break;
        case 8:
        case 20:
            issImage.style.bottom = "20%";
            issImage.style.left = "-10%";
            break;
        case 9:
        case 21:
            issImage.style.left = "-20%";
            break;
        case 10:
        case 22:
            issImage.style.top = "20%";
            issImage.style.left = "-10%";
            break;
        case 11:
        case 23:
            issImage.style.top = "0%";
            issImage.style.left = "10%";
            break;
    }
}


// execute code

getTime();