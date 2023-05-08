/*
                    STYLE SECTION
                                                            */
var red = '#F87070';
var purple = '#D881F8';
var blue = '#70f3f8';
var font1 = "'Kumbh Sans', Poppins, Monserat, 'Open Sans', Roboto, sans-serif"
var font2 = "'Roboto Slab', Lora, Merriweather, 'PT Serif', Arvo, 'Playfair Display', 'Noto serif'";
var font3 = "'Space Mono', 'IBM Plex Mono', 'Fira Mono', 'Anonymous Pro', monospace";

let accent_color = red;

const progressRing = document.querySelector(".progress-ring");
progressRing.setAttribute('stroke', accent_color);

/*
                        MAIN
                                                            */
            //get circle properties
const radius = progressRing.getAttribute("r");
const circumference = (2*Math.PI) * radius;
//set dasharray and dashoffset to the circumference
progressRing.setAttribute('stroke-dasharray', `${circumference} ${circumference}`);
progressRing.setAttribute('stroke-dashoffset', circumference);
                    //timer
let timerRunning = false;
const durations = {
    pomodoro : 25,
    shortbreak: 5,
    longbreak : 15
};
const timerDuration = durations.pomodoro;
const durationInSeconds = timerDuration * 60; //get time in seconds
const timer_text = document.querySelector('.timer-text')//fetch timer text element
let remainingTime = durationInSeconds;
timer_text.innerHTML = formatTime(remainingTime);//display remaining time in conventional format when remaining time = start time


/*
                    EVENT LISTENERS
                                                            */
        //event listener for starting and pausing
const start_stop = document.querySelector(".btn-txt");
let interval;
start_stop.addEventListener('click', () => {
    if(timerRunning){
        clearInterval(interval);
        timerRunning = false;
        start_stop.innerHTML = 'START'; //change pause button to start
    } else {
        interval = setInterval(countdown, 1000);
        timerRunning = true;
        start_stop.innerHTML = 'PAUSE';// change start button to pause
    }
});


/*
                    HELPER FUNCTIONS    
                                                            */
            //function to set progress ring to elapsed time
function progressPercent (timeinseconds){
    const percentage = circumference * (1 - timeinseconds / durationInSeconds);
    const offset = circumference - percentage
    progressRing.setAttribute('stroke-dashoffset', offset); //set the stroke offset to the computed offset
};
            //function for starting timer countdown
function countdown(){
    remainingTime--;
    //update the remaining time to reflect change
    timer_text.innerHTML = formatTime(remainingTime);
    //update progress ring
    console.log(`remainingTime: ${remainingTime}, timerDuration: ${timerDuration}, circumference: ${circumference}`);
    progressPercent(remainingTime);

    if(remainingTime <= 0){
        timerRunning = false;
        start_stop.innerHTML = 'RESTART';
        remainingTime = timerDuration; //reset the remaining time back to initial
    }
};
    //function for converting time in seconds to minutes:seconds display format
function formatTime(timeinseconds){
    const minutes = Math.floor(timeinseconds / 60); //divide the time in seconds by 60 and round to get the time in minutes
    const seconds = timeinseconds % 60; //calculate the time in seconds by getting the remainder of time that does not make up for a minute
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;//return minutes:seconds. Convert to string and pad with 0 if single digit
};