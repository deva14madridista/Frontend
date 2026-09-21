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
}

.main-content {
  flex: 1;
}

.navbar {
  height: 70px;
  padding: 24px;
  background: var(--white);
  border-bottom: 1px solid var(--border);
}

.page-content {
  padding: 24px;
}
</style>