const maxTime = 20;
const timerButton = document.getElementById("btn-timer");
const timerBar = document.getElementById("bar-timer");

let currentTime = 0;
let timerInterval = null;

timerButton.addEventListener("click", (evt) => {
    if (timerInterval) clearInterval(timerInterval);
    
    timerBar.classList.remove("deplete");
    setTimeout(() => { timerBar.classList.add("deplete"); }, 1); // Hack to make the timer actually reset

    currentTime = maxTime;
    timerBar.innerHTML = currentTime + "s";

    timerInterval = setInterval(() => {
        currentTime--;
        timerBar.innerHTML = currentTime + "s";
    }, 1000);
});