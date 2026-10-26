<template>
  <div class="pegawai-dashboard-page">
    <div class="dashboard-header">
      <div>
        <h1>Dashboard Pegawai</h1>
        <p>Ringkasan pengajuan dan perjalanan Anda</p>
      </div>
    </div>

    <!-- Summary Cards -->
    <div class="summary-grid">
      <DashboardSummaryCard
        title="Total Pengajuan"
        :value="5"
        icon="📝"
      />

      <DashboardSummaryCard
        title="Menunggu Persetujuan"
        :value="2"
        icon="◷"
      />

      <DashboardSummaryCard
        title="Perjalanan Aktif"
        :value="1"
        icon="➤"
      />

      <DashboardSummaryCard
        title="Ringkasan Pengeluaran"
        value="Rp 1.250.000"
        icon="💰"
      />
    </div>

    <!-- Main Content -->
    <div class="middle-content">
      <!-- Upcoming Trips -->
      <section class="upcoming-trips-card">
        <div class="section-header">
          <h2>Jadwal Perjalanan Berikutnya</h2>
        </div>
        <div class="upcoming-trips">
          <div class="section-header">
            <div>
              <h2>Perjalanan Mendatang</h2>
              <p>Jadwal perjalanan yang akan datang</p>
            </div>
            <NuxtLink to="/pegawai/rencana" class="view-all">Lihat Semua</NuxtLink>
          </div>
          <div class="trip-list">
            <div v-for="trip in upcomingTrips" :key="trip.id" class="trip-item">
              <div class="trip-top">
                <span class="route">{{ trip.route }}</span>
                <span class="date">{{ trip.date }}</span>
              </div>
              <p>{{ trip.description }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Recent Activity -->
      <section class="recent-activity-card">
        <div class="section-header">
          <h2>Aktivitas Terbaru</h2>
        </div>
        <div class="activity-list">
          <article v-for="activity in recentActivities" :key="activity.id" class="activity-item">
            <div class="activity-icon">{{ activity.icon }}</div>
            <div class="activity-info">
              <p>{{ activity.title }}</p>
            </div>
            <span class="activity-status" :class="activity.statusClass">{{ activity.status }}</span>
            <span class="activity-time">{{ activity.time }}</span>
          </article>
        </div>
      </section>
    </div>

    <!-- Quick Actions -->
    <section class="quick-actions-card">
      <div class="section-header">
        <h2>Tindakan Cepat</h2>
      </div>
      <div class="quick-actions">
        <NuxtLink to="/pegawai/rencana" class="action-button">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 11l3 3L22 4"/></svg>
          <span>Buat Rencana Perjalanan</span>
        </NuxtLink>
        <NuxtLink to="/pegawai/pengeluaran" class="action-button">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2Zm0 14H4V8h16v10Zm-2-5h-4v2h4v-2Z"/></svg>
          <span>Ajukan Pengeluaran</span>
        </NuxtLink>
        <NuxtLink to="/pegawai/laporan" class="action-button">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8ZM16 8v8M12 12h6M12 16h6"/></svg>
          <span>Lihat Laporan Saya</span>
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import DashboardSummaryCard from '~/components/dashboard/SummaryCard.vue'

const upcomingTrips = ref([
  { id: 1, route: 'Jakarta - Bandung', date: '24 Jan 2026', description: 'Pertemuan dengan Direksi & Vendor lokal.' },
  { id: 2, route: 'Jakarta - Surabaya', date: '05 Feb 2026', description: 'Training regional & evaluasi kuartal.' },
])

const recentActivities = ref([
  { id: 1, icon: '🕐', title: 'Pengajuan perjalanan dinas ke Jakarta - Bandung', status: 'Menunggu Persetujuan', statusClass: 'waiting', time: 'Baru saja' },
  { id: 2, icon: '✓', title: 'Perjalanan dinas Semarang selesai & laporan diunggah', status: 'Selesai', statusClass: 'completed', time: '1 hari lalu' },
])
</script>

<style scoped>
.pegawai-dashboard-page {
  width: 100%;
  min-height: calc(100vh - 70px);
  padding: 28px;
  background: #f5f6f8;
}

.dashboard-header {
  margin-bottom: 24px;
}

.dashboard-header h1 {
  margin: 0;
  font-size: 24px;
  font-weight: 700;
  color: var(--text);
}

.dashboard-header p {
  margin: 5px 0 0;
  font-size: 12px;
  color: var(--text-muted);
}

.summary-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;
  margin-bottom: 24px;
}

