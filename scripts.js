let startTime, updatedTime, difference, tInterval, running = false, lapCount = 0;
const display = document.getElementById('display');
const lapList = document.getElementById('lapList');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');

function startTimer() {
    if (!running) {
        running = true;
        startTime = new Date().getTime();
        tInterval = setInterval(getShowTime, 1);
    }
}

function getShowTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    display.innerHTML = `${formatNumber(hours)}:${formatNumber(minutes)}:${formatNumber(seconds)}`;
}

function formatNumber(num) {
    return num < 10 ? `0${num}` : num;
}

function pauseTimer() {
    if (running) {
        running = false;
        clearInterval(tInterval);
    }
}

function resetTimer() {
    running = false;
    clearInterval(tInterval);
    display.innerHTML = '00:00:00';
    lapList.innerHTML = '';
    lapCount = 0;
}

function addLap() {
    if (running) {
        lapCount++;
        const lapTime = display.innerHTML;
        const lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${lapCount}: ${lapTime}`;
        lapList.appendChild(lapItem);
    }
}

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
lapButton.addEventListener('click', addLap);
