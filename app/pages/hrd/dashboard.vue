<template>
  <div class="hrd-dashboard-page">
    <div class="dashboard-header">
      <div>
        <h1>Dashboard HRD</h1>
        <p>Monitoring perjalanan dinas dan data pegawai</p>
      </div>
    </div>

    <!-- Summary Cards -->
    <div class="summary-grid">
      <DashboardSummaryCard
        title="Total Pegawai"
        :value="150"
        icon="👥"
      />

      <DashboardSummaryCard
        title="Pegawai Aktif"
        :value="120"
        icon="✓"
      />

      <DashboardSummaryCard
        title="Dalam Perjalanan"
        :value="15"
        icon="▶"
      />

      <DashboardSummaryCard
        title="Perjalanan Selesai"
        :value="85"
        icon="✓"
      />
    </div>

    <!-- Charts & Stats -->
    <div class="middle-content">
      <!-- Distribution by Department -->
      <section class="department-card">
        <div class="section-header">
          <h2>Distribusi Pegawai per Departemen</h2>
        </div>
        <div class="chart">
          <div v-for="item in deptData" :key="item.dept" class="chart-item">
            <div class="bar-wrapper">
              <div class="bar" :style="{ width: `${item.percentage}%` }"></div>
            </div>
            <span class="dept-name">{{ item.dept }}</span>
            <span class="bar-value">{{ item.count }} orang</span>
          </div>
        </div>
      </section>

      <!-- Active Trips -->
      <section class="trips-card">
        <div class="section-header">
          <h2>Perjalanan yang Sedang Berlangsung</h2>
        </div>
        <div class="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>No</th>
                <th>Pegawai</th>
                <th>Tujuan</th>
                <th>Berangkat</th>
                <th>Kembali</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(trip, index) in activeTrips" :key="trip.id">
                <td>{{ index + 1 }}</td>
                <td>{{ trip.employee }}</td>
                <td>{{ trip.destination }}</td>
                <td>{{ trip.startDate }}</td>
                <td>{{ trip.endDate }}</td>
                <td><span class="status-badge ongoing">Dalam Perjalanan</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>

    <!-- Recent Activities -->
    <section class="recent-card">
      <div class="section-header">
        <h2>Aktivitas Terbaru</h2>
        <NuxtLink to="/hrd/pelaksanaan" class="view-all">Lihat Semua</NuxtLink>
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
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DashboardSummaryCard from '~/components/dashboard/SummaryCard.vue'

const deptData = ref([
  { dept: 'Marketing', count: 35, percentage: 23.3 },
  { dept: 'Sales', count: 28, percentage: 18.7 },
  { dept: 'HRD', count: 22, percentage: 14.7 },
  { dept: 'Finance', count: 18, percentage: 12.0 },
  { dept: 'IT', count: 15, percentage: 10.0 },
  { dept: 'Ops', count: 32, percentage: 21.3 },
])

const activeTrips = ref([
  { id: 1, employee: 'Andi Saputra', destination: 'Jakarta - Bandung', startDate: '10 Mei 2026', endDate: '12 Mei 2026' },
  { id: 2, employee: 'Sinta Maharani', destination: 'Jakarta - Surabaya', startDate: '15 Mei 2026', endDate: '18 Mei 2026' },
  { id: 3, employee: 'Dewi Lestari', destination: 'Jakarta - Yogyakarta', startDate: '20 Mei 2026', endDate: '22 Mei 2026' },
])

const recentActivities = ref([
  { id: 1, icon: '🕐', title: 'Pengajuan perjalanan dinas ke Jakarta - Bandung', status: 'Menunggu Persetujuan', statusClass: 'waiting', time: 'Baru saja' },
  { id: 2, icon: '✓', title: 'Perjalanan dinas Semarang selesai & laporan diunggah', status: 'Selesai', statusClass: 'completed', time: '1 hari lalu' },
  { id: 3, icon: '▣', title: 'Reimbursement akomodasi Surabaya disetujui', status: 'Disetujui', statusClass: 'approved', time: '3 hari lalu' },
])
</script>

<style scoped>
.hrd-dashboard-page {
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

.department-card,
.trips-card,
.recent-card {
  flex: 1;
  min-width: 0;
}

.department-card {
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

.chart {
  height: 180px;
  display: flex;
  align-items: flex-end;
  gap: 16px;
}

.chart-item {
  flex: 1;
  min-width: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
}

.bar-wrapper {
  width: 100%;
  height: 140px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
}

.bar {
  width: 20px;
  max-width: 100%;
  background: var(--primary);
  border-radius: 5px 5px 0 0;
  transition: width 0.2s ease;
}

.chart-item span {
  font-size: 10px;
  color: var(--text-muted);
}

.bar-value {
  font-size: 9px;
  font-weight: 600;
  color: var(--primary);
}

.trips-card {
  padding: 20px;
  background: var(--white);
  border: 1px solid var(--border);
  border-radius: 12px;
}

.trips-card table { width: 100%; border-collapse: collapse; table-layout: fixed; }
.trips-card thead { background: #f3f4f6; }
.trips-card th { padding: 10px 12px; text-align: left; font-size: 9px; font-weight: 600; color: #718096; }
.trips-card td { padding: 12px; border-bottom: 1px solid #e5e8ee; font-size: 10px; color: #344054; vertical-align: middle; }
.trips-card tbody tr:last-child td { border-bottom: none; }
.trips-card tbody tr:hover { background: #fafbfc; }

.recent-card {
  padding: 20px;
  background: var(--white);
  border: 1px solid var(--border);
  border-radius: 12px;
}

.activity-list { display: flex; flex-direction: column; gap: 12px; }

.activity-item { display: flex; align-items: center; min-height: 52px; padding: 10px 0; border-bottom: 1px solid var(--border); }
.activity-item:last-child { border-bottom: none; }

.activity-icon { width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; margin-right: 12px; background: #eef3ff; border-radius: 50%; font-size: 13px; }
.activity-info { flex: 1; min-width: 0; }
.activity-info p { margin: 0; font-size: 11px; line-height: 1.4; color: var(--text); overflow-wrap: anywhere; }
.activity-status { margin-right: 14px; padding: 5px 8px; border-radius: 4px; font-size: 9px; white-space: nowrap; }
.activity-status.waiting { background: #fff4df; color: #e99a00; }
.activity-status.completed { background: #e5f8f0; color: #20a77a; }
.activity-status.approved { background: #e8efff; color: var(--primary); }

.activity-time { width: 55px; flex-shrink: 0; font-size: 9px; color: var(--text-muted); text-align: right; }

.view-all {
  font-size: 12px;
  color: var(--primary);
  text-decoration: none;
  font-weight: 500;
}

.view-all:hover { text-decoration: underline; }

/* RESPONSIVE */
@media (max-width: 1023px) {
  .hrd-dashboard-page { padding: 22px; }
  .summary-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .middle-content { grid-template-columns: 1fr; gap: 12px; }
}

@media (max-width: 767px) {
  .hrd-dashboard-page { padding: 16px; }
  .dashboard-header h1 { font-size: 21px; }
  .summary-grid { grid-template-columns: 1fr; gap: 12px; }
  .section-header h2 { font-size: 15px; }
  .chart { gap: 8px; }
  .bar { width: 16px; }
  .activity-item { padding: 8px 0; }
  .activity-status { padding: 3px 6px; font-size: 8px; }
  .activity-time { width: auto; font-size: 8px; }
}

@media (max-width: 540px) {
  .summary-grid { grid-template-columns: 1fr; }
}

@media (max-width: 374px) {
  .hrd-dashboard-page { padding: 12px; }
}
</style>