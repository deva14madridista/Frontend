<template>
  <div class="settings-page">

    <!-- Breadcrumb -->
    <div class="breadcrumb">
      <NuxtLink to="/dashboard">Dashboard</NuxtLink>
      <span>›</span>
      <strong>Pengaturan</strong>
    </div>

    <!-- Header -->
    <div class="page-header">
      <h1>Pengaturan Akun</h1>

      <LayoutPageactions />
    </div>

    <!-- Content -->
    <div class="settings-grid">

      <!-- LEFT COLUMN -->
      <div class="left-column">

        <!-- Informasi Profil -->
        <section class="settings-card profile-card">

  <div class="card-header">
    <h2>Informasi Profil</h2>

    <button class="edit-button">
      Edit Profil
    </button>
  </div>

  <div class="profile-info">

    <div class="profile-avatar">
      <span>D</span>
    </div>

    <div class="profile-detail">

      <h3>Deva Fauzan</h3>

      <p class="profile-email">
        deva.fauzan@company.com
      </p>

      <div class="profile-tags">
        <span>Staff IT</span>
        <span>Bogor HQ</span>
      </div>

    </div>

  </div>

</section>

        <!-- Preferensi Notifikasi -->
        <section class="settings-card notification-card">

          <h2>Preferensi Notifikasi</h2>

          <!-- Email -->
          <div class="notification-item">

            <div>
              <h3>Notifikasi Email</h3>

              <p>
                Terima update pengajuan dan persetujuan lewat email utama.
              </p>
            </div>

            <button
              class="toggle"
              type="button"
              role="switch"
              aria-label="Notifikasi Email"
              :aria-checked="emailNotification"
              @click="emailNotification = !emailNotification"
              :class="{ active: emailNotification }"
            >
              <span></span>
            </button>

          </div>

          <!-- Push -->
          <div class="notification-item">

            <div>
              <h3>Push Notification Persetujuan</h3>

              <p>
                Dapatkan pemberitahuan langsung saat status berubah.
              </p>
            </div>

            <button
              class="toggle"
              type="button"
              role="switch"
              aria-label="Push Notification Persetujuan"
              :aria-checked="pushNotification"
              @click="pushNotification = !pushNotification"
              :class="{ active: pushNotification }"
            >
              <span></span>
            </button>

          </div>

          <!-- Reminder -->
          <div class="notification-item">

            <div>
              <h3>Pengingat Perjalanan</h3>

              <p>
                Pemberitahuan akomodasi dan jadwal tiket sebelum keberangkatan.
              </p>
            </div>

            <button
              class="toggle"
              type="button"
              role="switch"
              aria-label="Pengingat Perjalanan"
              :aria-checked="travelReminder"
              @click="travelReminder = !travelReminder"
              :class="{ active: travelReminder }"
            >
              <span></span>
            </button>

          </div>

          <!-- Reimbursement -->
          <div class="notification-item">

            <div>
              <h3>Status Reimbursement</h3>

              <p>
                Informasi ketika klaim dana Anda disetujui keuangan.
              </p>
            </div>

            <button
              class="toggle"
              type="button"
              role="switch"
              aria-label="Status Reimbursement"
              :aria-checked="reimbursementNotification"
              @click="reimbursementNotification = !reimbursementNotification"
              :class="{ active: reimbursementNotification }"
            >
              <span></span>
            </button>

          </div>

        </section>

      </div>

      <!-- RIGHT COLUMN -->
      <section class="settings-card security-card">

        <h2>Keamanan Akun</h2>

        <!-- Password Lama -->
        <div class="form-group">

          <label>Kata Sandi Sekarang</label>

          <input
            type="password"
            placeholder="••••••••••••"
          />

        </div>

        <!-- Password Baru -->
        <div class="form-group">

          <label>Kata Sandi Baru</label>

          <input
            type="password"
            placeholder="Minimun 8 Karakter"
          />

        </div>

        <!-- Konfirmasi -->
        <div class="form-group">

          <label>Konfirmasi Kata Sandi</label>

          <input
            type="password"
            placeholder="Ulangi kata sandi baru..."
          />

        </div>

        <div class="security-footer">

          <button class="save-button">
            Simpan Sandi
          </button>

        </div>

      </section>

    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'

