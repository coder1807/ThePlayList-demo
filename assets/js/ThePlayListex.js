/**
 * @type {HTMLElement}
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

const app = {
    currentIndex: 0,
  songs: [
    {
      name: "Bao Tiền Một Mớ Bình Yên ",
      singer: "14 Casper, Bon",
      path: "./ThePlayList/music/BaoTienMotMoBinhYen-14CasperBonNghiem-8776995.mp3",
      image: "./ThePlayList/img/bao tiền đổi mớ bình yên.jpg",
    },
    {
      name: "Don't Côi",
      singer: "RPT Orijinn, Ronboogz",
      path: "./ThePlayList/music/Don't Côi.mp3",
      image: "./ThePlayList/img/dontcoi.jpg",
    },
    {
      name: "Naachne Ka Shaunq",
      singer: "Raftaar x Brobha V",
      path: "https://mp3.filmysongs.in/download.php?id=Naachne Ka Shaunq Raftaar Ft Brodha V Mp3 Hindi Song Filmysongs.co.mp3",
      image: "https://i.ytimg.com/vi/QvswgfLDuPg/maxresdefault.jpg",
    },
    {
      name: "Mantoiyat",
      singer: "Raftaar x Nawazuddin Siddiqui",
      path: "https://mp3.vlcmusic.com/download.php?track_id=14448&format=320",
      image:
        "https://a10.gaanacdn.com/images/song/39/24225939/crop_480x480_1536749130.jpg",
    },
    {
      name: "Aage Chal",
      singer: "Raftaar",
      path: "https://mp3.vlcmusic.com/download.php?track_id=25791&format=320",
      image:
        "https://a10.gaanacdn.com/images/albums/72/3019572/crop_480x480_3019572.jpg",
    },
    {
      name: "Damn",
      singer: "Raftaar x kr$na",
      path: "https://mp3.filmisongs.com/go.php?id=Damn%20Song%20Raftaar%20Ft%20KrSNa.mp3",
      image:
        "./ThePlayList/img/dontcoi.jpg",
    },
    {
      name: "Feeling You",
      singer: "Raftaar x Harjas",
      path: "https://mp3.vlcmusic.com/download.php?track_id=27145&format=320",
      image:
        "https://a10.gaanacdn.com/gn_img/albums/YoEWlabzXB/oEWlj5gYKz/size_xxl_1586752323.webp",
    },
  ],
  render: function () {
    const htmls = this.songs.map((song) => {
      return `
      <div class="song">
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
    $('.playlist').innerHTML = htmls.join('')
  },
  // defineProperties: function() {
  //   Object.defineProperty(this, 'currentSong', {
  //     get: function() {
  //       return this.songs[this.currentIndex];
  //     }
  //   })
  // },
  handleEvents: function() {
    const cd = $('.cd');
    const cdWidth = cd.offsetWidth;

    document.onscroll = function() {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const newCdWidth = cdWidth - scrollTop;

        cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0;
        cd.style.opacity = newCdWidth / cdWidth
    }
  },
  getCurrentSong: function() {
    return this.songs[this.currentIndex]
  },
  start: function () {
    // this.defineProperties();
    this.handleEvents();

    console.log(this.g);

    this.render();
  }
}

app.start();
