<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRegisterSW } from 'virtual:pwa-register/vue'

const show = ref(false)

const {
  needRefresh, // 是否有新版本可用
  // offlineReady, // 首次离线就绪（可选：你要不要提示）
  updateServiceWorker, // 触发更新
} = useRegisterSW({
  onNeedRefresh() {
    // 有新版本构建完成并已下载好，等待你的确认
    show.value = true
  },
  onOfflineReady() {
    // 首次安装完成，可离线（一般可静默或用 toast 提示一次）
    // console.info('App ready to work offline')
  },
})

const visible = computed(() => show.value || needRefresh.value)

const refresh = async () => {
  // 触发 SW 更新（内部会 skipWaiting），完成后你可以强制刷新页面
  await updateServiceWorker()
  window.location.reload()
}

const dismiss = () => {
  show.value = false
}
</script>

<template>
  <transition name="fade">
    <div
      v-if="visible"
      class="fixed left-1/2 -translate-x-1/2 bottom-6 z-50 flex items-center gap-3 rounded-xl px-4 py-3 shadow-lg bg-black/80 text-white backdrop-blur-md"
      role="alert"
    >
      <span>有新版本可用</span>
      <button
        class="rounded-lg px-3 py-1.5 bg-white/10 hover:bg-white/20 active:bg-white/30"
        @click="refresh"
      >
        立即刷新
      </button>
      <button
        class="rounded-lg px-3 py-1.5 bg-white/10 hover:bg-white/20 active:bg-white/30"
        @click="dismiss"
      >
        稍后
      </button>
    </div>
  </transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
