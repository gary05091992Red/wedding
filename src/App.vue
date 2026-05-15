<script setup>
const wedding = {
  groom: '新郎姓名',
  bride: '新娘姓名',
  date: '2026 年 6 月 14 日（日）',
  time: '中午 12:00 入席',
  venue: '台北某某飯店',
  address: '台北市信義區某某路 1 號',
  mapUrl: 'https://maps.google.com',
  rsvpPhone: '0912-345-678',
}
</script>

<template>
  <div class="page">
    <header class="hero">
      <p class="eyebrow">Wedding Invitation</p>
      <h1 class="names">
        <span>{{ wedding.groom }}</span>
        <span class="amp">&</span>
        <span>{{ wedding.bride }}</span>
      </h1>
      <p class="tagline">誠摯邀請您，一同見證我們的幸福時刻</p>
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
      </dl>
      <a class="btn" :href="wedding.mapUrl" target="_blank" rel="noopener noreferrer">
        開啟地圖導航
      </a>
    </section>

    <section class="card card--soft">
      <h2>回覆出席</h2>
      <p>請於 2026 年 5 月 31 日前告知是否出席，以便我們安排座位。</p>
      <a class="btn btn--outline" :href="`tel:${wedding.rsvpPhone.replace(/-/g, '')}`">
        電話聯絡 {{ wedding.rsvpPhone }}
      </a>
    </section>

    <footer class="footer">
      <p>期待與您相聚</p>
      <p class="footer-names">{{ wedding.groom }} & {{ wedding.bride }}</p>
    </footer>
  </div>
</template>
