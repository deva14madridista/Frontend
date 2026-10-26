<template>
  <div class="report-page">
    <!-- Breadcrumb -->
    <div class="breadcrumb">
      <NuxtLink to="/dashboard">Dashboard</NuxtLink>
      <span>›</span>
      <NuxtLink to="/finance/dashboard">Finance</NuxtLink>
      <span>›</span>
      <strong>Laporan</strong>
    </div>

    <!-- Header -->
    <div class="page-header">
      <h1>Laporan Keuangan</h1>
    </div>

    <!-- Summary Stats -->
    <div class="summary-grid">
      <div class="summary-card">
        <div class="summary-icon blue">
          ✈
        </div>
        <div>
          <p>Total Pengeluaran</p>
          <h2>{{ formatCurrency(totalExpenses) }}</h2>
        </div>
      </div>
      <div class="summary-card">
        <div class="summary-icon green">
          ▤
        </div>
        <div>
          <p>Total Pembayaran</p>
          <h2>{{ formatCurrency(totalPayments) }}</h2>
        </div>
      </div>
      <div class="summary-card">
        <div class="summary-icon cyan">
          ▤
        </div>
        <div>
          <p>Total Sisa Belum Dibayar</p>
          <h2>{{ formatCurrency(unpaidAmount) }}</h2>
        </div>
      </div>
      <div class="summary-card">
        <div class="summary-icon orange">
          ││
        </div>
        <div>
          <p>Total Estimasi</p>
          <h2>{{ formatCurrency(totalEstimates) }}</h2>
        </div>
      </div>
    </div>

    <!-- Filter -->
    <div class="filter-section">
      <select v-model="selectedYear">
        <option value="2026">Tahun 2026</option>
        <option value="2025">Tahun 2025</option>
        <option value="2024">Tahun 2024</option>
      </select>

      <select v-model="selectedDepartment">
        <option value="Semua">Semua Departemen</option>
        <option value="Marketing">Departemen: Marketing</option>
        <option value="Sales">Departemen: Sales</option>
        <option value="HRD">Departemen: HRD</option>
        <option value="Finance">Departemen: Finance</option>
      </select>

      <button class="export-button" @click="exportReport">
        ↓ Ekspor Laporan
      </button>
    </div>

    <!-- Chart Section -->
    <section class="expense-card">
      <div class="section-header">
        <h2>Pengeluaran per Bulan</h2>
      </div>
      <div class="chart">
        <div v-for="item in monthlyExpenses" :key="item.month" class="chart-item">
          <div class="bar-wrapper">
            <div class="bar" :style="{ height: `${item.percentage}%` }"></div>
          </div>
          <span>{{ item.month }}</span>
          <span class="bar-value">{{ formatCurrency(item.value) }}</span>
        </div>
      </div>
      <div class="chart-footer">
        <span>S6 Kuartal Pertama 2026</span>
        <button>Detail Biaya</button>
      </div>
    </section>

    <!-- Report History -->
    <section class="history-card">
      <h2>Riwayat Laporan Keuangan</h2>

      <div class="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>Nama Laporan</th>
              <th>Periode</th>
              <th>Tanggal Dibuat</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="report in reports" :key="report.id">
              <td>{{ report.id }}</td>
              <td>
                <strong>{{ report.name }}</strong>
              </td>
              <td>{{ report.period }}</td>
              <td>{{ report.date }}</td>
              <td>
                <div class="table-actions">
                  <button title="Download" @click="downloadReport(report)">↓</button>
                  <button title="Lihat" @click="viewReport(report)">◉</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Mobile cards -->
      <div class="report-cards">
        <article v-for="report in reports" :key="`card-${report.id}`" class="report-card">
          <div class="report-card-header">
            <span class="report-card-number">Laporan #{{ report.id }}</span>
            <span class="report-card-period">{{ report.period }}</span>
          </div>

          <h3 class="report-card-title">{{ report.name }}</h3>

          <dl class="report-card-details">
            <div>
              <dt>Periode</dt>
              <dd>{{ report.period }}</dd>
            </div>

            <div>
              <dt>Tanggal Dibuat</dt>
              <dd>{{ report.date }}</dd>
            </div>
          </dl>

          <div class="report-card-actions">
            <button type="button" @click="downloadReport(report)">↓ Download</button>
            <button type="button" @click="viewReport(report)">◉ Lihat</button>
          </div>
        </article>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const selectedYear = ref('2026')
