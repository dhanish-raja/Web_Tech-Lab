// Helper function to turn seconds (like 65) into M:SS (like 1:05)
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

// 1. Select the elements from the HTML
const audio = document.getElementById('myAudio');
const audioDisplay = document.getElementById('audioTime');
const video = document.getElementById('myVideo');
const videoDisplay = document.getElementById('videoTime');

// 2. Add event listener for Audio
audio.addEventListener('timeupdate', () => {
    audioDisplay.textContent = formatTime(audio.currentTime);
});

// 3. Add event listener for Video
video.addEventListener('timeupdate', () => {
    videoDisplay.textContent = formatTime(video.currentTime);
});