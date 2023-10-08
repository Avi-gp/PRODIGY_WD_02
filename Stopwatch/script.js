// JavaScript code
let startTime = 0; // Timestamp when the timer starts
let intervalId; // Interval ID to control the timer
let running = false; // Flag to track if the timer is running
let lapCounter = 1; // Counter for lap numbers

// Get the timer display element
const display = document.getElementById("display");

// Get the control buttons
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const resetBtn = document.getElementById("resetBtn");
const lapBtn = document.getElementById("lapBtn");

// Get the lap list element
const lapList = document.getElementById("lapList");

// Event listener for the start button
startBtn.addEventListener("click", startTimer);

// Event listener for the stop button
stopBtn.addEventListener("click", stopTimer);

// Event listener for the reset button
resetBtn.addEventListener("click", resetTimer);

// Event listener for the lap button
lapBtn.addEventListener("click", recordLap);

let pausedTime = 0; // Initialize pausedTime

function startTimer() {
    if (!running) {
        if (startTime === 0) {
            startTime = Date.now() - pausedTime;
        }
        intervalId = setInterval(updateTimer, 10);
        startBtn.textContent = "Pause";
        running = true;
    } else {
        clearInterval(intervalId);
        startBtn.textContent = "Resume";
        pausedTime = Date.now() - startTime;
        running = false;
    }
}

function stopTimer() {
    if (running) {
        clearInterval(intervalId);
        startBtn.textContent = "Resume";
        pausedTime = Date.now() - startTime;
        running = false;
    }
}

function resetTimer() {
    clearInterval(intervalId);
    display.textContent = "00:00:000";
    startBtn.textContent = "Start";
    startTime = 0;
    running = false;
    lapCounter = 1;
    lapList.innerHTML = "";
    pausedTime = 0;
}

function updateTimer() {
    const currentTime = Date.now() - startTime;
    const minutes = Math.floor(currentTime / 60000);
    const seconds = Math.floor((currentTime % 60000) / 1000);
    const milliseconds = currentTime % 1000;
    display.textContent =
        `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}:${milliseconds.toString().padStart(3, "0")}`;
}

function recordLap() {
    if (running) {
        const lapTime = display.textContent;
        const lapItem = document.createElement("li");
        lapItem.textContent = `Lap ${lapCounter}: ${lapTime}`;
        lapList.appendChild(lapItem);
        lapCounter++;
    }
}
