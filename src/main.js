let pomoMins = 25;
let pomoSecs = pomoMins * 60;
let timerId;
let isClockRunning = false;
let paused = false;
let cycle = 0;
//DOM
const container = document.getElementById("container");
container.classList.add("box");
const selectTimer = document.getElementById("select");
selectTimer.classList.add("select");
const pomodoro = document.createElement("button");
pomodoro.innerHTML = "Pomodoro";
pomodoro.classList.add("selectpomo");
const short = document.createElement("button");
short.innerHTML = "Short";
short.classList.add("selectshort");
short.onclick = "chBackcolor('red')";
const long = document.createElement("button");
long.innerHTML = "Long";
long.classList.add("selectlong");
selectTimer.appendChild(pomodoro);
selectTimer.appendChild(short);
selectTimer.appendChild(long);
container.appendChild(selectTimer);
const display = document.getElementById("display");
display.classList.add("displayTimer");
const countDown = document.createElement("h1");
countDown.innerHTML = "25:00";
countDown.classList.add("display");
display.appendChild(countDown);
container.appendChild(display);
const stopReset = document.getElementById("stopReset");
stopReset.classList.add("stopReset");
const stop = document.createElement("button");
stop.innerHTML = "Pause";
stop.classList.add("stop");
const reset = document.createElement("button");
reset.innerHTML = "Reset";
reset.classList.add("reset");
stopReset.appendChild(stop);
stopReset.appendChild(reset);
container.appendChild(stopReset);
const input = document.getElementById("prompt");
input.classList.add("input");
const add = document.createElement("button");
add.innerHTML = "Set your own timer";
add.classList.add("add");
input.appendChild(add);
container.appendChild(input);
//Work-time
function colorChange (color){
    document.body.style.background = color;
    document.body.style.transition = "backgroundColor, 2s";
}
pomodoro.addEventListener('click', ()=>{
    colorChange( "hsl(223, 25%, 40%)");
    shortMins = 5;
    shortSecs = shortMins * 60;
    longMins = 15;
    longSecs = longMins * 60;
    if(isClockRunning == true){
        clearInterval(timerId);
        timerId = setInterval(updateCountdown, 1000);
    }
    else{
        timerId = setInterval(updateCountdown, 1000);
        isClockRunning = true;  
    }
    
})
function updateCountdown() {
    const minutes = Math.floor(pomoSecs / 60);
    let seconds = pomoSecs % 60;
    seconds = seconds<10 ? "0" + seconds : seconds;
    countDown.innerHTML = `${minutes}:${seconds}`;
    pomoSecs--;
    if(pomoSecs == 00){
        window.alert("Take a break!!");
        shortMins = 5;
        shortSecs = shortMins * 60;
        clearInterval(timerId);
        timerId = setInterval(updateCountdownShort, 1000);
        cycle++;
        if(cycle == 3){
            window.alert("Good Job! Take a long break now.");
            clearInterval(timerId);
            timerId = setInterval(updateCountdownLong, 1000);
        }
    }  
}
//Short-break
let shortMins = 5;
let shortSecs = shortMins * 60;
    short.addEventListener('click', ()=>{
        colorChange("hsl(48, 23%, 40%)");
        pomoMins = 25;
        pomoSecs =  pomoMins * 60;
        longMins = 15;
        longSecs = longMins * 60;
        if(isClockRunning == true){
            clearInterval(timerId);
            timerId = setInterval(updateCountdownShort, 1000);
        }
        else{
            timerId = setInterval(updateCountdownShort, 1000);
            isClockRunning = true;
        } 
    })
