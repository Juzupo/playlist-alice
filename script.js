const songName = document.getElementById('song-name')
const bandName = document.getElementById('band-name')
const song = document.getElementById('audio')
const cover = document.getElementById('cover')
const play = document.getElementById('play')
const next = document.getElementById('next')
const previous = document.getElementById('previous')
const likeButton = document.getElementById('like')
const currentProgress = document.getElementById('current-progress')
const progressContainer = document.getElementById('progress-container')
const shuffleButton = document.getElementById('shuffle')
const repeatButton = document.getElementById('repeat')
const songTime = document.getElementById('song-time')
const totalTime = document.getElementById('total-time')

const snap = {
  songName: 'Snap',
  artist: 'Rosa Linn',
  file: 'Snap - Rosa Linn',
  liked: false
}

const siNoEstas = {
  songName: 'Si No Estás',
  artist: 'Iñigo Quintero',
  file: 'Si No Estás - Iñigo Quintero',
  liked: false
}

const flowers = {
  songName: 'Flowers',
  artist: 'Miley Cyrus',
  file: 'Flowers - Miley Cyrus',
  liked: false
}

const iWannaDanceWithSomebody = {
  songName: 'I Wanna Dance With Somebody',
  artist: 'Whitney Houston',
  file: 'I Wanna Dance With Somebody - Whitney Houston',
  liked: false
}

const angelsLikeYou = {
  songName: 'Angels Like You',
  artist: 'Miley Cyrus',
  file: 'Angels Like You - Miley Cyrus',
  liked: false
}

const confident = {
  songName: 'Confident',
  artist: 'Demi Lovato',
  file: 'Confident - Demi Lovato',
  liked: false
}

const despacito = {
  songName: 'Despacito',
  artist: 'Luis Fonsi',
  file: 'Despacito - Luis Fonsi',
  liked: false
}

const jaded = {
  songName: 'Jaded',
  artist: 'Miley Cyrus',
  file: 'Jaded - Miley Cyrus',
  liked: false
}

const naoFosseTaoTarde = {
  songName: 'Não Fosse Tão Tarde',
  artist: 'Lou Garcia',
  file: 'Não Fosse Tão Tarde - Lou Garcia',
  liked: false
}

const thatsMyGirl = {
  songName: 'Thats My Girl',
  artist: 'Fifth Harmony',
  file: 'Thats My Girl - Fifth Harmony',
  liked: false
}

const partyInTheUsa = {
  songName: 'Party In The-U.S.A.',
  artist: 'Miley Cyrus',
  file: 'Party In The-U.S.A. - Miley Cyrus',
  liked: false
}

const nossoQuadro = {
  songName: 'Nosso Quadro',
  artist: 'Ana Castela',
  file: 'Nosso Quadro - Ana Castela',
  liked: false
}

const iWillBeWaiting = {
  songName: 'I Will Be Waiting',
  artist: 'Cian-Ducrot',
  file: 'I Will Be Waiting - Cian-Ducrot',
  liked: false
}

const weCantStop = {
  songName: 'We Cant Stop',
  artist: 'Miley Cyrus',
  file: 'We Cant Stop - Miley Cyrus',
  liked: false
}

const levitating = {
  songName: 'Levitating',
  artist: 'Dua Lipa',
  file: 'Levitating - Dua Lipa',
  liked: false
}

let isPlaying = false
let isShuffled = false
let repeatOn = false
const originalPlaylist = [
  snap,
  siNoEstas,
  flowers,
  iWannaDanceWithSomebody,
  angelsLikeYou,
  confident,
  despacito,
  jaded,
  naoFosseTaoTarde,
  thatsMyGirl,
  partyInTheUsa,
  nossoQuadro, iWillBeWaiting, weCantStop, levitating
]
let sortedPlaylist = [...originalPlaylist]
let index = 0

function playSong() {
  play.querySelector('.bi').classList.remove('bi-play-circle-fill')
  play.querySelector('.bi').classList.add('bi-pause-circle-fill')
  song.play()
  isPlaying = true
}

function pauseSong() {
  play.querySelector('.bi').classList.add('bi-play-circle-fill')
  play.querySelector('.bi').classList.remove('bi-pause-circle-fill')
  song.pause()
  isPlaying = false
}

