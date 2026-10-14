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
<style>
.navbar {
  height: 70px;
  padding: 0 24px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  background: var(--white);
  border-bottom: 1px solid var(--border);
}

/* =========================
   BRAND
========================= */

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

  gap: 1px;
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

/* =========================
   RIGHT SIDE
========================= */

.navbar-actions {
  display: flex;
  align-items: center;
  gap: 20px;
}

.profile {
  display: flex;
  align-items: center;
  gap: 15px;
}

.profile-avatar {
  width: 34px;
  height: 34px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 50%;

  background: var(--primary);
  color: var(--white);

  font-size: 13px;
  font-weight: 600;
}

.profile-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin-right: 12px;
}

.profile-info strong {
  font-size: 15 px;
  font-weight: 600;
  color: var(--text);
}

.profile-info span {
  font-size: 8px;
  color: var(--text-muted);
}
</style>
