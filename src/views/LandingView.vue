<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="landing">
    <header class="topbar">
      <RouterLink class="brand" to="/">Northline</RouterLink>
      <nav>
        <RouterLink class="nav-link" to="/login">Sign in</RouterLink>
        <RouterLink class="btn btn-primary" to="/login">Open dashboard</RouterLink>
      </nav>
    </header>

    <main class="hero">
      <div class="hero-copy">
        <p class="brand-mark">Northline</p>
        <h1>Operations clarity for teams that ship every day.</h1>
        <p class="lede">
          A focused workspace for monitoring activity, tracking work, and keeping your day on
          course.
        </p>
        <div class="cta-row">
          <RouterLink class="btn btn-primary" to="/login">Get started</RouterLink>
          <a class="btn btn-ghost" href="#product">See the product</a>
        </div>
      </div>
    </main>

    <section id="product" class="product">
      <h2>Built for calm focus</h2>
      <p>
        Sign in to a simple dashboard with a persistent sidebar, quick status views, and space to
        grow as your workflow expands.
      </p>
    </section>
  </div>
</template>

<style scoped>
.landing {
  min-height: 100vh;
  position: relative;
  overflow: hidden;
}

.landing::before {
  content: '';
  position: absolute;
  inset: 0;
  background:
    linear-gradient(120deg, rgba(16, 36, 28, 0.72), rgba(15, 107, 76, 0.35)),
    url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1800&q=80')
      center/cover no-repeat;
  z-index: 0;
  animation: drift 18s ease-in-out infinite alternate;
}

.topbar,
.hero,
.product {
  position: relative;
  z-index: 1;
}

.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.4rem clamp(1.2rem, 4vw, 3rem);
}

.brand {
  font-family: var(--font-display);
  font-size: 1.35rem;
  font-weight: 650;
  color: #f4faf6;
  letter-spacing: 0.01em;
}

.topbar nav {
  display: flex;
  align-items: center;
  gap: 0.8rem;
}

.nav-link {
  color: #e7f2ec;
  font-weight: 500;
  padding: 0.55rem 0.8rem;
}

.hero {
  min-height: calc(100vh - 5.5rem);
  display: flex;
  align-items: center;
  padding: 2rem clamp(1.2rem, 5vw, 4.5rem) 4rem;
}

.hero-copy {
  max-width: 38rem;
  color: #f5faf7;
  animation: rise 700ms ease both;
}

.brand-mark {
  margin: 0 0 0.8rem;
  font-family: var(--font-display);
  font-size: clamp(2.8rem, 7vw, 4.8rem);
  font-weight: 650;
  letter-spacing: -0.03em;
  line-height: 1;
}

.hero h1 {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(1.6rem, 3.4vw, 2.35rem);
  font-weight: 500;
  line-height: 1.2;
  max-width: 16ch;
}

.lede {
  margin: 1.2rem 0 0;
  max-width: 34rem;
  font-size: 1.08rem;
  line-height: 1.6;
  color: rgba(245, 250, 247, 0.88);
  animation: rise 900ms ease both;
}

.cta-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  margin-top: 1.8rem;
  animation: rise 1.1s ease both;
}

.cta-row .btn-ghost {
  color: #f5faf7;
  border-color: rgba(245, 250, 247, 0.35);
}

.cta-row .btn-ghost:hover {
  background: rgba(255, 255, 255, 0.08);
}

.product {
  background: rgba(243, 246, 242, 0.96);
  padding: clamp(2.5rem, 6vw, 5rem) clamp(1.2rem, 5vw, 4.5rem);
}

.product h2 {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(1.8rem, 3vw, 2.4rem);
}

.product p {
  margin: 0.9rem 0 0;
  max-width: 40rem;
  color: var(--ink-soft);
  line-height: 1.65;
  font-size: 1.05rem;
}

@keyframes rise {
  from {
    opacity: 0;
    transform: translateY(18px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes drift {
  from {
    transform: scale(1);
  }
  to {
    transform: scale(1.04);
  }
}

@media (max-width: 720px) {
  .topbar nav .nav-link {
    display: none;
  }

  .hero {
    align-items: flex-end;
    padding-bottom: 3rem;
  }
}
</style>
