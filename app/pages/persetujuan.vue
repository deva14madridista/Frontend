<template>
  <div class="approval-page">

    <!-- Breadcrumb -->
    <div class="breadcrumb">
      <NuxtLink to="/dashboard">Dashboard</NuxtLink>
      <span>›</span>
      <strong>Persetujuan</strong>
    </div>

    <!-- Header -->
    <div class="page-header">
      <h1>Persetujuan Perjalanan</h1>

      <LayoutPageActions />
    </div>

    <!-- Tabs -->
    <div class="tabs">
      <button
        :class="{ active: activeTab === 'waiting' }"
        @click="activeTab = 'waiting'"
      >
        Menunggu Persetujuan
      </button>

      <button
        :class="{ active: activeTab === 'approved' }"
        @click="activeTab = 'approved'"
      >
        Disetujui
      </button>

      <button
        :class="{ active: activeTab === 'rejected' }"
        @click="activeTab = 'rejected'"
      >
        Ditolak
      </button>
    </div>

    <!-- Approval Card -->
    <div class="approval-card">

      <div
        v-for="request in filteredRequests"
        :key="request.id"
        class="approval-item"
      >

        <!-- Avatar -->
        <div
          class="avatar"
          :class="request.avatarClass"
        >
          {{ request.initial }}
        </div>

        <!-- Information -->
        <div class="request-info">

          <div class="name-row">
            <h3>{{ request.name }}</h3>
            <span>• {{ request.position }}</span>
          </div>

          <p class="route">
            {{ request.route }}
          </p>

          <p class="purpose">
            {{ request.purpose }}
          </p>

          <p class="date">
            Tanggal: {{ request.date }}
          </p>

        </div>

        <!-- Action -->
        <div
          v-if="activeTab === 'waiting'"
          class="request-actions"
        >
          <button
            class="reject-button"
            @click="rejectRequest(request)"
          >
            Tolak
          </button>

          <button
            class="approve-button"
            @click="approveRequest(request)"
          >
            Setujui
          </button>
        </div>

      </div>

      <!-- Empty -->
      <div
        v-if="filteredRequests.length === 0"
        class="empty-state"
      >
        Tidak ada data persetujuan.
      </div>

    </div>

    <!-- Footer -->
    <div class="approval-footer">

      <span>
        Menampilkan {{ filteredRequests.length }} dari 5 data
      </span>

      <button>
        Lihat Semua
      </button>

    </div>

  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const activeTab = ref('waiting')

const requests = ref([
  {
    id: 1,
    name: 'Deva Fauzan Nuraqli',
    position: 'Staff Marketing',
    route: 'Jakarta - Bandung',
    purpose: 'Meeting dengan Client A',
    date: '21 Mei 2026 (3 hari)',
    status: 'waiting',
    initial: 'R',
    avatarClass: 'red'
  },
  {
    id: 2,
    name: 'Andi Saputra',
    position: 'Staff Sales',
    route: 'Jakarta - Surabaya',
    purpose: 'Training & Workshop',
    date: '20 Mei 2026 (4 hari)',
    status: 'waiting',
    initial: 'A',
    avatarClass: 'blue'
  },
  {
    id: 3,
    name: 'Dewi Lestari',
    position: 'Staff HRD',
    route: 'Jakarta - Yogyakarta',
    purpose: 'Rekrutmen & Interview',
    date: '25 Mei 2026 (2 hari)',
    status: 'waiting',
    initial: 'D',
    avatarClass: 'orange'
  },
  {
    id: 4,
    name: 'Budi Santoso',
    position: 'Staff Finance',
    route: 'Jakarta - Semarang',
    purpose: 'Audit Cabang',
    date: '27 Mei 2026 (2 hari)',
    status: 'approved',
    initial: 'B',
    avatarClass: 'green'
  },
  {
    id: 5,
    name: 'Sinta Maharani',
    position: 'Staff Operasional',
    route: 'Jakarta - Medan',
    purpose: 'Koordinasi Operasional',
    date: '30 Mei 2026 (3 hari)',
    status: 'rejected',
    initial: 'S',
    avatarClass: 'purple'
  }
])

const filteredRequests = computed(() => {
  return requests.value.filter(
    request => request.status === activeTab.value
  )
})

const approveRequest = (request) => {
  request.status = 'approved'
}

