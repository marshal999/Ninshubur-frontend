<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { fetchCurrentUser, getUsername, logout } from '@/services/auth'

const router = useRouter()
const username = ref(getUsername() ?? 'user')
const activeSection = ref('overview')
const sidebarOpen = ref(false)

const navItems = [
  { id: 'overview', label: 'Overview' },
  { id: 'activity', label: 'Activity' },
  { id: 'reports', label: 'Reports' },
  { id: 'settings', label: 'Settings' },
]

const stats = [
  { label: 'Active projects', value: '12' },
  { label: 'Open tasks', value: '48' },
  { label: 'Completed today', value: '9' },
  { label: 'Team online', value: '6' },
]

const activity = [
  { title: 'Deploy pipeline finished', meta: '2 minutes ago' },
  { title: 'New comment on roadmap', meta: '18 minutes ago' },
  { title: 'Weekly report generated', meta: '1 hour ago' },
  { title: 'Credentials rotated', meta: 'Yesterday' },
]

onMounted(async () => {
  try {
    username.value = await fetchCurrentUser()
  } catch {
    await router.replace({ name: 'login' })
  }
})

function selectSection(id: string) {
  activeSection.value = id
  sidebarOpen.value = false
}

async function onLogout() {
  await logout()
  await router.replace({ name: 'login' })
}
</script>

<template>
  <div class="dashboard" :class="{ 'sidebar-open': sidebarOpen }">
    <aside class="sidebar">
      <div class="sidebar-brand">Northline</div>
      <nav>
        <button
          v-for="item in navItems"
          :key="item.id"
          type="button"
          class="nav-item"
          :class="{ active: activeSection === item.id }"
          @click="selectSection(item.id)"
        >
          {{ item.label }}
        </button>
      </nav>
      <button class="logout" type="button" @click="onLogout">Sign out</button>
    </aside>

    <div class="backdrop" @click="sidebarOpen = false" />

    <div class="main">
      <header class="top">
        <button class="menu-btn" type="button" @click="sidebarOpen = !sidebarOpen">Menu</button>
        <div>
          <p class="eyebrow">Dashboard</p>
          <h1>{{ navItems.find((item) => item.id === activeSection)?.label }}</h1>
        </div>
        <div class="user-chip">{{ username }}</div>
      </header>

      <section v-if="activeSection === 'overview'" class="content">
        <div class="stat-grid">
          <article v-for="stat in stats" :key="stat.label" class="stat">
            <p>{{ stat.label }}</p>
            <strong>{{ stat.value }}</strong>
          </article>
        </div>

        <div class="panels">
          <section class="panel">
            <h2>Recent activity</h2>
            <ul>
              <li v-for="item in activity" :key="item.title">
                <span>{{ item.title }}</span>
                <small>{{ item.meta }}</small>
              </li>
            </ul>
          </section>

          <section class="panel">
            <h2>Today</h2>
            <p class="note">
              This is a sample dashboard layout. Replace the placeholder metrics with live data when
              you are ready.
            </p>
            <div class="progress">
              <div class="bar" />
            </div>
            <p class="note muted">72% of planned work completed</p>
          </section>
        </div>
      </section>

      <section v-else class="content placeholder">
        <h2>{{ navItems.find((item) => item.id === activeSection)?.label }}</h2>
        <p>This section is a placeholder for future {{ activeSection }} content.</p>
      </section>
    </div>
  </div>
</template>

<style scoped>
.dashboard {
  min-height: 100vh;
  display: grid;
  grid-template-columns: 260px 1fr;
  background: var(--paper);
}

.sidebar {
  background: var(--sidebar);
  color: var(--sidebar-text);
  padding: 1.5rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
  min-height: 100vh;
}

.sidebar-brand {
  font-family: var(--font-display);
  font-size: 1.45rem;
  font-weight: 650;
  padding: 0 0.6rem;
  color: #f3faf6;
}

.sidebar nav {
  display: grid;
  gap: 0.35rem;
  flex: 1;
}

.nav-item,
.logout,
.menu-btn {
  border: 0;
  background: transparent;
  color: inherit;
  text-align: left;
  cursor: pointer;
}