const emailNotification = ref(true)

const pushNotification = ref(false)

const travelReminder = ref(true)

const reimbursementNotification = ref(false)
</script>

<style scoped>

/* =========================
   PAGE
========================= */

.settings-page {
  width: 100%;
  min-height: calc(100vh - 70px);

  padding: 24px 28px;

  background: #f5f6f8;
}


/* =========================
   BREADCRUMB
========================= */

.breadcrumb {
  display: flex;
  align-items: center;

  gap: 8px;

  margin-bottom: 4px;

  font-size: 9px;

  color: #9aa4b5;
}

.breadcrumb a {
  color: #9aa4b5;

  text-decoration: none;
}

.breadcrumb strong {
  color: var(--text);

  font-weight: 600;
}


/* =========================
   HEADER
========================= */

.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;

  margin-bottom: 24px;
}

.page-header h1 {
  margin: 0;

  font-size: 23px;

  font-weight: 700;

  color: var(--text);
}


/* =========================
   GRID
========================= */

.settings-grid {
  display: grid;

  grid-template-columns: minmax(0, 1.35fr) minmax(280px, 1fr);

  gap: 18px;

  align-items: start;
}

.left-column {
  display: flex;
  flex-direction: column;

  gap: 18px;
}


/* =========================
   CARD
========================= */

.settings-card {
  background: var(--white);

  border: 1px solid var(--border);

  border-radius: 10px;

  padding: 20px;
}

.settings-card h2 {
  margin: 0;

  font-size: 14px;

  font-weight: 700;

  color: var(--text);
}


/* =========================
   PROFILE
========================= */

.profile-card {
  padding: 20px;
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;

  margin-bottom: 20px;
}

.card-header h2 {
  margin: 0;

  font-size: 14px;
  font-weight: 700;

  color: var(--text);
}

.edit-button {
  height: 22px;

  padding: 0 9px;

  border: 1px solid var(--primary);
  border-radius: 5px;

  background: var(--white);

  color: var(--primary);

  font-family: inherit;
  font-size: 8px;

  cursor: pointer;

  transition: 0.2s;
}

.edit-button:hover {
  background: #eef4ff;
}

.profile-info {
  display: flex;
  align-items: center;

  gap: 14px;
}

.profile-avatar {
  width: 58px;
  height: 58px;

  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 50%;

  background: #e8edf5;

  border: 1px solid #dce3ec;

  overflow: hidden;
}

.profile-avatar span {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;

  background: #d7dce5;

  color: #ffffff;

  font-size: 18px;
  font-weight: 600;
}

.profile-detail {
  display: flex;
  flex-direction: column;

  min-width: 0;
}

.profile-detail h3 {
  margin: 0 0 4px;

  font-size: 13px;
  line-height: 1.2;

  color: var(--text);

  font-weight: 700;

  overflow-wrap: anywhere;
}

.profile-email {
  margin: 0 0 7px;

  font-size: 9px;

  color: #8792a5;

  overflow-wrap: anywhere;
}

.profile-tags {
  display: flex;

  align-items: center;
  flex-wrap: wrap;

  gap: 6px;
}

.profile-tags span {
  padding: 3px 7px;

  border-radius: 4px;

  background: #f1f3f6;

  color: #718096;

  font-size: 8px;

  line-height: 1;
}

/* =========================
   NOTIFICATION
========================= */

.notification-card {
  padding-bottom: 10px;
}

.notification-card > h2 {
  margin-bottom: 8px;
}

