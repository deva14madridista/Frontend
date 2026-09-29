<template>
  <div class="report-page">

    <!-- Breadcrumb -->
    <div class="breadcrumb">
      <NuxtLink to="/dashboard">Dashboard</NuxtLink>
      <span>›</span>
      <strong>Laporan</strong>
    </div>

    <!-- Header -->
    <div class="page-header">
      <h1>Laporan Perjalanan</h1>

      <LayoutPageActions />
    </div>

    <!-- Filter -->
    <div class="filter-section">

      <select v-model="selectedYear">
        <option value="2026">Tahun 2026</option>
        <option value="2025">Tahun 2025</option>
        <option value="2024">Tahun 2024</option>
      </select>

      <select v-model="selectedDepartment">
        <option value="Marketing">Departemen: Marketing</option>
        <option value="Sales">Departemen: Sales</option>
        <option value="HRD">Departemen: HRD</option>
        <option value="Finance">Departemen: Finance</option>
      </select>

      <button
        class="export-button"
        @click="exportReport"
      >
        ↓
        Ekspor Laporan
      </button>

    </div>

    <!-- Summary Cards -->
    <div class="summary-grid">

      <div class="summary-card">
        <div class="summary-icon blue">
          ✈
        </div>

        <div>
          <p>Total Perjalanan</p>
          <h2>42</h2>
        </div>
      </div>

      <div class="summary-card">
        <div class="summary-icon green">
          ▤
        </div>

        <div>
          <p>Total Biaya</p>
          <h2>
            <span>Rp</span>
            54.250.000
          </h2>
        </div>
      </div>

      <div class="summary-card">
        <div class="summary-icon cyan">
          ▤
        </div>

        <div>
          <p>Rata-rata Biaya</p>
          <h2>
            Rp 1.291.666
          </h2>
        </div>
      </div>

      <div class="summary-card">
        <div class="summary-icon orange">
          ││
        </div>

        <div>
          <p>Perjalanan Bulan Ini</p>
          <h2>12</h2>
        </div>
      </div>

    </div>

    <!-- Main Content -->
    <div class="report-content">

      <!-- Chart -->
      <section class="expense-card">

        <div class="section-header">
          <h2>Pengeluaran per Bulan</h2>
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
                :style="{ height: `${item.value}px` }"
              ></div>
            </div>

            <span>{{ item.month }}</span>

          </div>

        </div>

        <div class="chart-footer">
          <span>S6 Kuartal Pertama 2026</span>

          <button>
            Detail Biaya
          </button>
        </div>

      </section>

      <!-- Report History -->
      <section class="history-card">

        <h2>Riwayat Laporan</h2>

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

              <tr
                v-for="report in reports"
                :key="report.id"
              >

                <td>{{ report.id }}</td>

                <td>
                  <strong>
                    {{ report.name }}
                  </strong>
                </td>

                <td>
                  {{ report.period }}
                </td>

                <td>
                  {{ report.date }}
                </td>

                <td>
                  <div class="table-actions">

                    <button
                      title="Download"
                      @click="downloadReport(report)"
                    >
                      ↓
                    </button>

                    <button
                      title="Lihat"
                      @click="viewReport(report)"
                    >
                      ◉
                    </button>

                  </div>
                </td>

              </tr>

            </tbody>

          </table>

        </div>

      </section>

    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'

const selectedYear = ref('2026')
const selectedDepartment = ref('Marketing')

const monthlyExpenses = [
  {
    month: 'Jan',
    value: 45
  },
  {
    month: 'Feb',
    value: 90
  },
  {
    month: 'Mar',
    value: 68
  },
  {
    month: 'Apr',
    value: 110
  },
  {
    month: 'Mei',
    value: 140
  },
  {
    month: 'Jun',
    value: 80
  }
]

const reports = [
  {
    id: 1,
    name: 'Laporan Perjalanan Dinas Q1',
    period: 'Jan - Mar 2026',
    date: '10 Apr 2026'
  },
  {
    id: 2,
    name: 'Evaluasi Tahunan Vendor Transport',
    period: 'Tahunan 2025',
    date: '15 Jan 2026'
  },
  {
    id: 3,
    name: 'Klaim Hotel Luar Kota - Mei',
    period: 'Mei 2026',
    date: '01 Jun 2026'
  },
  {
    id: 4,
    name: 'Rekap Tiket Kereta Api Sales',
    period: 'Apr 2026',
    date: '05 Mei 2026'
  }
]

