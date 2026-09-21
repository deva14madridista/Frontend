<template>
  <div class="app-layout">
    <aside class="sidebar">
      Sidebar
    </aside>

    <main class="main-content">
      <header class="navbar">
        Navbar
      </header>

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

.sidebar {
  width: 250px;
  background: var(--sidebar);
  color: var(--white);
}

.main-content {
  flex: 1;
}

.navbar {
  height: 70px;
  background: var(--white);
  border-bottom: 1px solid var(--border);
}

.page-content {
  padding: 24px;
}
</style>