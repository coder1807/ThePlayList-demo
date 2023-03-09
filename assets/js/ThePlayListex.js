/**
//  * @type {HTMLElement}
 */

/**
 * 1. Render songs
 * 2. Scroll top
 * 3. Play / pause / seek
 * 4. CD rotate
 * 5. Next / prev
 * 6. Random
 * 7. Next / Repeat when ended
 * 8. Active song
 * 9. Scroll active song into view
 * 10. Play song when click
 */

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const PlAYER_STORAGE_KEY = 'CODER1873-PLAYER';

const player = $('.player');
const cd = $('.cd');
const heading = $('header h2');
const cdThumb = $('.cd-thumb');
const audio = $('#audio');
const playBtn = $('.btn-toggle-play');
const progress = $('#progress');
const nextBtn = $('.btn-next');
const prevBtn = $('.btn-prev');
const randomBtn = $('.btn-random');
const repeatBtn = $('.btn-repeat');
const playList = $('.playlist');


const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    config: {},
    config: JSON.parse(localStorage.getItem(PlAYER_STORAGE_KEY)) || {},
    songs: [
      {
        name: "Bao Tiền Một Mớ Bình Yên ",
        singer: "14 Casper, Bon",
        path: "./assets/music/BaoTienMotMoBinhYen-14CasperBonNghiem-8776995.mp3",
        image:
          "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/cover/1/c/3/b/1c3b6283e28b9030d8f6410b210bd765.jpg",
      },
      {
        name: "Don't Côi",
        singer: "RPT Orijinn, Ronboogz",
        path: "./assets/music/Don't Côi.mp3",
        image: "./assets/img/dontcoi.jpg",
      },
      {
        name: "Em Gì Ơi",
        singer: "K-ICM x JACK",
        path: "./assets/music/em gì ơi.mp3",
        image: "./assets/img/emgioi.jpg",
      },
      {
        name: "Nàng Thơ",
        singer: "Hoàng Dũng",
        path: "./assets/music/Nàng Thơ.mp3",
        image: "./assets/img/nangtho.jpg",
      },
      {
        name: "Sài Gòn Hôm Nay Mưa",
        singer: "JSOL x HOÀNG DUYÊN",
        path: "./assets/music/SaiGonHomNayMua.mp3",
        image: "./assets/img/saigonmua.jpg",
      },
      {
        name: "Đom Đóm",
        singer: "Jack - J97",
        path: "./assets/music/Đom Đóm.mp3",
        image: "./assets/img/dom.jpg",
      },
      {
        name: "Có Hẹn Với Thanh Xuân",
        singer: "MONSTAR, GREY D",
        path: "./assets/music/CoHenVoiThanhXuan.mp3",
        image: "./assets/img/thanhxuan.jpg",
      },
    ],
    setConfig: function(key, value) {
      this.config[key] = value;
      localStorage.setItem(PlAYER_STORAGE_KEY, JSON.stringify(this.config));
    },
  render: function () {
    const htmls = this.songs.map((song, index) => {
      return `
      <div class="song ${index === this.currentIndex ? 'active' : ''}" data-index="${index}">
            <div class="thumb" 
                style="background-image: url('${song.image}')">
            </div>
            <div class="body">
                <h3 class="title">${song.name}</h3>
                <p class="author">${song.singer}</p>
            </div>
            <div class="option">
                <i class="fas fa-ellipsis-h"></i>
            </div>
      </div>
      `
    })
    playList.innerHTML = htmls.join('')
  },
  defineProperties: function() {
    Object.defineProperty(this, 'currentSong', {
      get: function() {
        return this.songs[this.currentIndex];
      },
    });
  },
  handleEvents: function() {
    const _this = this;
    const cdWidth = cd.offsetWidth;

    // Xử lý CD quay / dừng
    const cdThumbAnimate = cdThumb.animate([
      { transform: 'rotate(360deg)'}
    ], {
      duration: 10000,
      iterations: Infinity,
    })
    cdThumbAnimate.pause();

    // Xử lý phóng to / thu nhỏ CD
    document.onscroll = function() {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const newCdWidth = cdWidth - scrollTop;

        cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0;
        cd.style.opacity = newCdWidth / cdWidth
    }

    // Xử lý khi click play
    playBtn.onclick = function() {
      if(_this.isPlaying) {
        audio.pause();
      }
      else {
        audio.play();
      }
    }

    // Khi song được play 
    audio.onplay = function() {
      _this.isPlaying = true;
      player.classList.add('playing');
      cdThumbAnimate.play();
    }

    // Khi song bị pause
    audio.onpause = function() {
      _this.isPlaying = false;
      player.classList.remove('playing');
      cdThumbAnimate.pause();
    }

    // khi tiến độ bài hát thay đổi 
    audio.ontimeupdate = function() {
      if(audio.duration) {
        const progressPercent = Math.floor(audio.currentTime / audio.duration * 100);
        progress.value = progressPercent;
      }
    }

    // Xử lý khi tua song
    progress.onchange = function(e) {
      const seekTime = audio.duration * e.target.value / 100;
      audio.currentTime = seekTime;
      // console.log( e.target.value);
    }

    // khi next song
    nextBtn.onclick = function() {
      if(_this.isRandom) {
        _this.playRandomSong();
      }
      else {
        _this.nextSong();
      }
      audio.play();
      _this.render();
      _this.scrollToActiveSong();
    }

    // khi previous song
    prevBtn.onclick = function() {
      if(_this.isRandom) {
        _this.playRandomSong();
      }
      else {
        _this.prevSong();
      }
      audio.play();
      _this.render();
      _this.scrollToActiveSong();
    }

    // Xử lý bật / tắt random song
    randomBtn.onclick = function(e) {
      _this.isRandom = !_this.isRandom;
      _this.setConfig('isRandom', _this.isRandom);
      randomBtn.classList.toggle('active', _this.isRandom);
    }

    // Xử lý lặp lại một bài hát
    repeatBtn.onclick = function() {
      _this.isRepeat = !_this.isRepeat;
      _this.setConfig('isRepeat', _this.isRepeat);
      repeatBtn.classList.toggle('active', _this.isRepeat);
    }

    // Xử lý next song khi audio ended
    audio.onended = function() {
      if(_this.isRepeat) {
        audio.play();
      }
      else {
        nextBtn.click();
      }
    }

    // Lắng nghe hành vi click vào playlist
    playList.onclick = function(e) {
      const songNode = e.target.closest('.song:not(.active)');
      if(songNode || e.target.closest('.option')){
        // Xử lý khi click vào song
        if(songNode) {
          _this.currentIndex = Number(songNode.dataset.index);
          _this.loadCurrentSong();
          _this.render();
          audio.play();
        }
        // Xử lý khi click vào option
        if(e.target.closest('.option')) {

        }
      }
    }
  },
  scrollToActiveSong: function() {
    setTimeout(() => {
      $('.song.active').scrollIntoView({
        behavier: 'smooth',
        block: 'nearest',
      })
    }, 300)
  },
  loadCurrentSong: function() {
    heading.textContent = this.currentSong.name;
    cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
    audio.src = this.currentSong.path;
    // console.log(heading, cdThumb, audio);
  },
  loadConfig: function() {
    this.isRandom = this.config.isRandom;
    this.isRepeat = this.config.isRepeat;
  },
  nextSong: function() {
    this.currentIndex++;
    if(this.currentIndex >= this.songs.length) {
      this.currentIndex = 0;
    }
    this.loadCurrentSong();
  },
  prevSong: function() {
    this.currentIndex--;
    if(this.currentIndex < 0) {
      this.currentIndex = this.songs.length - 1;
    }
    this.loadCurrentSong();
  },
  playRandomSong: function() {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * this.songs.length)
    } while (newIndex === this.currentIndex)

    this.currentIndex = newIndex;
    this.loadCurrentSong();
  },
  start: function () {
    // Gán cấu hình từ config vào ứng dụng 
    this.loadConfig();

    // Định nghĩa các thuộc tính cho object
    this.defineProperties();

    // Lắng nghe / xử lý các sự kiện (DOM events)
    this.handleEvents();

    // Tải thông tin bài hát đầu tiên vào UI khi chạy ứng dụng
    this.loadCurrentSong();

    // Render playlist
    this.render();

    // Hiển thị trạng thái ban đầu của button repeat & random
    randomBtn.classList.toggle('active', this.isRandom);
    repeatBtn.classList.toggle('active', this.isRepeat);
  },
};

app.start();
