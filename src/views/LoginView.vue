<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { login } from '@/services/auth'

const router = useRouter()
const route = useRoute()

const username = ref('admin')
const password = ref('admin123')
const error = ref('')
const loading = ref(false)

async function onSubmit() {
  error.value = ''
  loading.value = true
  try {
    await login(username.value.trim(), password.value)
    const redirect = typeof route.query.redirect === 'string' ? route.query.redirect : '/home'
    await router.replace(redirect)
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Login failed'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="login-page">
    <div class="panel">
      <RouterLink class="brand" to="/">Northline</RouterLink>
      <h1>Sign in</h1>
      <p class="subtitle">Use the configured application user to open your dashboard.</p>

      <form class="form" @submit.prevent="onSubmit">
        <div class="field">
          <label for="username">Username</label>
          <input id="username" v-model="username" autocomplete="username" required />
        </div>

        <div class="field">
          <label for="password">Password</label>
          <input
            id="password"
            v-model="password"
            type="password"
            autocomplete="current-password"
            required
          />
        </div>

        <p v-if="error" class="error-banner" role="alert">{{ error }}</p>

        <button class="btn btn-primary submit" type="submit" :disabled="loading">
          {{ loading ? 'Signing in…' : 'Sign in' }}
        </button>
      </form>

      <p class="hint">Default credentials live in the backend <code>application.properties</code>.</p>
    </div>
  </div>
</template>

<style scoped>
.login-page {
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 2rem 1rem;
}

.panel {
  width: min(100%, 420px);
  background: rgba(255, 255, 255, 0.78);
  border: 1px solid rgba(199, 210, 200, 0.9);
  border-radius: 22px;
  box-shadow: var(--shadow);
  padding: 2rem 1.7rem 1.7rem;
  animation: enter 420ms ease both;
}

.brand {
  display: inline-block;
  font-family: var(--font-display);
  font-size: 1.45rem;
  font-weight: 650;
  color: var(--accent-deep);
  margin-bottom: 1.2rem;
}

h1 {
  margin: 0;
  font-family: var(--font-display);
  font-size: 2rem;
  font-weight: 650;
}

.subtitle {
  margin: 0.55rem 0 0;
  color: var(--ink-soft);
  line-height: 1.5;
}

.form {
  display: grid;
  gap: 1rem;
  margin-top: 1.6rem;
}

.submit {
  width: 100%;
  margin-top: 0.35rem;
}

.submit:disabled {
  opacity: 0.7;
  cursor: wait;
  transform: none;
}

.hint {
  margin: 1.2rem 0 0;
  color: var(--ink-soft);
  font-size: 0.9rem;
  line-height: 1.45;
}

code {
  font-size: 0.85em;
}

@keyframes enter {
  from {
    opacity: 0;
    transform: translateY(14px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