.notification-item {
  min-height: 62px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: 20px;

  border-bottom: 1px solid #e7eaf0;
}

.notification-item:last-child {
  border-bottom: none;
}

.notification-item h3 {
  margin: 0 0 3px;

  font-size: 10px;

  font-weight: 600;

  color: var(--text);
}

.notification-item p {
  margin: 0;

  font-size: 8px;

  color: #8792a5;
}


/* =========================
   TOGGLE
========================= */

.toggle {
  position: relative;

  width: 32px;
  height: 18px;

  flex-shrink: 0;

  padding: 0;

  border: none;

  border-radius: 20px;

  background: #9aa9bd;

  cursor: pointer;

  transition: 0.2s;
}

.toggle span {
  position: absolute;

  top: 3px;
  left: 3px;

  width: 12px;
  height: 12px;

  border-radius: 50%;

  background: var(--white);

  transition: 0.2s;
}

.toggle.active {
  background: var(--primary);
}

.toggle.active span {
  left: 17px;
}

.toggle:focus-visible {
  outline: 2px solid var(--primary);
  outline-offset: 2px;
}


/* =========================
   SECURITY
========================= */

.security-card {
  min-height: 250px;
}

.security-card h2 {
  margin-bottom: 18px;
}

.form-group {
  margin-bottom: 14px;
}

.form-group label {
  display: block;

  margin-bottom: 6px;

  font-size: 9px;

  font-weight: 600;

  color: var(--text);
}

.form-group input {
  width: 100%;
  height: 32px;

  box-sizing: border-box;

  padding: 0 10px;

  border: 1px solid #dce2eb;

  border-radius: 6px;

  outline: none;

  background: var(--white);

  color: var(--text);

  font-family: inherit;

  font-size: 9px;
}

.form-group input:focus {
  border-color: var(--primary);
}

.form-group input::placeholder {
  color: #9aa6b8;
}


/* =========================
   SAVE BUTTON
========================= */

.security-footer {
  display: flex;
  justify-content: flex-end;

  margin-top: 22px;
}

.save-button {
  height: 30px;

  padding: 0 15px;

  border: none;

  border-radius: 6px;

  background: var(--primary);

  color: var(--white);

  font-family: inherit;

  font-size: 9px;

  font-weight: 600;

  cursor: pointer;
}

.save-button:hover {
  opacity: 0.9;
}


/* =========================
   RESPONSIVE
========================= */

@media (max-width: 1023px) {
  .settings-page {
    padding: 20px;
  }
}

@media (max-width: 850px) {
  .settings-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 767px) {
  .settings-page {
    padding: 16px;
  }

  .page-header h1 {
    font-size: 20px;
  }

  .settings-grid,
  .left-column {
    gap: 14px;
  }

  .settings-card {
    padding: 16px;
  }

  .settings-card h2,
  .card-header h2 {
    font-size: 15px;
  }

  .edit-button {
    height: 36px;
    padding: 0 12px;
    font-size: 11px;
  }

  .profile-info {
    align-items: flex-start;
  }

  .profile-detail h3 {
    font-size: 14px;
  }

  .profile-email,
  .profile-tags span {
    font-size: 10px;
  }

  .notification-item {
    align-items: flex-start;
    gap: 14px;

    min-height: 0;
    padding: 14px 0;
  }

  .notification-item h3 {
    font-size: 12px;
  }

  .notification-item p {
    font-size: 10px;
    line-height: 1.5;
  }

  .form-group label {
    font-size: 11px;
  }

  .form-group input {
    height: 42px;
    font-size: 16px;
  }

  .security-card {
    min-height: 0;
  }

  .security-footer {
    justify-content: stretch;
    margin-top: 18px;
  }

  .save-button {
    width: 100%;
    height: 44px;
    font-size: 13px;
  }
}

@media (max-width: 374px) {
  .settings-page {
    padding: 12px;
  }

  .settings-card {
    padding: 14px;
  }
}
</style>