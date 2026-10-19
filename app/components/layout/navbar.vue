```vue
<template>
  <header class="navbar">
    <!-- Brand -->
    <div class="navbar-brand">
      <img
        src="~/assets/image/eduabsen.png"
        alt="Eduabsen"
        class="brand-logo"
      />

      <div class="brand-text">
        <span class="brand-name">Eduabsen</span>
        <span class="brand-subtitle">Travel App</span>
      </div>
    </div>

    <!-- Bagian kanan -->
    <div class="navbar-actions">
      <LayoutPageActions />

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

<style scoped>
.navbar {
  min-height: 70px;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--white);
  border-bottom: 1px solid var(--border);
}

/* BRAND */
.navbar-brand {
  display: flex;
  align-items: center;
  gap: 10px;
}

.brand-logo {
  width: 65px;
  height: 65px;
  object-fit: contain;
}

.brand-text {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.brand-name {
  font-size: 20px;
  font-weight: 700;
  line-height: 1;
  color: var(--text);
}

.brand-subtitle {
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.4px;
  color: var(--primary);
}

/* BAGIAN KANAN */
.navbar-actions {
  display: flex;
  align-items: center;
  gap: 16px;
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
  margin-right: 12px;
}

.profile-info strong {
  font-size: 13px;
  font-weight: 600;
  color: var(--text);
}

.profile-info span {
  font-size: 10px;
  color: var(--text-muted);
}

@media (max-width: 768px) {
  .navbar {
    padding: 0 12px;
  }

  .brand-logo {
    width: 42px;
    height: 42px;
  }

  .brand-name {
    font-size: 16px;
  }

  .navbar-actions {
    gap: 8px;
  }

  .profile-info {
    display: none;
  }

  .nav-register,
  .nav-login {
    min-width: auto;
    height: 32px;
    padding: 0 10px;
    font-size: 11px;
  }
}
</style>
```