const selectedDepartment = ref('Semua')

const reports = ref([
  { id: 1, name: 'Laporan Keuangan Q1 2026', period: 'Jan - Mar 2026', date: '10 Apr 2026' },
  { id: 2, name: 'Evaluasi Tahunan Vendor Transport', period: 'Tahunan 2025', date: '15 Jan 2026' },
  { id: 3, name: 'Klaim Hotel Luar Kota - Mei', period: 'Mei 2026', date: '01 Jun 2026' },
  { id: 4, name: 'Rekap Tiket Kereta Api Sales', period: 'Apr 2026', date: '05 Mei 2026' },
])

const monthlyExpenses = ref([
  { month: 'Jan', value: 45000000, percentage: 45 },
  { month: 'Feb', value: 90000000, percentage: 55 },
  { month: 'Mar', value: 68000000, percentage: 65 },
  { month: 'Apr', value: 110000000, percentage: 75 },
  { month: 'Mei', value: 140000000, percentage: 85 },
  { month: 'Jun', value: 80000000, percentage: 60 },
])

// Computed values
const totalExpenses = computed(() => monthlyExpenses.value.reduce((sum, item) => sum + item.value, 0))
const totalPayments = computed(() => 125000000) // Mock data
const unpaidAmount = computed(() => totalExpenses.value - totalPayments.value)
const totalEstimates = computed(() => 150000000)

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(value)
}

const exportReport = () => {
  console.log('Export laporan:', selectedYear.value, selectedDepartment.value)
  alert('Laporan sedang diproses untuk diekspor.')
}

const downloadReport = (report) => {
  console.log('Download:', report)
}

const viewReport = (report) => {
  console.log('Lihat laporan:', report)
}
</script>

<style scoped>
.report-page {
  width: 100%;
  min-height: calc(100vh - 70px);
  padding: 24px 28px;
  background: #f5f6f8;
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
  font-size: 9px;
  color: #9aa4b5;
}

.breadcrumb a { color: #9aa4b5; text-decoration: none; }
.breadcrumb a:hover { color: var(--primary); }
.breadcrumb strong { color: var(--text); font-weight: 600; }

.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 24px;
}

.page-header h1 { margin: 0; font-size: 23px; font-weight: 700; color: var(--text); }

/* SUMMARY GRID */
.summary-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;
  margin-bottom: 24px;
}

.summary-card {
  min-width: 0;
  min-height: 78px;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px;
  background: var(--white);
  border: 1px solid var(--border);
  border-radius: 9px;
}

.summary-icon {
  width: 36px; height: 36px;
  flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
  border-radius: 8px; font-size: 16px;
}

