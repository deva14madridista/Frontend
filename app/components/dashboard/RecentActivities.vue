<template>
  <div class="recent-activities">
    <div class="section-header">
      <div>
        <h2>Aktivitas Terbaru</h2>
        <p>Aktivitas terbaru pada sistem</p>
      </div>

      <NuxtLink to="/dashboard">
        Lihat Semua
      </NuxtLink>
    </div>

    <div class="activity-list">
      <div
        v-for="activity in activities"
        :key="activity.id"
        class="activity-item"
      >
        <div class="activity-icon">
          {{ activity.icon }}
        </div>

        <div class="activity-info">
          <p>{{ activity.title }}</p>
        </div>

        <span
          class="activity-status"
          :class="activity.statusClass"
        >
          {{ activity.status }}
        </span>

        <span class="activity-time">
          {{ activity.time }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
const activities = [
  {
    id: 1,
    icon: '🕐',
    title: 'Pengajuan perjalanan dinas ke Jakarta - Bandung',
    status: 'Menunggu Persetujuan',
    statusClass: 'waiting',
    time: 'Baru saja'
  },
  {
    id: 2,
    icon: '✓',
    title: 'Perjalanan dinas Semarang selesai & laporan diunggah',
    status: 'Selesai',
    statusClass: 'completed',
    time: '1 hari lalu'
  },
  {
    id: 3,
    icon: '▣',
    title: 'Reimbursement akomodasi Surabaya disetujui pihak keuangan',
    status: 'Disetujui',
    statusClass: 'approved',
    time: '3 hari lalu'
  }
]
</script>

<style scoped>
.recent-activities {
  margin-top: 24px;
  padding: 20px;
  background: var(--white);
  border: 1px solid var(--border);
  border-radius: 12px;
}

.section-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 18px;
}

.section-header h2 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: var(--text);
}

.section-header p {
  margin: 5px 0 0;
  font-size: 10px;
  color: var(--text-muted);
}

.section-header a {
  font-size: 10px;
  color: var(--primary);
  text-decoration: none;
}

.activity-list {
  display: flex;
  flex-direction: column;
}

.activity-item {
  display: flex;
  align-items: center;
  min-height: 52px;
  padding: 10px 0;
  border-bottom: 1px solid var(--border);
}

.activity-item:last-child {
  border-bottom: none;
}

.activity-icon {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  background: #eef3ff;
  border-radius: 50%;
  font-size: 13px;
}

.activity-info {
  flex: 1;
}

.activity-info p {
  margin: 0;
  font-size: 11px;
  line-height: 1.4;
  color: var(--text);
}

.activity-status {
  margin-right: 14px;
  padding: 5px 8px;
  border-radius: 4px;
  font-size: 9px;
  white-space: nowrap;
}

.waiting {
  background: #fff4df;
  color: #e99a00;
}

.completed {
  background: #e5f8f0;
  color: #20a77a;
}

.approved {
  background: #e8efff;
  color: var(--primary);
}

.activity-time {
  width: 55px;
  flex-shrink: 0;
  font-size: 9px;
  color: var(--text-muted);
  text-align: right;
}
</style>    