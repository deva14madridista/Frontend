<template>
  <header class="navbar">
    <!-- Kiri: menu + brand -->
    <div class="navbar-left">
      <button
        class="menu-toggle"
        type="button"
        aria-label="Buka menu navigasi"
        aria-controls="app-sidebar"
        :aria-expanded="sidebarOpen"
        @click="$emit('toggle-sidebar')"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M3 6h18v2H3V6Zm0 5h18v2H3v-2Zm0 5h18v2H3v-2Z" />
        </svg>
      </button>

      <NuxtLink
        to="/dashboard"
        class="navbar-brand"
        aria-label="Eduabsen Travel App - Dashboard"
      >
        <img
          src="~/assets/image/eduabsen.png"
          alt="Eduabsen"
          class="brand-logo"
        />

        <div class="brand-text">
          <span class="brand-name">Eduabsen</span>
          <span class="brand-subtitle">Travel App</span>
        </div>
      </NuxtLink>
    </div>

    <!-- Kanan -->
    <div class="navbar-actions">
      <LayoutPageactions class="navbar-page-actions" />

      <!-- Tombol Login dan Register -->
      <div class="auth-buttons">
        <NuxtLink to="/register" class="nav-register">
          Register
        </NuxtLink>

        <NuxtLink to="/login" class="nav-login">
          Login
        </NuxtLink>
      </div>

      <!-- Profil -->
      <div class="profile">
        <div class="profile-avatar">
          D
        </div>

        <div class="profile-info">
          <strong>Deva Fauzan Nuraqli</strong>
          <span>Administrator</span>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
defineProps({
  sidebarOpen: {
    type: Boolean,
    default: false
  }
})

defineEmits(['toggle-sidebar'])
</script>

<style scoped>
.navbar {
  position: sticky;
  top: 0;
  z-index: 900;

  min-height: 70px;
  padding: 0 24px;

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;

  background: var(--white);
  border-bottom: 1px solid var(--border);
}

.navbar-left {
  display: flex;
  align-items: center;
  gap: 10px;

  min-width: 0;
}

/* HAMBURGER */

.menu-toggle {
  display: none;

  width: 40px;
  height: 40px;

  align-items: center;
  justify-content: center;

  flex-shrink: 0;

  padding: 0;

  border: 1px solid var(--border);
  border-radius: 8px;

  background: var(--white);
  color: var(--text);

  cursor: pointer;
}

.menu-toggle svg {
  width: 20px;
  height: 20px;

  fill: currentColor;
}

.menu-toggle:hover {
  background: #f5f7fa;
}

.menu-toggle:focus-visible {
  outline: 2px solid var(--primary);
  outline-offset: 2px;
}

/* BRAND */

.navbar-brand {
  display: flex;
  align-items: center;
  gap: 10px;

  min-width: 0;
}

.brand-logo {
  width: 65px;
  height: 65px;

  flex-shrink: 0;

  object-fit: contain;
}

.brand-text {
  display: flex;
  flex-direction: column;
  gap: 3px;

  min-width: 0;
}

.brand-name {
  font-size: 20px;
  font-weight: 700;
  line-height: 1;
  color: var(--text);

  white-space: nowrap;
}

.brand-subtitle {
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.4px;
  color: var(--primary);

  white-space: nowrap;
}

/* BAGIAN KANAN */

.navbar-actions {
  display: flex;
  align-items: center;
  gap: 16px;

  flex-shrink: 0;
}

.auth-buttons {
  display: flex;
  align-items: center;
  gap: 8px;
}

.nav-register,
.nav-login {
  display: inline-flex;
  align-items: center;
  justify-content: center;

  min-width: 64px;
  height: 36px;
  padding: 0 14px;

  border-radius: 7px;

  font-size: 12px;
  font-weight: 600;
  text-decoration: none;

  transition: 0.2s;
}

.nav-register {
  color: var(--text);
  background: var(--white);
  border: 1px solid var(--border);
}

.nav-register:hover {
  background: #f5f7fa;
}

.nav-login {
  color: var(--white);
  background: var(--primary);
  border: 1px solid var(--primary);
}

.nav-login:hover {
  filter: brightness(0.92);
}

/* PROFIL */

.profile {
  display: flex;
  align-items: center;
  gap: 10px;

  min-width: 0;
}

.profile-avatar {
  width: 34px;
  height: 34px;

  display: flex;
  align-items: center;
  justify-content: center;

  flex-shrink: 0;

  border-radius: 50%;

  background: var(--primary);
  color: var(--white);

  font-size: 13px;
  font-weight: 600;
}

.profile-info {
  display: flex;
  flex-direction: column;
  gap: 3px;

  min-width: 0;
  margin-right: 12px;
}

.profile-info strong {
  font-size: 13px;
  font-weight: 600;
  color: var(--text);

  white-space: nowrap;
}

.profile-info span {
  font-size: 10px;
  color: var(--text-muted);
}

/* =========================
   TABLET
========================= */

@media (max-width: 1023px) {
  .navbar {
    gap: 12px;
    padding: 0 18px;
  }

  .brand-logo {
    width: 48px;
    height: 48px;
  }

  .brand-name {
    font-size: 17px;
  }

  .brand-subtitle {
    font-size: 9px;
  }

  .navbar-actions {
    gap: 10px;
  }

  .navbar-actions :deep(.page-actions) {
    gap: 6px;
  }

  .navbar-actions :deep(.action-button) {
    width: 32px;
    height: 32px;
    margin-right: 0;
  }

  .profile-info {
    display: none;
  }

  .nav-register,
  .nav-login {
    min-width: 56px;
    height: 32px;
    padding: 0 10px;
    font-size: 11px;
  }
}

/* =========================
   MOBILE
========================= */

@media (max-width: 767px) {
  .navbar {
    gap: 8px;
    min-height: 62px;
    padding: 0 12px;
  }

  .navbar-left {
    gap: 8px;
  }

  .menu-toggle {
    display: inline-flex;
  }

  .brand-logo {
    width: 38px;
    height: 38px;
  }

  .brand-text {
    gap: 2px;
  }

  .brand-name {
    font-size: 16px;
  }

  .brand-subtitle {
    font-size: 9px;
  }

  .navbar-actions {
    gap: 8px;
  }

  .auth-buttons {
    display: none;
  }

  .profile-avatar {
    width: 32px;
    height: 32px;
    font-size: 12px;
  }

  .navbar-actions :deep(.page-actions) {
    gap: 6px;
  }

  .navbar-actions :deep(.action-button) {
    width: 32px;
    height: 32px;
    margin-right: 0;
  }

  .navbar-actions :deep(.action-icon) {
    width: 14px;
    height: 14px;
  }
}

@media (max-width: 374px) {
  .navbar {
    padding: 0 10px;
  }

  .brand-logo {
    width: 32px;
    height: 32px;
  }

  .brand-name {
    font-size: 14px;
  }

  .brand-subtitle {
    display: none;
  }

  .navbar-actions {
    gap: 6px;
  }

  .profile-avatar {
    width: 30px;
    height: 30px;
  }
}
</style>
