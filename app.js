console.log("Hello guyz welcome to my music player");
let audioElement = new Audio("./music/2.mp3");
let masterPlay = document.querySelector("#masterPlay");
let progressBar = document.querySelector(".progress-bar");
let gif = document.querySelector(".gif");
let songs = [
    {songName: "Mahiye Jinna Sohna", filePath:"./music/song1.mp3", coverPath: "./Assets/card2img.jpeg"},
    {songName: "Apna Bana le", filePath:"./music/song2.mp3", coverPath: "./Assets/song1.png"},
    {songName: "Heeriye", filePath:"./music/song3.mp3", coverPath: "./Assets/song2.png"},
    {songName: "Chaleya", filePath:"./music/song4.mp3", coverPath: "./Assets/song3.png"}
]

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

//Progress bar updation
audioElement.addEventListener("timeupdate",()=>{
    let progress = parseInt((audioElement.currentTime/audioElement.duration)*100)   //this will give use percentage of song played
    progressBar.value = progress;
})

progressBar.addEventListener('change',()=>{
    audioElement.currentTime = progressBar.value * audioElement.duration/100;
    
})

