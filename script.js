//DOM
const music = document.querySelector('audio');
const pevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

//Check if Audio is playing
let isPlaying = false;

//Play Audio
function playSong() {
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause')
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

//Pause Audio
function pauseSong() {
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play')
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

//Event Listener: Play or Pause
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));