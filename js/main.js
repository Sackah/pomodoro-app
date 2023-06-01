/*
                    STYLE SECTION
                                                            */
var red = '#F87070';
var purple = '#D881F8';
var blue = '#70f3f8';
var deepBlue = '#1E213F';
var font1 = "'Kumbh Sans', Poppins, Monserat, 'Open Sans', Roboto, sans-serif"
var font2 = "'Roboto Slab', Lora, Merriweather, 'PT Serif', Arvo, 'Playfair Display', 'Noto serif'";
var font3 = "'Space Mono', 'IBM Plex Mono', 'Fira Mono', 'Anonymous Pro', monospace";

let accent_color = red;
let font_style = font1;

const timer_text = document.querySelector('.timer-text')//fetch timer text element
const start_stop = document.querySelector(".btn-txt");//fetch start button element

/*
                        MAIN
                                                            */
            //get circle properties
const progressRing = document.querySelector(".progress-ring");
const parentSvg = document.querySelector(".timer-circle");
const parentWidth = parentSvg.clientWidth;
//console.log(parentWidth);
const radiusInPercentage = progressRing.getAttribute("r");
const percent = parseFloat(radiusInPercentage);
const radius = (percent/100) * parentWidth;
const circumference = (2*Math.PI) * radius;
//set dasharray and dashoffset to the circumference
progressRing.setAttribute('stroke-dasharray', `${circumference} ${circumference}`);
progressRing.setAttribute('stroke-dashoffset', circumference);

                    //timer
let interval;
let timerRunning = false;
const durations = {
    pomodoro : 25,
    shortbreak: 5,
    longbreak : 15
};
let timerDuration = durations.pomodoro;

let durationInSeconds = timerDuration * 60; //get time in seconds
let remainingTime = durationInSeconds;
timer_text.innerHTML = formatTime(remainingTime);//display remaining time in conventional format when remaining time = start time

//iterate over all break mode selectors and change timerDuration accordingly
const break_selectors = document.querySelectorAll(".break-mode-btn");
break_selectors.forEach((breaks) => {
    breaks.addEventListener('change', () => {
        if (breaks.checked){
            clearInterval(interval);
            timerDuration = durations[breaks.value];
            durationInSeconds = timerDuration * 60;
            remainingTime = durationInSeconds;
            timer_text.innerHTML = formatTime(remainingTime);
            start_stop.innerHTML = 'START'; //change pause button to start
            console.log(timerDuration);
        }
    });
});



/*
                    EVENT LISTENERS
                                                            */
        //Event listener for starting and pausing
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

        //Event listener for settings menu toggle
const settingsButton = document.querySelector(".settings-btn");
const closeButton = document.querySelector(".close-btn");
const settingsMenu = document.querySelector('#settingsMenu');

settingsButton.addEventListener('click', function () {
    settingsMenu.classList.toggle('hidden');
});
closeButton.addEventListener('click', function () {
    settingsMenu.classList.toggle('hidden');
});

        //Event listener for arrow button increamentors
const pomodoroArrowUp = document.querySelector(".pomo-up");
const pomodoroArrowDown = document.querySelector(".pomo-down");
    const pomodoroInput = document.querySelector("#pomodoro-setter");
const shortbreakArrowUp = document.querySelector(".short-up");
const shortbreakArrowDown = document.querySelector(".short-down");
    const shortbreakInput = document.querySelector("#shortbreak-setter");
const longbreakArrowUp = document.querySelector(".long-up");
const longbreakArrowDown = document.querySelector(".long-down");
    const longbreakInput = document.querySelector("#longbreak-setter");

pomodoroArrowUp.addEventListener('click', function(){
    pomodoroInput.stepUp();
});
pomodoroArrowDown.addEventListener('click', function(){
    pomodoroInput.stepDown();
});
shortbreakArrowUp.addEventListener('click', function(){
    shortbreakInput.stepUp();
});
shortbreakArrowDown.addEventListener('click', function(){
    shortbreakInput.stepDown();
});
longbreakArrowUp.addEventListener('click', function(){
    longbreakInput.stepUp();
});
longbreakArrowDown.addEventListener('click', function(){
    longbreakInput.stepDown();
});


        //Eventlistener for apply button
