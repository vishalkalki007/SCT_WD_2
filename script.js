// State tracking variables
let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let lapCount = 0;

// Grabbing DOM elements
const displayEl = document.getElementById('display');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const lapBtn = document.getElementById('lapBtn');
const resetBtn = document.getElementById('resetBtn');
const lapsContainer = document.getElementById('lapsContainer');

// Utility: Converts milliseconds into a readable digital clock format
function formatTime(time) {
    let hours = Math.floor(time / 3600000);
    let minutes = Math.floor((time % 3600000) / 60000);
    let seconds = Math.floor((time % 60000) / 1000);
    let milliseconds = Math.floor((time % 1000) / 10);

    let padH = String(hours).padStart(2, '0');
    let padM = String(minutes).padStart(2, '0');
    let padS = String(seconds).padStart(2, '0');
    let padMS = String(milliseconds).padStart(2, '0');

    return `${padH}:${padM}:${padS}.<small>${padMS}</small>`;
}

// Action: Starts tracking the system clock difference
function start() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(function() {
        elapsedTime = Date.now() - startTime;
        displayEl.innerHTML = formatTime(elapsedTime);
    }, 10); // Refresh every 10 milliseconds

    // Adjust visibility/state of elements
    startBtn.style.display = 'none';
    pauseBtn.style.display = 'block';
    lapBtn.disabled = false;
}

// Action: Pauses the execution interval
function pause() {
    clearInterval(timerInterval);
    
    // Toggle main operational buttons
    pauseBtn.style.display = 'none';
    startBtn.style.display = 'block';
}

// Action: Clears runtime storage and UI historical records
function reset() {
    clearInterval(timerInterval);
    displayEl.innerHTML = "00:00:00.<small>00</small>";
    elapsedTime = 0;
    lapCount = 0;
    lapsContainer.innerHTML = '';
    lapsContainer.style.display = 'none';

    // Reset default button configurations
    pauseBtn.style.display = 'none';
    startBtn.style.display = 'block';
    lapBtn.disabled = true;
}

// Action: Stamps the instantaneous time into the lap list
function lap() {
    lapCount++;
    if (lapCount === 1) {
        lapsContainer.style.display = 'block';
    }

    const lapItem = document.createElement('div');
    lapItem.classList.add('lap-item');
    
    const currentFormattedTime = formatTime(elapsedTime);

    lapItem.innerHTML = `
        <span class="lap-number">Lap ${lapCount}</span>
        <span class="lap-time">${currentFormattedTime}</span>
    `;

    // Always append latest recorded data to the top of the container box
    lapsContainer.insertBefore(lapItem, lapsContainer.firstChild);
}

// Hooking JavaScript actions to HTML button click streams
startBtn.addEventListener('click', start);
pauseBtn.addEventListener('click', pause);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', lap);