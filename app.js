console.log("Hello guyz welcome to my music player");
let audioElement = new Audio("./music/2.mp3");
let masterPlay = document.querySelector("#masterPlay");
let progressBar = document.querySelector(".progress-bar");
let gif = document.querySelector(".gif");

let masterInfo = document.querySelector('.playing-song');
let masterArtist = document.querySelector(".playing-artist");
let masterImg = document.querySelector('.playing-img');
let songs = [
    {songName: "Mahiye Jinna Sohna", filePath:"./music/song1.mp3", coverPath: "./Assets/card2img.jpeg" ,artist:"Darshan Raval"},
    {songName: "Apna Bana le", filePath:"./music/song2.mp3", coverPath: "./Assets/song1.png" ,artist:"Arijit Singh"},
    {songName: "Heeriye", filePath:"./music/song3.mp3", coverPath: "./Assets/song2.png" ,artist:"Arijit Singh"},
    {songName: "Chaleya", filePath:"./music/song4.mp3", coverPath: "./Assets/song3.png" ,artist:"Arijit Singh,Shilpa Rao"}
]

songIndex = 0;

// for(song of songs){
// console.log(songs[song].songName);}

// audioElement.play();

//Handling play/pause click
masterPlay.addEventListener("click",()=> {
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause');
        gif.style.opacity = 1;
    } else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause');
        masterPlay.classList.add('fa-play');
        gif.style.opacity = 0;
    }
})

//progress bar
function updateProgressBar() {
    var progress = (audioElement.currentTime / audioElement.duration) * 100;
    progressBar.value = progress;
    requestAnimationFrame(updateProgressBar);
  }
  
  audioElement.addEventListener("timeupdate", () => {
    requestAnimationFrame(updateProgressBar);
    updateCurrentTime();
  });

  //for time update
  let currentTimeDisplay = document.querySelector(".cur-time");
  function updateCurrentTime(){
    var minutes = Math.floor(audioElement.currentTime / 60);
    var seconds = Math.floor(audioElement.currentTime % 60);
    seconds = seconds < 10 ? "0" + seconds : seconds;
    currentTimeDisplay.innerHTML = minutes + ":" + seconds;
  }

  

  progressBar.addEventListener('input', () => {
    // Use 'input' event instead of 'change' for a more responsive interaction
    audioElement.currentTime = progressBar.value * audioElement.duration / 100;
  });
  
  // Start updating the progress bar when the audio starts playing
  audioElement.addEventListener("play", () => {
    requestAnimationFrame(updateProgressBar);
  });
  

Array.from(document.querySelectorAll('.songItem')).forEach((element)=>{
    element.addEventListener('click', (e) => {
         e.preventDefault();
        songIndex = parseInt(e.target.id);
    
        if (!isNaN(songIndex)) {
            console.log(songIndex);
            masterInfo.innerText = songs[songIndex-1].songName;
            masterArtist.innerText = songs[songIndex-1].artist;
            masterImg.src = songs[songIndex-1].coverPath;
            audioElement.src = `./music/${songIndex}.mp3`;
            audioElement.currentTime = 0;
            audioElement.play();
            masterPlay.classList.remove('fa-play');
            masterPlay.classList.add('fa-pause');
        } else {
            console.error('Invalid index:', e.target.id);
        }
    });
    
    })

    document.querySelector('#next').addEventListener('click',()=>{
        if(songIndex>4){
            songIndex = 0;
        } else{
            songIndex +=1;
        }
        audioElement.src = `./music/${songIndex}.mp3`;
        masterInfo.innerText = songs[songIndex-1].songName;
        masterArtist.innerText = songs[songIndex-1].artist;
        masterImg.src = songs[songIndex-1].coverPath;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause');
    })

    document.querySelector('#previous').addEventListener('click',()=>{
        if(songIndex<=0){
            songIndex = 0;
        } else{
            songIndex -=1;
        }
        audioElement.src = `./music/${songIndex}.mp3`;
        masterInfo.innerText = songs[songIndex-1].songName;
        masterArtist.innerText = songs[songIndex-1].artist;
        masterImg.src = songs[songIndex-1].coverPath;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause');
    })



    function togglePlayPause() {
        if (audioElement.paused) {
          audioElement.play();
          masterPlay.classList.remove('fa-play');
          masterPlay.classList.add('fa-pause');
          gif.style.opacity = 1;
        } else {
          audioElement.pause();
          masterPlay.classList.remove('fa-pause');
          masterPlay.classList.add('fa-play');
          gif.style.opacity = 0;
        }
      }
    //using space key to play and pause 
    document.addEventListener("keydown",function(event){
        if(event.code==="Space" && event.target ===document.body){
            event.preventDefault();  // Prevent scrolling
            togglePlayPause();
            
        }
    })

    //For volume slider

    let volumeSlider = document.querySelector("#volume-bar");
    let volumeIcon = document.querySelector("#volume-bar-icon");
    volumeSlider.addEventListener("input",()=>{
        audioElement.volume = volumeSlider.value;
        updateVolumeIcon();
         
    })

    function updateVolumeIcon(){
        if(volumeSlider.value === 0){
            volumeIcon.classList.remove('fa-volume-high');
            volumeIcon.classList.add('fa-volume-xmark');
        } else if(volumeSlider.value <0.5){
            volumeIcon.classList.remove('fa-volume-high');
            volumeIcon.classList.add('fa-volume-low');
         }else {
            volumeIcon.classList.add('fa-volume-high');
    }
    }

   