<template>
  <div class="recent-activities">

    <div class="section-header">
      <h2>Aktivitas Terbaru</h2>
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

.section-header h2 {
  margin: 0 0 18px;

  font-size: 16px;
  color: var(--text);
}

.activity-list {
  display: flex;
  flex-direction: column;
}

.activity-item {
  display: flex;
  align-items: center;

  min-height: 48px;
  padding: 10px 0;

  border-bottom: 1px solid var(--border);
}

.activity-item:last-child {
  border-bottom: none;
}

.activity-icon {
  width: 30px;
  height: 30px;

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
  color: var(--text);
}

.activity-status {
  margin-right: 12px;
  padding: 4px 8px;

  border-radius: 4px;
  font-size: 9px;
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

  font-size: 9px;
  color: var(--text-muted);
  text-align: right;
}
</style>