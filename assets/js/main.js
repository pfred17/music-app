const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const playBtn = $(".play");
const cd = $(".thumbnail-img");
const nameSong = $(".name-song");
const author = $(".author");
const audio = $("#audio");
const progress = $("#progress");
const nextBtn = $(".next");
const prevBtn = $(".prev");
const randomSong = $(".random");
const loop = $(".loop");
const closeBtn = $(".close");
const playListBtn = $(".list-songs");
const boxPlaylist = $(".list-songs_box");
const allSong = $(".all-songs");
const overlay = $(".overlay");
const app = {
  currentIndex: 0,
  isPlaying: false,
  isRandom: false,
  isLoop: false,
  songs: [
    {
      name: "Call Of My Name",
      singer: "The Weeknd",
      path: "./assets/song/song10.mp3",
      img: "./assets/img/img10.jpg",
    },
    {
      name: "Relay trên con Guây",
      singer: "Phúc Du",
      path: "./assets/song/song1.mp3",
      img: "./assets/img/img1.webp",
    },
    {
      name: "Giây phút",
      singer: "Kidsai",
      path: "./assets/song/song2.mp3",
      img: "./assets/img/img2.jpg",
      author: "Phúc Du",
    },
    {
      name: "Hrs and Hrs",
      singer: "Muni Long",
      path: "./assets/song/song3.mp3",
      img: "./assets/img/img3.jpg",
    },
    {
      name: "Get You",
      singer: "Daniel Ceasar",
      path: "./assets/song/song4.mp3",
      img: "./assets/img/img4.jpg",
    },
    {
      name: "Chuyện đôi ta",
      singer: "Muội",
      path: "./assets/song/song5.mp3",
      img: "./assets/img/img5.jpg",
    },
    {
      name: "Em không khóc",
      singer: "Buitruonglinh",
      path: "./assets/song/song6.mp3",
      img: "./assets/img/img6.jpg",
    },
    {
      name: "Lana de rey",
      singer: "Anonymous",
      path: "./assets/song/song7.mp3",
      img: "./assets/img/img7.jpg",
    },
    {
      name: "Another love",
      singer: "Tom Adell",
      path: "./assets/song/song8.mp3",
      img: "./assets/img/img8.jpg",
    },
    {
      name: "Under The Influence",
      singer: "Chris Brown ",
      path: "./assets/song/song9.mp3",
      img: "./assets/img/img9.jpg",
    },
  ],
  defineProperties: function () {
    Object.defineProperty(this, "currentSong", {
      get: function () {
        return this.songs[this.currentIndex];
      },
    });
  },
  renderPlaylist: function () {
    const htmls = this.songs.map((song) => {
      return `
      <div class="item-song">
      <div class="left-item-song">
        <div class="avatar">
          <img src="${song.img}" alt="#" class=" avatar avatar-img">
        </div>
          <span class="item-name">${song.name}</span>
      </div>
      <span class="list-songs_icon"><i class="fa-regular fa-heart"></i></span>
    </div>`;
    });
    allSong.innerHTML = htmls.join("");
  },
  loadCurrentSong: function () {
    cd.src = this.currentSong.img;
    nameSong.textContent = this.currentSong.name;
    author.textContent = this.currentSong.singer;
    audio.src = this.currentSong.path;
  },
  handleEvent: function () {
    const _this = this;
    // Active tiêu đề
    const random = $(".random");
    random.onclick = function () {
      this.classList.toggle("active");
    };
    // Play audio
    playBtn.onclick = function () {
      if (_this.isPlaying) {
        audio.pause();
        _this.isPlaying = false;
        this.innerHTML =
          '<li class="play"><i class="fa-solid fa-play"></i></li>';
      } else {
        audio.play();
        _this.isPlaying = true;
        this.innerHTML = '<i class="fa-solid fa-pause"></i>';
      }
    };
    // Tiến độ bài hát
    audio.ontimeupdate = function () {
      const progressPercents = Math.floor(
        (audio.currentTime / audio.duration) * 100
      );
      progress.value = progressPercents;
    };
    // Tua nhạc
    progress.onchange = function (e) {
      const seekValue = (e.target.value * audio.duration) / 100;
      audio.currentTime = seekValue;
    };
    // Next bài hát
    nextBtn.onclick = function () {
      if (_this.isRandom) {
        _this.randomPlaySong();
      } else {
        _this.nextSong();
      }
      playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
      audio.play();
    };
    // Prev bài hát
    prevBtn.onclick = function () {
      if (_this.isRandom) {
        _this.randomPlaySong();
      } else {
        _this.prevSong();
      }
      playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
      audio.play();
    };
    // Random bài hát
    randomSong.onclick = function () {
      _this.isRandom = !_this.isRandom;
      if (_this.isRandom) {
        this.classList.add("active");
      } else {
        this.classList.remove("active");
      }
    };
    // Replay bài hát
    loop.onclick = function () {
      _this.isLoop = !_this.isLoop;
      if (_this.isLoop) {
        this.classList.add("active");
        _this.replaySong();
      } else {
        this.classList.remove("active");
      }
    };
    // Khi hết bài hát thì next sang bài kế tiếp
    audio.onended = function () {
      nextBtn.click();
    };
    // Hiện playlist
    playListBtn.onclick = function () {
      boxPlaylist.style.display = "block";
      overlay.style.display = "block";
    };
    // Ẩn playlist
    closeBtn.onclick = function () {
      boxPlaylist.style.display = "none";
      overlay.style.display = "none";
    };
    overlay.onclick = function () {
      closeBtn.click();
    };
  },
  nextSong: function () {
    this.currentIndex++;
    if (this.currentIndex > this.songs.length - 1) {
      this.currentIndex = 0;
    }
    this.loadCurrentSong();
  },
  prevSong: function () {
    this.currentIndex--;
    if (this.currentIndex < 0) {
      this.currentIndex = this.songs.length - 1;
    }
    this.loadCurrentSong();
  },
  randomPlaySong: function () {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * this.songs.length);
    } while (newIndex === this.currentIndex);
    {
      this.currentIndex = newIndex;
      newIndex = Math.floor(Math.random() * this.songs.length);
      this.loadCurrentSong();
    }
  },
  replaySong: function () {
    audio.onended = function () {
      progress.value = 0;
      this.play();
    };
  },
  // renderModal: function () {
  //   window.onload = function () {
  //     const hello = $(".hello");
  //     const htmls = `<div class="overlay"></div>
  //     <div class="modal">
  //       <div class="content">
  //         &times;
  //         <h2 class="heading">XIN CHÀO</h2>

  //         <div class="sent">
  //           <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magni fugiat modi obcaecati tempore minus odio ex adipisci, aspernatur repudiandae, quod quisquam, voluptatibus omnis! Reiciendis sint voluptas quo error totam possimus?</p>
  //         </div>
  //       </div>`;
  //     hello.innerHTML = htmls;
  //   };
  // },
  //   renderPlaylist: function () {
  //     const html = `<section class="list-songs_box">
  //     <div class="header-modal-playlist">
  //       <h4 class="heading-playlist">Playlist</h4>
  //       <span class="close"><i class="fa-solid fa-xmark"></i></span>
  //     </div>
  //     <div class="item-song">
  //       <div class="left-item-song">
  //         <div class="avatar">
  //           <img src="./assets//img//img2.jpg" alt="#" class="avatar-img">
  //         </div>
  //           <span class="item-name">Giây phút</span>
  //       </div>
  //       <span class="list-songs_icon"><i class="fa-regular fa-heart"></i></span>
  //     </div>
  //     <div class="item-song">
  //       <div class="left-item-song">
  //         <div class="avatar">
  //           <img src="./assets//img//img2.jpg" alt="#" class="avatar-img">
  //         </div>
  //           <span class="item-name">Giây phút</span>
  //       </div>
  //       <span class="list-songs_icon"><i class="fa-regular fa-heart"></i></span>
  //     </div>
  // </section>`;
  //     console.log(playlist);
  //   },
  start: function () {
    // Định nghĩa các thuôc tính cho object
    this.defineProperties();
    // Render lời mở đầu
    // this.renderModal();
    // Lắng nghe sự kiện
    this.handleEvent();
    // Tải bài hát đầu tiên
    this.loadCurrentSong();
    // Render playlist
    this.renderPlaylist();
  },
};
app.start();