const exportReport = () => {
  console.log(
    'Export laporan:',
    selectedYear.value,
    selectedDepartment.value
  )

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
/* =========================
   PAGE
========================= */

.report-page {
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

  margin-bottom: 20px;
}

.page-header h1 {
  margin: 0;

  font-size: 23px;

  font-weight: 700;

  color: var(--text);
}

/* =========================
   FILTER
========================= */

.filter-section {
  display: flex;
  align-items: center;

  gap: 12px;

  margin-bottom: 24px;
}

.filter-section select {
  height: 30px;

  padding: 0 12px;

  border: 1px solid #dce2eb;

  border-radius: 6px;

  background: var(--white);

  color: #475569;

  font-family: inherit;

  font-size: 9px;

  outline: none;
}

.export-button {
  height: 30px;

  display: flex;
  align-items: center;

  gap: 7px;

  margin-left: auto;

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

.export-button:hover {
  opacity: 0.9;
}

/* =========================
   SUMMARY
========================= */

.summary-grid {
  display: grid;

  grid-template-columns: repeat(4, 1fr);

  gap: 14px;

  margin-bottom: 24px;
}

.summary-card {
  min-height: 78px;

  display: flex;
  align-items: center;

  gap: 12px;

  padding: 14px;

  box-sizing: border-box;

  background: var(--white);

  border: 1px solid var(--border);

  border-radius: 9px;
}

.summary-icon {
  width: 36px;
  height: 36px;

  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 8px;

  font-size: 16px;
}

.summary-icon.blue {
  background: #e9f0ff;
  color: var(--primary);
}

.summary-icon.green {
  background: #e3f8ef;
  color: #10b981;
}

.summary-icon.cyan {
  background: #e5f7fc;
  color: #0891b2;
}

.summary-icon.orange {
  background: #fff3df;
  color: #f59e0b;
}

.summary-card p {
  margin: 0 0 3px;

  font-size: 9px;

  color: #7b8799;
}

.summary-card h2 {
  margin: 0;

  font-size: 17px;

  line-height: 1.1;

  color: var(--text);

  font-weight: 700;
}

.summary-card h2 span {
  font-size: 11px;
}

/* =========================
   CONTENT
========================= */

.report-content {
  display: grid;

  grid-template-columns: minmax(0, 1fr) minmax(0, 1.35fr);

  gap: 18px;
}

/* =========================
   EXPENSE
========================= */

.expense-card,
.history-card {
  padding: 16px;

  background: var(--white);

  border: 1px solid var(--border);

  border-radius: 10px;
}

.expense-card h2,
.history-card h2 {
  margin: 0;

  font-size: 14px;

  font-weight: 700;

  color: var(--text);
}

/* =========================
   CHART
========================= */

.chart {
  height: 185px;

  display: flex;
  align-items: flex-end;

  gap: 10px;

  margin-top: 18px;
}

.chart-item {
  flex: 1;

  height: 100%;

  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: flex-end;

  gap: 7px;
}

.bar-wrapper {
  width: 100%;
  height: 145px;

  display: flex;
  align-items: flex-end;
  justify-content: center;
}

.bar {
  width: 70%;

  max-width: 40px;

  min-height: 15px;

  border-radius: 4px 4px 0 0;

  background: var(--primary);
}

.chart-item span {
  font-size: 8px;

  color: #7b8799;
}

.chart-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-top: 12px;

  font-size: 8px;

  color: #9aa4b5;
}

.chart-footer button {
  padding: 0;

  border: none;

  background: transparent;

  color: var(--primary);

  font-family: inherit;

  font-size: 8px;

  cursor: pointer;
}

/* =========================
   TABLE
========================= */

.table-wrapper {
  margin-top: 12px;

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
  padding: 8px;

  text-align: left;

  font-size: 8px;

  font-weight: 600;

  color: #718096;
}

td {
  padding: 11px 8px;

  border-bottom: 1px solid #e5e8ee;

  font-size: 8px;

  color: #718096;

  vertical-align: middle;
}

tbody tr:last-child td {
  border-bottom: none;
}

td strong {
  display: block;

  color: var(--text);

  font-size: 8px;

  line-height: 1.3;
}

th:first-child,
td:first-child {
  width: 25px;
}

th:nth-child(2) {
  width: 34%;
}

th:nth-child(3) {
  width: 23%;
}

th:nth-child(4) {
  width: 25%;
}

th:last-child,
td:last-child {
  width: 40px;

  text-align: center;
}

/* =========================
   TABLE ACTION
========================= */

.table-actions {
  display: flex;
  align-items: center;
  justify-content: center;

  gap: 8px;
}

.table-actions button {
  padding: 0;

  border: none;

  background: transparent;

  color: var(--primary);

  font-size: 11px;

  cursor: pointer;
}

.table-actions button:last-child {
  color: #64748b;
}

/* =========================
   RESPONSIVE
========================= */

@media (max-width: 1000px) {
  .summary-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .report-content {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 650px) {
  .report-page {
    padding: 16px;
  }

  .filter-section {
    flex-wrap: wrap;
  }

  .export-button {
    margin-left: 0;
  }

  .summary-grid {
    grid-template-columns: 1fr;
  }
}
</style>