.summary-icon.blue { background: #e9f0ff; color: var(--primary); }
.summary-icon.green { background: #e3f8ef; color: #10b981; }
.summary-icon.cyan { background: #e5f7fc; color: #0891b2; }
.summary-icon.orange { background: #fff3df; color: #f59e0b; }

.summary-card > div:last-child { min-width: 0; }
.summary-card p { margin: 0 0 3px; font-size: 9px; color: #7b8799; }
.summary-card h2 { margin: 0; font-size: 17px; line-height: 1.1; color: var(--text); font-weight: 700; }

/* FILTER */
.filter-section {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
}

.filter-section select {
  height: 30px; padding: 0 12px;
  border: 1px solid #dce2eb; border-radius: 6px;
  background: var(--white); color: #475569;
  font-family: inherit; font-size: 9px; outline: none;
}

.export-button {
  height: 30px;
  display: flex; align-items: center; justify-content: center;
  gap: 7px; margin-left: auto;
  padding: 0 15px;
  border: none; border-radius: 6px;
  background: var(--primary); color: var(--white);
  font-family: inherit; font-size: 9px; font-weight: 600; cursor: pointer;
}

.export-button:hover { opacity: 0.9; }

/* CHART SECTION */
.expense-card {
  padding: 16px; background: var(--white); border: 1px solid var(--border); border-radius: 10px;
}

.expense-card h2 { margin: 0; font-size: 14px; font-weight: 700; color: var(--text); }

.chart {
  height: 185px; display: flex; align-items: flex-end; gap: 10px; margin-top: 18px;
}

.chart-item { flex: 1; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: flex-end; gap: 7px; }

.bar-wrapper { width: 100%; height: 145px; display: flex; align-items: flex-end; justify-content: center; }

.bar { width: 70%; max-width: 40px; min-height: 15px; border-radius: 4px 4px 0 0; background: var(--primary); }

.chart-item span { font-size: 8px; color: #7b8799; }

.chart-footer { display: flex; align-items: center; justify-content: space-between; margin-top: 12px; font-size: 8px; color: #9aa4b5; }

.chart-footer button { padding: 0; border: none; background: transparent; color: var(--primary); font-family: inherit; font-size: 8px; cursor: pointer; }

/* HISTORY CARD */
.history-card { padding: 16px; background: var(--white); border: 1px solid var(--border); border-radius: 10px; }

.history-card h2 { margin: 0; font-size: 14px; font-weight: 700; color: var(--text); }

.table-wrapper { margin-top: 12px; overflow-x: auto; }

table { width: 100%; border-collapse: collapse; table-layout: fixed; }
thead { background: #f3f4f6; }
th { padding: 8px; text-align: left; font-size: 8px; font-weight: 600; color: #718096; }
td { padding: 11px 8px; border-bottom: 1px solid #e5e8ee; font-size: 8px; color: #718096; vertical-align: middle; }
tbody tr:last-child td { border-bottom: none; }
td strong { display: block; color: var(--text); font-size: 8px; line-height: 1.3; }

/* TABLE ACTIONS */
.table-actions { display: flex; align-items: center; justify-content: center; gap: 8px; }

.table-actions button { padding: 0; border: none; background: transparent; color: var(--primary); font-size: 11px; cursor: pointer; }
.table-actions button:last-child { color: #64748b; }

/* MOBILE CARDS */
.report-cards { display: none; }

.report-card { padding: 14px; background: var(--white); border: 1px solid var(--border); border-radius: 10px; }

.report-card-header { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 6px; margin-bottom: 8px; }

.report-card-number { font-size: 10px; color: #9aa4b5; }

.report-card-title { margin: 0; font-size: 13px; font-weight: 700; line-height: 1.4; color: var(--text); overflow-wrap: anywhere; }

.report-card-details { display: grid; gap: 7px; margin: 12px 0; }

.report-card-details > div { display: flex; align-items: baseline; justify-content: space-between; gap: 12px; }

.report-card-details dt { font-size: 10px; color: #8792a5; }

.report-card-details dd { margin: 0; font-size: 11px; color: var(--text); text-align: right; }

.report-card-actions { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; padding-top: 10px; border-top: 1px solid #eef1f5; }

.report-card-actions button { min-height: 40px; border: 1px solid var(--primary); border-radius: 7px; background: #f5f8ff; color: var(--primary); font-family: inherit; font-size: 12px; font-weight: 600; cursor: pointer; }

.report-card-actions button:last-child { background: var(--primary); color: var(--white); }

/* RESPONSIVE */
@media (max-width: 1000px) {
  .summary-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .report-content { grid-template-columns: 1fr; }
  .page { padding: 20px; }
}

@media (max-width: 767px) {
  .report-page { padding: 16px; }
  .filter-section { flex-wrap: wrap; gap: 10px; margin-bottom: 18px; }
  .filter-section select { flex: 1 1 150px; min-width: 0; height: 40px; font-size: 16px; }
  .export-button { flex: 1 1 100%; height: 40px; margin-left: 0; font-size: 12px; }
  .summary-grid { gap: 10px; margin-bottom: 18px; }
  .summary-card { padding: 12px; gap: 10px; }
  .summary-card h2 { font-size: 15px; overflow-wrap: anywhere; }
  .report-card h2 { font-size: 15px; overflow-wrap: anywhere; }
  .chart { gap: 6px; }
  .bar { width: 50px; }
  .table-wrapper { display: none; }
  .report-cards { display: flex; flex-direction: column; gap: 12px; margin-top: 14px; }
  .report-card { padding: 14px; }
  .report-card-actions button { height: 40px; padding: 0 4px; font-size: 11px; }
  .report-card-actions button:last-child { height: 40px; padding: 0 4px; font-size: 11px; }
}

@media (max-width: 540px) {
  .filter-section select { flex: 1 1 100%; }
  .summary-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}

@media (max-width: 374px) {
  .report-page { padding: 12px; }
  .summary-grid { grid-template-columns: 1fr; }
  .summary-card h2 { font-size: 17px; }
}
</style>