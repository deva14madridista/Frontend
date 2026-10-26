<template>
  <div class="dashboard-page">
    <div class="dashboard-header">
      <div>
        <h1>Dashboard Finance</h1>
        <p>Ringkasan keuangan perjalanan dinas</p>
      </div>
    </div>

    <!-- Summary Cards -->
    <div class="summary-grid">
      <DashboardSummaryCard
        title="Total Pengeluaran Aktual"
        :value="formatCurrency(summary.totalActual)"
        icon="💰"
      />

      <DashboardSummaryCard
        title="Menunggu Verifikasi"
        :value="formatCurrency(summary.pendingVerification)"
        icon="⏳"
      />

      <DashboardSummaryCard
        title="Terverifikasi Belum Bayar"
        :value="formatCurrency(summary.verifiedUnpaid)"
        icon="✓"
      />

      <DashboardSummaryCard
        title="Pembayaran Selesai"
        :value="formatCurrency(summary.paid)"
        icon="✅"
      />
    </div>

    <!-- Charts & Tables -->
    <div class="dashboard-middle">
      <!-- Expense Trend Chart -->
      <section class="chart-card">
        <div class="section-header">
          <h2>Tren Pengeluaran Bulanan</h2>
        </div>
        <div class="chart">
          <div
            v-for="item in monthlyExpenses"
            :key="item.month"
            class="chart-item"
          >
            <div class="bar-wrapper">
              <div
                class="bar"
                :style="{ height: `${item.percentage}%` }"
              ></div>
            </div>
            <span>{{ item.month }}</span>
            <span class="bar-value">{{ formatCurrency(item.value) }}</span>
          </div>
        </div>
      </section>

      <!-- Status Distribution -->
      <section class="status-card">
        <div class="section-header">
          <h2>Status Pengeluaran</h2>
        </div>
        <div class="status-grid">
          <div
            v-for="status in statusData"
            :key="status.label"
            class="status-item"
          >
            <div class="status-indicator" :class="status.class"></div>
            <div class="status-info">
              <span class="status-label">{{ status.label }}</span>
              <span class="status-count">{{ formatCurrency(status.value) }}</span>
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- Verification Queue -->
    <section class="queue-card">
      <div class="section-header">
        <h2>Antrean Verifikasi Pengeluaran</h2>
        <NuxtLink to="/finance/pengeluaran" class="view-all">Lihat Semua</NuxtLink>
      </div>
      <div class="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>Pegawai</th>
              <th>No. Perjalanan</th>
              <th>Tujuan</th>
              <th>Total</th>
              <th>Tanggal</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in verificationQueue" :key="item.id">
              <td>{{ index + 1 }}</td>
              <td>{{ item.employee }}</td>
              <td>{{ item.tripNumber }}</td>
              <td>{{ item.destination }}</td>
              <td>{{ formatCurrency(item.amount) }}</td>
              <td>{{ item.date }}</td>
              <td>
                <NuxtLink :to="`/finance/verifikasi/${item.id}`" class="detail-link">Verifikasi</NuxtLink>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- Recent Payments -->
    <section class="payments-card">
      <div class="section-header">
        <h2>Pembayaran Terbaru</h2>
        <NuxtLink to="/finance/pembayaran" class="view-all">Lihat Semua</NuxtLink>
      </div>
      <div class="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>No. Transaksi</th>
              <th>Pegawai</th>
              <th>Metode</th>
              <th>Nominal</th>
              <th>Tanggal</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in recentPayments" :key="item.id">
              <td>{{ index + 1 }}</td>
              <td>{{ item.refNumber }}</td>
              <td>{{ item.employee }}</td>
              <td>{{ item.method }}</td>
              <td>{{ formatCurrency(item.amount) }}</td>
              <td>{{ item.date }}</td>
              <td><span class="status-badge" :class="item.statusClass">{{ item.status }}</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DashboardSummaryCard from '~/components/dashboard/SummaryCard.vue'

const summary = ref({
  totalActual: 125000000,
  pendingVerification: 25000000,
  verifiedUnpaid: 45000000,
  paid: 55000000,
})

const monthlyExpenses = ref([
  { month: 'Jan', value: 15000000, percentage: 45 },
  { month: 'Feb', value: 18000000, percentage: 55 },
  { month: 'Mar', value: 22000000, percentage: 65 },
  { month: 'Apr', value: 19000000, percentage: 58 },
  { month: 'Mei', value: 25000000, percentage: 75 },
  { month: 'Jun', value: 26000000, percentage: 80 },
])

const statusData = ref([
  { label: 'Menunggu Verifikasi', value: 25000000, class: 'waiting' },
  { label: 'Terverifikasi', value: 45000000, class: 'verified' },
  { label: 'Sedang Dibayar', value: 10000000, class: 'processing' },
  { label: 'Selesai', value: 55000000, class: 'paid' },
])