function updateCountdownShort() {
    const minutes = Math.floor(shortSecs / 60);
    let seconds = shortSecs % 60;

    seconds = seconds<10 ? "0" + seconds : seconds;
    countDown.innerHTML = `${minutes}:${seconds}`;
    shortSecs--;
    if(shortSecs == 00){
        window.alert("Let's get back to work!!");
        clearInterval(timerId);
        pomoSecs = pomoMins * 60;
        pomoMins =15;
        timerId = setInterval(updateCountdown, 1000);
        cycle++;
    }
}
//Long-break
let longMins = 15;
let longSecs = longMins * 60;
long.addEventListener('click', ()=>{
    colorChange("hsl(105, 16%, 40%)");
    pomoMins = 25;
    pomoSecs = pomoMins * 60;
    shortMins = 5;
    shortSecs = shortMins * 60;
    if(isClockRunning == true){
        clearInterval(timerId);
        timerId = setInterval(updateCountdownLong, 1000);
    }
    else{
        timerId = setInterval(updateCountdownLong, 1000);
        isClockRunning = true;
    }   
})
function updateCountdownLong() {
    const minutes = Math.floor(longSecs / 60);
    let seconds = longSecs % 60;

    seconds = seconds<10 ? "0" + seconds : seconds;
    countDown.innerHTML = `${minutes}:${seconds}`;
    longSecs--;
    if(longSecs == 00){
        clearInterval(timerId);
        timerId = setInterval(updateCountdown, 1000);
    }
}
//Stop timer
stop.addEventListener('click', ()=>{
    stopTimer()
})
const stopTimer = () => {
    paused = true;
    clearInterval(timerId);
}
//Reset timer
reset.addEventListener('click', ()=>{
    resetTimer()
})
const resetTimer = () => {
    clearInterval(timerId);
    pomoMins = 25;
    pomoSecs = pomoMins * 60;
    shortMins = 5;
    shortSecs = shortMins * 60;
    longMins = 15;
    longSecs = longMins * 60;
    countDown.innerHTML = "25:00";
}
//Asking the user to input time;
add.addEventListener('click', ()=>{
    inputMinutes()
})
const inputMinutes = () => {
//work time
    const updateCountdownInput = () => {
        colorChange( "hsl(223, 25%, 40%)");
        const minutes = Math.floor(pomoSecs / 60);
        let seconds = pomoSecs % 60;
        seconds = seconds<10 ? "0" + seconds : seconds;
        countDown.innerHTML = `${minutes}:${seconds}`;
        pomoSecs--;
        if(pomoSecs == 00 ){
            window.alert("Take a break!!");
            clearInterval(timerId);
            shortMins = inputShortMins;
            shortSecs = shortMins * 60;
            timerId = setInterval(updateCountdownShortInput, 1000);
            inputCycle++;                
        }
    }
//short-break
    const updateCountdownShortInput =()=>{
        colorChange("hsl(48, 23%, 40%)");
        const minutes = Math.floor(shortSecs / 60);
        let seconds = shortSecs % 60;
        seconds = seconds<10 ? "0" + seconds : seconds;
        countDown.innerHTML = `${minutes}:${seconds}`;
        shortSecs--;
        if(shortSecs == 00){
            window.alert("Let's get back to work!!");
            clearInterval(timerId);
            pomoMins = inputPomoMins;
            pomoSecs = inputPomoMins * 60;
            timerId = setInterval(updateCountdownInput, 1000);
            inputCycle++;
            if(inputCycle == 4){
                clearInterval(timerId);
                longMins = 15;
                longSecs = longMins * 60;
                timerId = setInterval(updateCountdownLong, 1000);
            }
        }
    }
    let inputCycle = 0;
    let inputPomoMins = window.prompt("Enter Pomodoro Minutes");
    let inputShortMins = window.prompt("Enter Short-Break Minutes");
    if(inputPomoMins.match(/[\d]/) && inputShortMins.match(/[\d]/)){
       pomoMins = inputPomoMins;
       pomoSecs = pomoMins * 60;
       mins = Math.floor(pomoSecs / 60);
       secs = pomoSecs % 60;
       secs = secs< 10? "0"+secs : secs;
       countDown.innerHTML = `${mins}:${secs}`;
       clearInterval(timerId);
       timerId = setInterval(updateCountdownInput, 1000);
    }
    else{
        window.alert("Please enter a valid time input");
    }
}




 

