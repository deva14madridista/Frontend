<template>
  <div class="app-layout">
    <LayoutSidebar
      :open="isSidebarOpen"
      @close="closeSidebar"
    />

    <div
      class="sidebar-overlay"
      :class="{ show: isSidebarOpen }"
      aria-hidden="true"
      @click="closeSidebar"
    ></div>

    <main class="main-content">
      <LayoutNavbar
        :sidebar-open="isSidebarOpen"
        @toggle-sidebar="toggleSidebar"
      />

      <section class="page-content">
        <slot />
      </section>
    </main>
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'

const route = useRoute()

const isSidebarOpen = ref(false)

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}

const closeSidebar = () => {
  isSidebarOpen.value = false
}

const handleKeydown = (event) => {
  if (event.key === 'Escape') {
    closeSidebar()
  }
}

watch(
  () => route.fullPath,
  () => closeSidebar()
)

watch(isSidebarOpen, (open) => {
  if (!import.meta.client) return

  document.body.style.overflow = open ? 'hidden' : ''
})

onMounted(() => {
  if (!import.meta.client) return

  window.addEventListener('keydown', handleKeydown)
})

onBeforeUnmount(() => {
  if (!import.meta.client) return

  window.removeEventListener('keydown', handleKeydown)
  document.body.style.overflow = ''
})
</script>

<style scoped>
.app-layout {
  display: flex;
  width: 100%;
  min-height: 100vh;
  background: #f5f6f8;
}

.main-content {
  flex: 1;
  min-width: 0;
}

.page-content {
  width: 100%;
  min-height: calc(100vh - 70px);
}

.sidebar-overlay {
  display: none;
}

@media (max-width: 767px) {
  .sidebar-overlay {
    position: fixed;
    inset: 0;
    z-index: 1100;

    display: block;

    padding: 0;
    border: none;

    background: rgba(15, 23, 42, 0.5);

    opacity: 0;
    visibility: hidden;

    transition:
      opacity 0.25s ease,
      visibility 0.25s ease;
  }

  .sidebar-overlay.show {
    opacity: 1;
    visibility: visible;
  }
}
</style>