.middle-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-top: 24px;
}

.upcoming-trips-card,
.recent-activity-card,
.quick-actions-card {
  flex: 1;
  min-width: 0;
}

.upcoming-trips-card,
.quick-actions-card {
  padding: 20px;
  background: var(--white);
  border: 1px solid var(--border);
  border-radius: 12px;
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.section-header h2 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: var(--text);
}

.view-all {
  font-size: 12px;
  color: var(--primary);
  text-decoration: none;
  font-weight: 500;
}

.view-all:hover { text-decoration: underline; }

.upcoming-trips {
  display: flex; flex-direction: column; gap: 12px;
}

.trip-list { display: flex; flex-direction: column; gap: 12px; }

.trip-item { padding: 12px; background: #f6f7f9; border-radius: 8px; }
.trip-item .route { padding: 4px 7px; background: #e8f0ff; border-radius: 4px; font-size: 10px; color: var(--primary); overflow-wrap: anywhere; }
.trip-item .date { font-size: 9px; color: var(--text-muted); }
.trip-item p { margin: 9px 0 0; font-size: 11px; line-height: 1.5; color: var(--text); }

.recent-activity-card {
  padding: 20px;
  background: var(--white);
  border: 1px solid var(--border);
  border-radius: 12px;
}

.activity-list { display: flex; flex-direction: column; gap: 12px; }

.activity-item { display: flex; align-items: center; min-height: 52px; padding: 10px 0; border-bottom: 1px solid var(--border); }
.activity-item:last-child { border-bottom: none; }
.activity-item .activity-icon { width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; margin-right: 12px; background: #eef3ff; border-radius: 50%; font-size: 13px; }
.activity-item .activity-info { flex: 1; min-width: 0; }
.activity-item .activity-info p { margin: 0; font-size: 11px; line-height: 1.4; color: var(--text); overflow-wrap: anywhere; }
.activity-item .activity-status { margin-right: 14px; padding: 5px 8px; border-radius: 4px; font-size: 9px; white-space: nowrap; }
.activity-item .activity-status.waiting { background: #fff4df; color: #e99a00; }
.activity-item .activity-status.completed { background: #e5f8f0; color: #20a77a; }

.quick-actions-card {
  padding: 20px;
  background: var(--white);
  border: 1px solid var(--border);
  border-radius: 12px;
}

.quick-actions { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }

.action-button {
  display: flex; align-items: center; justify-content: center; gap: 8px;
  padding: 12px; background: var(--white);
  border: 1px solid var(--border);
  border-radius: 8px; font-size: 12px; font-weight: 500; cursor: pointer; transition: 0.2s;
}
.action-button:hover { border-color: var(--primary); }
.action-button svg { width: 20px; height: 20px; }
.action-button span { flex: 1; }

/* RESPONSIVE */
@media (max-width: 1023px) {
  .pegawai-dashboard-page { padding: 22px; }
  .summary-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .middle-content { grid-template-columns: 1fr; gap: 12px; }
  .upcoming-trips-card, .recent-activity-card, .quick-actions-card { padding: 16px; }
  .quick-actions { grid-template-columns: 1fr; gap: 10px; }
  .action-button { padding: 10px; font-size: 11px; }
}

@media (max-width: 767px) {
  .pegawai-dashboard-page { padding: 16px; }
  .dashboard-header h1 { font-size: 21px; }
  .summary-grid { grid-template-columns: 1fr; gap: 12px; }
  .dashboard-header p { font-size: 11px; }
  .section-header h2 { font-size: 15px; }
  .view-all { font-size: 11px; }
  .upcoming-trips-card, .recent-activity-card, .quick-actions-card { padding: 12px; }
  .trip-item { padding: 8px; }
  .activity-item { padding: 6px 0; }
  .activity-status { padding: 3px 5px; font-size: 8px; }
  .quick-actions-card { padding: 12px; }
  .quick-actions { gap: 8px; }
  .action-button { padding: 8px; font-size: 10px; }
}

@media (max-width: 540px) {
  .summary-grid { grid-template-columns: 1fr; }
}

@media (max-width: 374px) {
  .pegawai-dashboard-page { padding: 12px; }
}
</style>