const rejectRequest = (request) => {
  request.status = 'rejected'
}
</script>

<style scoped>
/* =========================
   PAGE
========================= */

.approval-page {
  min-height: 100vh;
  padding: 24px 28px;
  background: #f5f6f8;
}

/* =========================
   BREADCRUMB
========================= */

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 9px;

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

  margin-bottom: 20px;
}

.page-header h1 {
  margin: 0;

  font-size: 23px;
  font-weight: 700;

  color: var(--text);
}

/* =========================
   TABS
========================= */

.tabs {
  display: flex;
  align-items: center;
  gap: 26px;

  height: 37px;

  border-bottom: 1px solid #dfe3ea;

  margin-bottom: 24px;
}

.tabs button {
  position: relative;

  height: 37px;

  padding: 0;

  border: none;
  background: transparent;

  color: #718096;

  font-family: inherit;
  font-size: 10px;

  cursor: pointer;
}

.tabs button.active {
  color: var(--primary);
  font-weight: 600;
}

.tabs button.active::after {
  content: "";

  position: absolute;

  left: 0;
  right: 0;
  bottom: -1px;

  height: 2px;

  background: var(--primary);
}

/* =========================
   CARD
========================= */

.approval-card {
  padding: 0 16px;

  background: var(--white);

  border: 1px solid var(--border);
  border-radius: 11px;
}

/* =========================
   ITEM
========================= */

.approval-item {
  min-height: 94px;

  display: flex;
  align-items: center;

  gap: 12px;

  border-bottom: 1px solid #e5e8ee;
}

.approval-item:last-child {
  border-bottom: none;
}

/* =========================
   AVATAR
========================= */

.avatar {
  width: 30px;
  height: 30px;

  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 50%;

  color: var(--white);

  font-size: 15px;
  font-weight: 600;
}

.avatar.red {
  background: #ef4444;
}

.avatar.blue {
  background: #2563eb;
}

.avatar.orange {
  background: #f59e0b;
}

.avatar.green {
  background: #10b981;
}

.avatar.purple {
  background: #8b5cf6;
}

/* =========================
   INFORMATION
========================= */

.request-info {
  flex: 1;
  min-width: 0;
}

.name-row {
  display: flex;
  align-items: center;
  gap: 5px;
}

.name-row h3 {
  margin: 0;

  font-size: 11px;
  font-weight: 700;

  color: var(--text);
}

.name-row span {
  font-size: 8px;
  color: #7b8aa0;
}

.route {
  margin: 3px 0 0;

  font-size: 10px;
  font-weight: 600;

  color: var(--primary);
}

.purpose {
  margin: 2px 0 0;

  font-size: 8px;
  color: #718096;
}

.date {
  margin: 3px 0 0;

  font-size: 8px;
  color: #9aa4b5;
}

/* =========================
   ACTION
========================= */

.request-actions {
  display: flex;
  align-items: center;
  gap: 9px;
}

.request-actions button {
  height: 26px;

  padding: 0 12px;

  border-radius: 5px;

  font-family: inherit;
  font-size: 9px;

  cursor: pointer;
}

.reject-button {
  border: 1px solid #ff5b5b;

  background: var(--white);

  color: #ef4444;
}

.reject-button:hover {
  background: #fff1f1;
}

.approve-button {
  border: 1px solid #10b981;

  background: var(--white);

  color: #10a779;
}

.approve-button:hover {
  background: #edfff8;
}

/* =========================
   EMPTY
========================= */

.empty-state {
  padding: 45px 20px;

  text-align: center;

  font-size: 10px;
  color: #9aa4b5;
}

/* =========================
   FOOTER
========================= */

.approval-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-top: 22px;

  font-size: 9px;
  color: #718096;
}

.approval-footer button {
  border: none;
  background: transparent;

  color: var(--primary);

  font-family: inherit;
  font-size: 9px;
  font-weight: 600;

  cursor: pointer;
}

/* =========================
   RESPONSIVE
========================= */

@media (max-width: 700px) {
  .approval-page {
    padding: 16px;
  }

  .approval-item {
    align-items: flex-start;

    padding: 16px 0;
  }

  .request-actions {
    flex-direction: column;
  }

  .request-actions button {
    width: 65px;
  }

  .tabs {
    gap: 16px;
  }
}
</style>    