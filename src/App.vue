<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const wedding = {
  groom: '曾弘宇',
  bride: '謝惠馨',
  date: '2026 年 10 月 31 日（六）',
  time: '中午 12:00 入席 (12:20 開席)',
  venue: '台北士林萬麗酒店',
  address: '11141臺北市士林區福林里中山北路五段470巷8號',
  mapUrl: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent('台北士林萬麗酒店, 11141臺北市士林區福林里中山北路五段470巷8號')}`,
  rsvpPhone: '0958389664',
  rsvpFormUrl:
    'https://docs.google.com/forms/d/e/1FAIpQLSfy2NPD0t0RIsEUOodUu2-OJ6AdgTE1vAG68HCd8FFMkrBrBQ/viewform',
  musicVideoId: '_0bb30seo28',
}

const base = import.meta.env.BASE_URL

const invitationBannerSrc = ref(
  `${base}photos/weddingInvitation${Math.random() < 0.5 ? 1 : 2}.png`,
)

const photos = [
  { src: `${base}photos/1.jpg`, alt: '婚禮照片 1' },
  { src: `${base}photos/2.jpg`, alt: '婚禮照片 2' },
  { src: `${base}photos/3.jpg`, alt: '婚禮照片 3' },
  { src: `${base}photos/4.jpg`, alt: '婚禮照片 4' },
  { src: `${base}photos/5.jpg`, alt: '婚禮照片 5' },
  { src: `${base}photos/6.jpg`, alt: '婚禮照片 6' },
]

const currentIndex = ref(0)
const musicMuted = ref(true)
const musicPlaying = ref(false)
let autoplayTimer = null
let touchStartX = 0
let youtubePlayer = null

function loadYouTubeAPI() {
  return new Promise((resolve) => {
    if (window.YT?.Player) {
      resolve()
      return
    }
    const previousReady = window.onYouTubeIframeAPIReady
    window.onYouTubeIframeAPIReady = () => {
      previousReady?.()
      resolve()
    }
    if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
      const tag = document.createElement('script')
      tag.src = 'https://www.youtube.com/iframe_api'
      document.head.appendChild(tag)
    }
  })
}

function initMusicPlayer() {
  youtubePlayer = new window.YT.Player('youtube-audio', {
    height: '0',
    width: '0',
    videoId: wedding.musicVideoId,
    playerVars: {
      autoplay: 0,
      loop: 1,
      playlist: wedding.musicVideoId,
      controls: 0,
      disablekb: 1,
      fs: 0,
      modestbranding: 1,
      playsinline: 1,
      rel: 0,
    },
    events: {
      onStateChange: (event) => {
        musicPlaying.value = event.data === window.YT.PlayerState.PLAYING
      },
    },
  })
}

function toggleMusic() {
  if (!youtubePlayer) return
  if (musicMuted.value || !musicPlaying.value) {
    youtubePlayer.unMute()
    musicMuted.value = false
    youtubePlayer.playVideo()
    return
  }
  youtubePlayer.pauseVideo()
}

function goTo(index) {
  currentIndex.value = (index + photos.length) % photos.length
}

function next() {
  goTo(currentIndex.value + 1)
}

function prev() {
  goTo(currentIndex.value - 1)
}

function startAutoplay() {
  stopAutoplay()
  autoplayTimer = setInterval(next, 4000)
}

function stopAutoplay() {
  if (autoplayTimer) {
    clearInterval(autoplayTimer)
    autoplayTimer = null
  }
}

function onTouchStart(event) {
  touchStartX = event.touches[0].clientX
  stopAutoplay()
}

function onTouchEnd(event) {
  const delta = event.changedTouches[0].clientX - touchStartX
  if (Math.abs(delta) > 40) {
    delta < 0 ? next() : prev()
  }
  startAutoplay()
}

onMounted(async () => {
  startAutoplay()
  await loadYouTubeAPI()
  initMusicPlayer()
})

onUnmounted(() => {
  stopAutoplay()
  youtubePlayer?.destroy()
})
</script>

<template>
  <div class="site">
    <header class="hero-banner">
      <img
        :src="invitationBannerSrc"
        alt="曾弘宇 & 謝惠馨 婚禮邀請"
        fetchpriority="high"
      />
    </header>

    <div class="page">
    <div id="youtube-audio" class="youtube-audio" aria-hidden="true" />

    <button type="button" class="music-btn" :class="{
      'music-btn--active': musicPlaying && !musicMuted,
      'music-btn--muted': musicMuted || !musicPlaying,
    }" :aria-label="musicMuted ? '開啟音樂' : musicPlaying ? '暫停音樂' : '播放音樂'" @click="toggleMusic">
      <span class="music-btn__icon" aria-hidden="true">♪</span>
    </button>

    <header class="hero">
      <p class="eyebrow">Wedding Invitation</p>
      <h1 class="names">
        <span>{{ wedding.groom }}</span>
        <span class="amp">&</span>
        <span>{{ wedding.bride }}</span>
      </h1>
      <p class="tagline">誠摯邀請您，一同分享我們的幸福時刻</p>

    </header>

    <section class="card">
      <h2>婚禮資訊</h2>
      <dl class="details">
        <div>
          <dt>日期</dt>
          <dd>{{ wedding.date }}</dd>
        </div>
        <div>
          <dt>時間</dt>
          <dd>{{ wedding.time }}</dd>
        </div>
        <div>
          <dt>地點</dt>
          <dd>{{ wedding.venue }}</dd>
        </div>
        <div>
          <dt>地址</dt>
          <dd>{{ wedding.address }}</dd>
        </div>
        <div>
          <dt>提醒</dt>
          <dd>提供免費停車位</dd>
        </div>
      </dl>
      <a class="btn" :href="wedding.mapUrl" target="_blank" rel="noopener noreferrer">
        開啟地圖導航
      </a>
    </section>

    <section class="card card--soft">
      <h2>回覆出席</h2>
      <p>請於 2026 年 8 月 31 日前填寫問卷，告知是否出席及人數，以便我們安排座位。</p>
      <a v-if="wedding.rsvpFormUrl" class="btn" :href="wedding.rsvpFormUrl" target="_blank" rel="noopener noreferrer">
        填寫出席問卷
      </a>
      <a class="btn btn--outline" :href="`tel:${wedding.rsvpPhone.replace(/-/g, '')}`">
        電話聯絡 {{ wedding.rsvpPhone }}
      </a>
    </section>

    <section class="gallery" aria-label="婚禮照片">
      <h2 class="gallery-title">愛，不止此刻</h2>
      <div class="carousel" @mouseenter="stopAutoplay" @mouseleave="startAutoplay" @focusin="stopAutoplay"
        @focusout="startAutoplay" @touchstart.passive="onTouchStart" @touchend.passive="onTouchEnd">
        <div class="carousel-track" :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
          <figure v-for="photo in photos" :key="photo.src" class="carousel-slide">
            <img :src="photo.src" :alt="photo.alt" loading="lazy" draggable="false" />
          </figure>
        </div>

        <button type="button" class="carousel-btn carousel-btn--prev" aria-label="上一張" @click="prev">
          ‹
        </button>
        <button type="button" class="carousel-btn carousel-btn--next" aria-label="下一張" @click="next">
          ›
        </button>

        <div class="carousel-dots" role="tablist" aria-label="照片切換">
          <button v-for="(photo, index) in photos" :key="photo.src" type="button" class="carousel-dot"
            :class="{ 'carousel-dot--active': index === currentIndex }" :aria-label="`第 ${index + 1} 張`"
            :aria-selected="index === currentIndex" role="tab" @click="goTo(index)" />
        </div>
      </div>
    </section>

    <footer class="footer">
      <p>馨意綿長，期待宇您相聚</p>
      <p class="footer-names">{{ wedding.groom }} & {{ wedding.bride }}</p>
    </footer>
    </div>
  </div>
</template>
