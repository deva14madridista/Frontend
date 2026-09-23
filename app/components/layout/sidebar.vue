<template>
  <aside class="sidebar">

    <!-- Logo -->
    <div class="logo">
      Eduabsen
    </div>

    <!-- Navigation -->
    <nav class="menu">

      <!-- Dashboard -->
      <NuxtLink to="/dashboard" class="menu-item">
        <svg viewBox="0 0 24 24" class="menu-icon">
          <path d="M3 13h8V3H3v10Zm0 8h8v-6H3v6Zm10 0h8v-10h-8v10Zm0-18v6h8V3h-8Z"/>
        </svg>
        <span>Dashboard</span>
      </NuxtLink>

      <!-- Pengajuan -->
      <NuxtLink to="/pengajuan-perjalanan" class="menu-item">
        <svg viewBox="0 0 24 24" class="menu-icon">
          <path d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2Zm-2 14H7v-2h10v2Zm0-4H7v-2h10v2Zm0-4H7V7h10v2Z"/>
        </svg>
        <span>Pengajuan Perjalanan</span>
      </NuxtLink>

      <!-- Persetujuan -->
      <NuxtLink to="/persetujuan" class="menu-item">
        <svg viewBox="0 0 24 24" class="menu-icon">
          <path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17Z"/>
        </svg>
        <span>Persetujuan</span>
      </NuxtLink>

      <!-- Pemesanan -->
      <NuxtLink to="/pemesanan" class="menu-item">
        <svg viewBox="0 0 24 24" class="menu-icon">
          <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2ZM1 2v2h2l3.6 7.59-1.35 2.44C5.09 14.32 5 14.65 5 15c0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03L20.88 5H5.21l-.94-2H1Zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2Z"/>
        </svg>
        <span>Pemesanan</span>
      </NuxtLink>

      <!-- Reimbursement -->
      <NuxtLink to="/reimbursement" class="menu-item">
        <svg viewBox="0 0 24 24" class="menu-icon">
          <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2Zm0 14H4V8h16v10Zm-2-5h-4v2h4v-2Z"/>
        </svg>
        <span>Reimbursement</span>
      </NuxtLink>

      <!-- Laporan -->
      <NuxtLink to="/laporan" class="menu-item">
        <svg viewBox="0 0 24 24" class="menu-icon">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2ZM8 17H6v-5h2v5Zm5 0h-2V7h2v10Zm5 0h-2v-8h2v8Z"/>
        </svg>
        <span>Laporan</span>
      </NuxtLink>

      <!-- Pengaturan -->
      <NuxtLink to="/pengaturan" class="menu-item">
        <svg viewBox="0 0 24 24" class="menu-icon">
          <path d="M19.43 12.98c.04-.32.07-.65.07-.98s-.02-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.37-.31-.6-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98L14.5 2.42C14.47 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.5.42L9.12 5.07c-.61.25-1.18.59-1.69.98l-2.49-1c-.23-.08-.48 0-.6.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.08.65-.08.98s.03.66.08.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.37.31.6.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.04.24.25.42.5.42h4c.25 0 .46-.18.5-.42l.38-2.65c.61-.25 1.18-.58 1.69-.98l2.49 1c.23.08.48 0 .6-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65ZM12 15.5A3.5 3.5 0 1 1 12 8a3.5 3.5 0 0 1 0 7.5Z"/>
        </svg>
        <span>Pengaturan</span>
      </NuxtLink>

    </nav>
  </aside>
</template>

<style scoped>
.sidebar {
  width: 215px;
  min-height: 100vh;
  box-sizing: border-box;
  padding: 20px 14px;
  background: var(--sidebar);
  color: var(--white);
  flex-shrink: 0;
}

.logo {
  padding: 0 10px;
  margin-bottom: 28px;
  font-size: 20px;
  font-weight: 700;
  color: var(--white);
}

.menu {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 11px;

  padding: 11px 10px;

  border-radius: 7px;

  color: #d5dbea;
  text-decoration: none;

  font-size: 13px;
  font-weight: 500;

  transition:
    background 0.2s ease,
    color 0.2s ease;
}

.menu-icon {
  width: 17px;
  height: 17px;
  flex-shrink: 0;

  fill: currentColor;
}

.menu-item:hover {
  background: rgba(255, 255, 255, 0.08);
  color: var(--white);
}

.menu-item.router-link-active {
  background: var(--primary);
  color: var(--white);
}
</style>