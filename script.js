// Sample data with real URLs
const sampleTracks = [
    { title: "Chill Day", artist: "LAKEY INSPIRED", url: "https://www.bensound.com/bensound-music/bensound-chillday.mp3", albumArt: "https://www.bensound.com/bensound-music/bensound-chillday.jpg" },
    { title: "Sunny", artist: "KODOMOi", url: "https://www.bensound.com/bensound-music/bensound-sunny.mp3", albumArt: "https://www.bensound.com/bensound-music/bensound-sunny.jpg" },
    { title: "Better Days", artist: "Bensound", url: "https://www.bensound.com/bensound-music/bensound-betterdays.mp3", albumArt: "https://www.bensound.com/bensound-music/bensound-betterdays.jpg" }
];

let audio = new Audio();
let currentTrackIndex = 0;

// DOM elements
const playPauseBtn = document.getElementById('play-pause-btn');
const nextBtn = document.getElementById('next-btn');
const prevBtn = document.getElementById('prev-btn');
const volumeControl = document.getElementById('volume-control');
const progressBar = document.getElementById('progress-bar');
const timeInfo = document.getElementById('time-info');
const albumArt = document.getElementById('album-art');
const songTitle = document.getElementById('song-title');
const songArtist = document.getElementById('song-artist');
const trackList = document.getElementById('track-list');

// Load track into the player
function loadTrack(index) {
    const track = sampleTracks[index];
    audio.src = track.url;
    albumArt.src = track.albumArt;
    songTitle.textContent = track.title;
    songArtist.textContent = track.artist;
}

// Play or pause the current track
function togglePlayPause() {
    if (audio.paused) {
        audio.play();
        playPauseBtn.textContent = 'Pause';
    } else {
        audio.pause();
        playPauseBtn.textContent = 'Play';
    }
}

// Play next track
function playNextTrack() {
    currentTrackIndex = (currentTrackIndex + 1) % sampleTracks.length;
    loadTrack(currentTrackIndex);
    audio.play();
    playPauseBtn.textContent = 'Pause';
}

// Play previous track
function playPrevTrack() {
    currentTrackIndex = (currentTrackIndex - 1 + sampleTracks.length) % sampleTracks.length;
    loadTrack(currentTrackIndex);
    audio.play();
    playPauseBtn.textContent = 'Pause';
}

// Update volume
function updateVolume() {
    audio.volume = volumeControl.value;
}

// Update progress bar
function updateProgress() {
    progressBar.max = audio.duration;
    progressBar.value = audio.currentTime;
    const minutes = Math.floor(audio.currentTime / 60);
    const seconds = Math.floor(audio.currentTime % 60).toString().padStart(2, '0');
    const totalMinutes = Math.floor(audio.duration / 60);
    const totalSeconds = Math.floor(audio.duration % 60).toString().padStart(2, '0');
    timeInfo.textContent = `${minutes}:${seconds} / ${totalMinutes}:${totalSeconds}`;
}

// Handle progress bar interaction
function handleProgressClick(e) {
    const rect = progressBar.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const clickedTime = (x / progressBar.offsetWidth) * audio.duration;
    audio.currentTime = clickedTime;
}

// Event listeners
playPauseBtn.addEventListener('click', togglePlayPause);
nextBtn.addEventListener('click', playNextTrack);
prevBtn.addEventListener('click', playPrevTrack);
volumeControl.addEventListener('input', updateVolume);
progressBar.addEventListener('input', handleProgressClick);
audio.addEventListener('timeupdate', updateProgress);

// Load initial track
loadTrack(currentTrackIndex);
