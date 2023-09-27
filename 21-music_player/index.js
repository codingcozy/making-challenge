const colorThief = new ColorThief();
const player = document.querySelector(".music_player");
const coverImage = player.querySelector(".image");
const songTitle = player.querySelector(".song_title");
const artist = player.querySelector(".artist");
const likeBtn = player.querySelector(".btn_like");
const dislikeBtn = player.querySelector(".btn_dislike");
const playBtn = player.querySelector(".btn_play");
const prevBtn = player.querySelector(".btn_prev");
const nextBtn = player.querySelector(".btn_next");
const shuffleBtn = player.querySelector(".btn_shuffle");
const repeatBtn = player.querySelector(".btn_repeat");
const progressBar = player.querySelector(".progress_bar");
const progress = player.querySelector(".progress");
const current = player.querySelector(".current");
const end = player.querySelector(".end");
const img = player.querySelector(".image");

img.addEventListener("load", () => {
  let color = colorThief.getColor(img);

  const player = document.querySelector(".music_player");
  player.style.backgroundColor = `rgb(${color[0]} , ${color[1]} , ${color[2]})`;
});

const songs = [
  { title: "Clean My Room", artist: "Ben Wagner", cover: "cover1.png", fileName: "1.mp3" },
  { title: "Night Skies", artist: "Paper Planes", cover: "cover2.png", fileName: "2.mp3" },
  { title: "Friend Till the End", artist: "Gabe Price", cover: "cover3.png", fileName: "3.mp3" },
];

let currentSongIndex = 0;
let isPlaying = false;
let isShuffle = false;
let isRepeat = false;

function loadSong(songIndex) {
  const song = songs[songIndex];

  coverImage.src = song.cover;
  songTitle.textContent = song.title;
  artist.textContent = song.artist;

  const prevAudio = document.querySelector("audio");
  if (prevAudio) prevAudio.remove();

  const audio = new Audio();
  document.querySelector("body").appendChild(audio);

  audio.src = "./" + song.fileName;
  audio.addEventListener("loadedmetadata", () => {
    progressBar.max = audio.duration;

    const minute = Math.floor(audio.duration / 60);
    const second = Math.floor(audio.duration % 60);

    end.textContent = `${minute}:${second}`;
  });

  audio.addEventListener("timeupdate", () => {
    const minute = Math.floor(audio.currentTime / 60);
    const second = String(Math.floor(audio.currentTime % 60)).padStart(2, "0");

    current.textContent = `${minute}:${second}`;
    progress.style.width = `${Math.floor((audio.currentTime / audio.duration) * 100)}%`;
  });

  audio.addEventListener("ended", () => {
    if (isRepeat) {
      audio.currentTime = 0;
      audio.play();
    } else {
      // nextSong();
    }
  });

  audio.play();
}

function playSong() {
  isPlaying = true;
  playBtn.classList.add("pause");

  const audio = document.querySelector("audio");
  audio.play();
}

function pauseSong() {
  isPlaying = false;
  playBtn.classList.remove("pause");
  const audio = document.querySelector("audio");
  audio.pause();
}

function nextSong() {
  currentSongIndex = isShuffle ? getRandomSongIndex() : (currentSongIndex + 1) % songs.length;
  loadSong(currentSongIndex);
  if (!isPlaying) playSong();
}

function prevSong() {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  loadSong(currentSongIndex);
  if (!isPlaying) playSong();
}

function shuffleSongs() {
  isShuffle = !isShuffle;
  if (isShuffle) {
    const currentIndex = currentSongIndex;
    let shuffledSongs = [...songs];

    for (let i = shuffledSongs.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffleSongs[i], shuffleSongs[j]] = [shuffledSongs[j], shuffledSongs[i]];
    }
    currentSongIndex = shuffledSongs.findIndex((song) => (song.title = songs[currentIndex].title));
    songs.splice(currentIndex, 1, ...shuffledSongs);
    loadSong(currentSongIndex);
  } else {
    songs.splice(currentSongIndex, 1, ...songs.splice(0, currentSongIndex));
    loadSong(currentSongIndex);
  }
}

function repeatSong() {
  isRepeat = !isRepeat;
  repeatBtn.classList.toggle("active", isRepeat);
}

function getRandomSongIndex() {
  return Math.floor(Math.random() * songs.length);
}

function likeSong() {
  likeBtn.classList.add("active");
  dislikeBtn.classList.remove("active");
}

function dislikeSong() {
  likeBtn.classList.remove("active");
  dislikeBtn.classList.add("active");
}

playBtn.addEventListener("click", () => {
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

nextBtn.addEventListener("click", () => {
  nextSong();
});

prevBtn.addEventListener("click", () => {
  prevSong();
});

shuffleBtn.addEventListener("click", () => {
  shuffleSongs();
});

repeatBtn.addEventListener("click", () => {
  repeatSong();
});

likeBtn.addEventListener("click", () => {
  likeSong();
});

dislikeBtn.addEventListener("click", () => {
  dislikeSong();
});

loadSong(currentSongIndex);