const verificationQueue = ref([
  { id: 1, employee: 'Andi Saputra', tripNumber: 'TRV-2026-001', destination: 'Jakarta - Bandung', amount: 5500000, date: '20 Mei 2026' },
  { id: 2, employee: 'Sinta Maharani', tripNumber: 'TRV-2026-002', destination: 'Jakarta - Surabaya', amount: 8200000, date: '22 Mei 2026' },
  { id: 3, employee: 'Budi Santoso', tripNumber: 'TRV-2026-003', destination: 'Jakarta - Semarang', amount: 4800000, date: '24 Mei 2026' },
  { id: 4, employee: 'Dewi Lestari', tripNumber: 'TRV-2026-004', destination: 'Jakarta - Yogyakarta', amount: 6500000, date: '25 Mei 2026' },
])

const recentPayments = ref([
  { id: 1, refNumber: 'PAY-2026-001', employee: 'Andi Saputra', method: 'Transfer Bank', amount: 5500000, date: '15 Mei 2026', status: 'Selesai', statusClass: 'completed' },
  { id: 2, refNumber: 'PAY-2026-002', employee: 'Dewi Lestari', method: 'Transfer Bank', amount: 4800000, date: '18 Mei 2026', status: 'Selesai', statusClass: 'completed' },
  { id: 3, refNumber: 'PAY-2026-003', employee: 'Budi Santoso', method: 'Virtual Account', amount: 7200000, date: '20 Mei 2026', status: 'Diproses', statusClass: 'processing' },
  { id: 4, refNumber: 'PAY-2026-004', employee: 'Sinta Maharani', method: 'Transfer Bank', amount: 3500000, date: '22 Mei 2026', status: 'Selesai', statusClass: 'completed' },
])

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(value)
}
</script>

<style scoped>
.dashboard-page {
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

.dashboard-middle {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  margin-top: 24px;
}

.chart-card,
.status-card {
  flex: 1;
  min-width: 0;
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

.view-all:hover {
  text-decoration: underline;
}

.chart-card,
.status-card,
.queue-card,
.payments-card {
  padding: 20px;
  background: var(--white);
  border: 1px solid var(--border);
  border-radius: 12px;
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
  width: 24px;
  max-width: 100%;
  background: var(--primary);
  border-radius: 5px 5px 0 0;
  transition: height 0.2s ease;
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

.status-grid {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.status-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: #fafbfc;
  border-radius: 8px;
}

.status-indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  flex-shrink: 0;
}

.status-indicator.waiting { background: #f59e0b; }
.status-indicator.verified { background: #2563eb; }
.status-indicator.processing { background: #8b5cf6; }
.status-indicator.paid { background: #16a34a; }

.status-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex: 1;
}

.status-label {
  font-size: 12px;
  color: var(--text);
}

.status-count {
  font-size: 13px;
  font-weight: 600;
  color: var(--text);
}

.table-wrapper {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
}

thead {
  background: #f3f4f6;
}

th {
  padding: 10px 12px;
  text-align: left;
  font-size: 9px;
  font-weight: 600;
  color: #718096;
}

td {
  padding: 12px;
  border-bottom: 1px solid #e5e8ee;
  font-size: 10px;
  color: #344054;
  vertical-align: middle;
}

tbody tr:last-child td {
  border-bottom: none;
}

tbody tr:hover {
  background: #fafbfc;
}

.detail-link {
  color: var(--primary);
  font-weight: 500;
  text-decoration: none;
  font-size: 10px;
}

.detail-link:hover {
  text-decoration: underline;
}

.status-badge {
  display: inline-flex;
  align-items: center;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 9px;
  font-weight: 600;
  white-space: nowrap;
}

.status-badge.completed {
  background: #dff7ef;
  color: #18a77c;
}

.status-badge.processing {
  background: #fff3df;
  color: #ef9b16;
}

.status-badge.pending {
  background: #e8efff;
  color: var(--primary);
}

/* RESPONSIVE */
@media (max-width: 1023px) {
  .dashboard-page {
    padding: 22px;
  }

  .summary-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .dashboard-middle {
    flex-direction: column;
    align-items: stretch;
  }
}

@media (max-width: 767px) {
  .dashboard-page {
    padding: 16px;
  }

  .dashboard-header {
    margin-bottom: 18px;
  }

  .dashboard-header h1 {
    font-size: 21px;
  }

  .summary-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 12px;
  }

  .chart-card,
  .status-card,
  .queue-card,
  .payments-card {
    padding: 16px;
  }

  .chart {
    gap: 8px;
  }

  .bar {
    width: 16px;
  }

  th, td {
    padding: 8px 6px;
    font-size: 9px;
  }
}

@media (max-width: 540px) {
  .summary-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 374px) {
  .dashboard-page {
    padding: 12px;
  }
}
</style>