function playPauseDecider() {
  if (isPlaying === true) {
    pauseSong()
  } else {
    playSong()
  }
}

function likeButtonRender() {
  if (sortedPlaylist[index].liked === true) {
    likeButton.querySelector('.bi').classList.remove('bi-heart');
    likeButton.querySelector('.bi').classList.add('bi-heart-fill');
    likeButton.classList.add('button-active');
  }
  else {
    likeButton.querySelector('.bi').classList.add('bi-heart');
    likeButton.querySelector('.bi').classList.remove('bi-heart-fill');
    likeButton.classList.remove('button-active');
  }
}

function initializeSong() {
  cover.src = `assets/${sortedPlaylist[index].file}.jpg`
  song.src = `songs/${sortedPlaylist[index].file}.mp3`
  songName.innerText = sortedPlaylist[index].songName
  bandName.innerText = sortedPlaylist[index].artist
  likeButtonRender();
}

function previousSong() {
  if (index === 0) {
    index = sortedPlaylist.length - 1
  } else {
    index -= 1
  }
  initializeSong()
  playSong()
}

function nextSong() {
  if (index === sortedPlaylist.length - 1) {
    index = 0
  } else {
    index += 1
  }
  initializeSong()
  playSong()
}

function updateProgress() {
  const barWidth = (song.currentTime / song.duration) * 100
  currentProgress.style.setProperty('--progress', `${barWidth}%`)
  songTime.innerText = toHHMMSS(song.currentTime);

}

function jumpTo(event) {
  const width = progressContainer.clientWidth
  const clickPosition = event.offsetX
  const jumpToTime = (clickPosition / width) * song.duration
  song.currentTime = jumpToTime
}

function shuffleArray(preShuffleArray) {
  const size = preShuffleArray.length
  let currentIndex = size - 1
  while (currentIndex > 0) {
    let randomIndex = Math.floor(Math.random() * size)
    let aux = preShuffleArray[currentIndex]
    preShuffleArray[currentIndex] = preShuffleArray[randomIndex]
    preShuffleArray[randomIndex] = aux
    currentIndex -= 1
  }
}

function shuffleButtonClicked() {
  if (isShuffled === false) {
    isShuffled = true
    shuffleArray(sortedPlaylist)
    shuffleButton.classList.add('button-active')
  } else {
    isShuffled = false
    sortedPlaylist = [...originalPlaylist]
    shuffleButton.classList.remove('button-active')
  }
}

function repeatButtonClicked() {
  if (repeatOn === false) {
    repeatOn = true
    repeatButton.classList.add('button-active')
  } else {
    repeatOn = false
    repeatButton.classList.remove('button-active')
  }
}

function nextOrRepeat() {
  if (repeatOn === false) {
    nextSong()
  } else {
    playSong()
  }
}

function toHHMMSS(originalNumber) {
  let hours  = Math.floor(originalNumber/3600);
  let min = Math.floor((originalNumber - hours * 3600)/60);
  let secs = Math.floor(originalNumber - hours * 3600 - min * 60);

  return`${hours.toString().padStart(2, '0')}:${min.toString().padStart(2,'0')}:${secs.toString().padStart(2, '0')}`;
}


function updateTotalTime() {
  totalTime.innerText = toHHMMSS(song.duration);
}

function likeButtonClicked() {
  if(sortedPlaylist[index].liked === false){
    sortedPlaylist[index].liked = true;
  } else {
    sortedPlaylist[index].liked = false;
  }
  likeButtonRender();

}

initializeSong()

play.addEventListener('click', playPauseDecider)
previous.addEventListener('click', previousSong)
next.addEventListener('click', nextSong)
song.addEventListener('timeupdate', updateProgress)
song.addEventListener('ended', nextOrRepeat)
song.addEventListener('loadedmetadata', updateTotalTime)
progressContainer.addEventListener('click', jumpTo)
shuffleButton.addEventListener('click', shuffleButtonClicked)
repeatButton.addEventListener('click', repeatButtonClicked)
likeButton.addEventListener('click', likeButtonClicked)
