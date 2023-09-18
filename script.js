//DOM
const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');

const music = document.querySelector('audio');

const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');

const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');

const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

//Music Array os Objects
const songs = [
    {
        name: 'jacinto-1',
        displayName: 'Electric Chill Machine',
        artist: 'Jacinto Design',
    },
    {
        name: 'jacinto-2',
        displayName: 'Seven Nation Army (Remix)',
        artist: 'Jacinto Design',
    },
    {
        name: 'jacinto-3',
        displayName: 'Goodnight, Disco Queen',
        artist: 'Jacinto Design',
    },
];

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

//Update DOM
function loadSong(song) {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;
}

//Current Song
let songIndex = 0

//nextSong Function
function nextSong() {
    songIndex++;
    //resolve error in scroll songs: out of range
    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }
    //console.log(songIndex);
    loadSong(songs[songIndex]);
    playSong();
};

//prevSong Function
function prevSong() {
    songIndex--;
    //resolve error in scroll songs: negative index
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }
    //console.log(songIndex);
    loadSong(songs[songIndex])
    playSong();
}

//On Load - Select first song
loadSong(songs[songIndex]);

//Event Listener: prev next song
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

//updateProgressBar and time function
function updateProgressBar(Event){
    if (isPlaying) {
        //Grab events duration and current time of song
        const { duration, currentTime } = Event.srcElement;
        //console.log(duration, currentTime);
        //Update progress bar width
        const progressPercent = (currentTime/duration) * 100;
        progress.style.width = `${progressPercent}%` //manipulate the width param of the CSS style of the progress bar
        //Calculate display for the duration
        const durationMinutes = Math.floor(duration / 60);
        console.log('minutes', durationMinutes);
        let durationSeconds = Math.floor(duration % 60);
        if (durationSeconds < 10 ) {
            durationSeconds = `0${durationSeconds}`;
        }
        console.log('seconds', durationSeconds)
        //Delay switching duration element to avoid not a number
        if (durationSeconds) {
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`; //set the text content of duration element
        }

        //Calculate display for the current time
        const currentMinutes = Math.floor(currentTime / 60);
        console.log('minutes', currentMinutes);
        let currentSeconds = Math.floor(currentTime % 60);
        if (currentSeconds < 10 ) {
            currentSeconds = `0${currentSeconds}`;
        }
        console.log('seconds', currentSeconds)
        currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`; //set the text content of current time element
    }
}

//Event Listener: time update
music.addEventListener('timeupdate', updateProgressBar);