<template>
  <aside class="sidebar">
    <div class="logo">
      Eduabsen
    </div>

    <nav class="menu">
      <NuxtLink to="/dashboard" class="menu-item">
        Dashboard
      </NuxtLink>

      <NuxtLink to="/pengajuan-perjalanan" class="menu-item">
        Pengajuan Perjalanan
      </NuxtLink>

      <NuxtLink to="/persetujuan" class="menu-item">
        Persetujuan
      </NuxtLink>

      <NuxtLink to="/pemesanan" class="menu-item">
        Pemesanan
      </NuxtLink>

      <NuxtLink to="/reimbursement" class="menu-item">
        Reimbursement
      </NuxtLink>
    </nav>
  </aside>
</template>

<style scoped>
.sidebar {
  width: 250px;
  min-height: 100vh;
  padding: 24px 16px;
  background: var(--sidebar);
  color: var(--white);
}

.logo {
  padding: 0 12px;
  margin-bottom: 32px;
  font-size: 22px;
  font-weight: 700;
}

.menu {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.menu-item {
  padding: 12px;
  border-radius: 8px;
  color: #cbd5e1;
  transition: 0.2s;
}

.menu-item:hover {
  background: rgba(255, 255, 255, 0.1);
  color: var(--white);
}

.router-link-active {
  background: var(--primary);
  color: var(--white);
}
</style>