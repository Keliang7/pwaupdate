<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import PWAUpdatePrompt from '@/components/PWAUpdatePrompt.vue'

async function forceReinstallSW() {
  if (!('serviceWorker' in navigator)) {
    console.warn('[PWA] 当前环境不支持 Service Worker')
    return
  }
  try {
    const regs = await navigator.serviceWorker.getRegistrations()
    console.log('[PWA] 即将注销注册数：', regs.length)
    await Promise.allSettled(regs.map((r) => r.unregister()))
  } catch (e) {
    console.error('[PWA] 注销失败：', e)
  }
  // 使用 cache-busting 参数强制加载最新入口与 sw.js
  const url = new URL(location.href)
  url.searchParams.set('sw-reinstall', Date.now().toString())
  // 用 replace 避免历史记录里留下无意义的回退步骤
  location.replace(url.toString())
}
</script>

<template>
  <header>
    <button
      @click="forceReinstallSW"
      style="margin: 8px; padding: 6px 10px; border: 1px solid #ccc; border-radius: 6px"
    >
      强制重装 SW（卸载并重新注册） 123
    </button>

    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
  <PWAUpdatePrompt />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
