<template>
  <div class="app-layout">
    <LayoutSidebar />

    <main class="main-content">
      <LayoutNavbar />

      <section class="page-content">
        <slot />
      </section>
    </main>
  </div>
</template>

<style scoped>
.app-layout {
  display: flex;
  min-height: 100vh;
  background: #f5f6f8;
}

.main-content {
  flex: 1;
  min-width: 0;
}

.page-content {
  min-height: calc(100vh - 70px);
}
</style>