const applyButton = document.querySelector(".apply-button");
const kumbhSansButton = document.querySelector("#kumbh-sans-btn");
const robotoSlabButton = document.querySelector("#roboto-slab-btn");
const spaceMonoButton = document.querySelector("#space-mono-btn");
const durationsDiv = document.querySelector(".durations-div");
const redButton = document.querySelector("#red-btn");
const blueButton = document.querySelector("#blue-btn");
const purpleButton = document.querySelector("#purple-btn");

applyButton.addEventListener('click', function(){
    //assign new values to pomodoro, shortbreak and longbreak
    if(pomodoroInput.value > 50){
        durations.pomodoro = 50;
        pomodoroInput.value = 50;
    } else if (pomodoroInput.value < 10){
        durations.pomodoro = 10;
        pomodoroInput.value = 10;
    } else{
        durations.pomodoro = pomodoroInput.value;
    }

    if (shortbreakInput.value > 10){
        durations.shortbreak = 10;
        shortbreakInput.value = 10;
    } else if (shortbreakInput.value < 1){
        durations.shortbreak = 1;
        shortbreakInput.value = 1;
    } else{
        durations.shortbreak = shortbreakInput.value;
    }

    if(longbreakInput.value > 20){
        durations.longbreak = 20;
        longbreakInput.value = 20;
    } else if (longbreakInput.value < 10){
        durations.longbreak = 10;
        longbreakInput.value = 10;
    } else{
        durations.longbreak = longbreakInput.value;
    }

    //font changers
    if (kumbhSansButton.checked){
        font_style = font1;
        changeFont();
    } else if (robotoSlabButton.checked){
        font_style = font2;
        changeFont();
    } else if (spaceMonoButton.checked){
        font_style = font3;
        changeFont();
        durationsDiv.style.fontSize = "0.8rem";
    }
    
    //color changers
    if (redButton.checked){
        changeColor(red);
    } else if (blueButton.checked){
        changeColor(blue);
    } else if (purpleButton.checked){
        changeColor(purple);
    }

    //change displayed time to custom set time
    console.log(break_selectors);
    for (let i = 0; i < break_selectors.length; i++){
        if (break_selectors[i].checked){
            clearInterval(interval);
            timerDuration = durations[break_selectors[i].value];
            durationInSeconds = timerDuration * 60;
            remainingTime = durationInSeconds;
            timer_text.innerHTML = formatTime(remainingTime);
            start_stop.innerHTML = 'START'; //change pause button to start
        }
    };
    settingsMenu.classList.toggle('hidden');
    window.alert("Changes Applied!");
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
        clearInterval(interval);
        timerRunning = false;
        start_stop.innerHTML = 'RESTART';
        remainingTime = durationInSeconds; //reset the remaining time back to initial
    }
};
        //function for converting time in seconds to minutes:seconds display format
function formatTime(timeinseconds){
    const minutes = Math.floor(timeinseconds / 60); //divide the time in seconds by 60 and round to get the time in minutes
    const seconds = timeinseconds % 60; //calculate the time in seconds by getting the remainder of time that does not make up for a minute
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;//return minutes:seconds. Convert to string and pad with 0 if single digit
};
        //function  for changing font style
function changeFont(){
    durationsDiv.style.fontFamily = font_style;
    timer_text.style.fontFamily = font_style;
    start_stop.style.fontFamily = font_style;
};
        //function for changing accent color
function changeColor(color){
    for (let i = 0; i < break_selectors.length; i++){
        if (break_selectors[i].checked){
            accent_color = color;
            document.documentElement.style.setProperty('--accent-color', accent_color);
            console.log(accent_color);
        }
    }
};