.nav-item {
  padding: 0.8rem 0.85rem;
  border-radius: 12px;
  font-weight: 500;
  transition: background-color 160ms ease;
}

.nav-item:hover,
.nav-item.active {
  background: rgba(255, 255, 255, 0.08);
}

.nav-item.active {
  color: #fff;
  font-weight: 600;
}

.logout {
  padding: 0.8rem 0.85rem;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  font-weight: 600;
}

.main {
  padding: 1.4rem clamp(1rem, 3vw, 2rem) 2rem;
}

.top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.eyebrow {
  margin: 0;
  color: var(--ink-soft);
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.top h1 {
  margin: 0.2rem 0 0;
  font-family: var(--font-display);
  font-size: clamp(1.8rem, 3vw, 2.3rem);
}

.user-chip {
  padding: 0.65rem 0.95rem;
  border-radius: 999px;
  background: var(--accent-soft);
  color: var(--accent-deep);
  font-weight: 600;
}

.menu-btn {
  display: none;
  padding: 0.65rem 0.9rem;
  border-radius: 999px;
  border: 1px solid var(--line);
  background: rgba(255, 255, 255, 0.7);
  color: var(--ink);
  font-weight: 600;
}

.stat-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1rem;
}

.stat,
.panel {
  background: rgba(255, 255, 255, 0.72);
  border: 1px solid var(--line);
  border-radius: var(--radius);
}

.stat {
  padding: 1.1rem 1.15rem;
}

.stat p {
  margin: 0;
  color: var(--ink-soft);
  font-size: 0.92rem;
}

.stat strong {
  display: block;
  margin-top: 0.55rem;
  font-family: var(--font-display);
  font-size: 2rem;
  font-weight: 650;
}

.panels {
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: 1rem;
  margin-top: 1rem;
}

.panel {
  padding: 1.25rem 1.3rem;
}

.panel h2 {
  margin: 0 0 1rem;
  font-family: var(--font-display);
  font-size: 1.35rem;
}

.panel ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 0.85rem;
}

.panel li {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  padding-bottom: 0.85rem;
  border-bottom: 1px solid var(--paper-deep);
}

.panel li:last-child {
  border-bottom: 0;
  padding-bottom: 0;
}

.panel small,
.note {
  color: var(--ink-soft);
}

.note {
  margin: 0;
  line-height: 1.55;
}

.note.muted {
  margin-top: 0.75rem;
  font-size: 0.92rem;
}

.progress {
  margin-top: 1.2rem;
  height: 10px;
  border-radius: 999px;
  background: var(--paper-deep);
  overflow: hidden;
}

.bar {
  width: 72%;
  height: 100%;
  background: linear-gradient(90deg, var(--accent), #2f9d74);
  animation: fill 900ms ease both;
}

.placeholder {
  background: rgba(255, 255, 255, 0.72);
  border: 1px solid var(--line);
  border-radius: var(--radius);
  padding: 1.5rem;
}

.placeholder h2 {
  margin: 0 0 0.6rem;
  font-family: var(--font-display);
}

.placeholder p {
  margin: 0;
  color: var(--ink-soft);
}

.backdrop {
  display: none;
}

@keyframes fill {
  from {
    width: 0;
  }
  to {
    width: 72%;
  }
}

@media (max-width: 980px) {
  .stat-grid,
  .panels {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 800px) {
  .dashboard {
    grid-template-columns: 1fr;
  }

  .sidebar {
    position: fixed;
    inset: 0 auto 0 0;
    width: min(80vw, 280px);
    transform: translateX(-105%);
    transition: transform 220ms ease;
    z-index: 20;
  }

  .sidebar-open .sidebar {
    transform: translateX(0);
  }

  .sidebar-open .backdrop {
    display: block;
    position: fixed;
    inset: 0;
    background: rgba(16, 36, 28, 0.45);
    z-index: 10;
  }

  .menu-btn {
    display: inline-flex;
  }

  .top {
    flex-wrap: wrap;
  }

  .stat-grid,
  .panels {
    grid-template-columns: 1fr;
  }
}
</style>
