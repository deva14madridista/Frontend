<template>
  <div class="page">
    <!-- Breadcrumb -->
    <div class="breadcrumb">
      <NuxtLink to="/dashboard">Dashboard</NuxtLink>
      <span>›</span>
      <NuxtLink to="/finance/dashboard">Finance</NuxtLink>
      <span>›</span>
      <strong>Pengeluaran</strong>
    </div>

    <!-- Header -->
    <div class="page-header">
      <h1>Pengeluaran Perjalanan Dinas</h1>
    </div>

    <!-- Summary Stats -->
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon blue">💰</div>
        <div>
          <p>Total Pengeluaran</p>
          <h2>{{ formatCurrency(stats.total) }}</h2>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon orange">⏳</div>
        <div>
          <p>Menunggu Verifikasi</p>
          <h2>{{ formatCurrency(stats.pending) }}</h2>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon cyan">✓</div>
        <div>
          <p>Terverifikasi</p>
          <h2>{{ formatCurrency(stats.verified) }}</h2>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon green">✅</div>
        <div>
          <p>Sudah Dibayar</p>
          <h2>{{ formatCurrency(stats.paid) }}</h2>
        </div>
      </div>
    </div>

    <!-- Filter Card -->
    <div class="filter-card">
      <div class="filter-group search-group">
        <label>Cari Pegawai / No. Pengajuan</label>
        <div class="search-input">
          <svg viewBox="0 0 24 24"><path d="M10.5 4a6.5 6.5 0 1 0 4.08 11.56l4.43 4.43 1.41-1.41-4.43-4.43A6.5 6.5 0 0 0 10.5 4Zm0 2a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9Z"/></svg>
          <input v-model="search" type="text" placeholder="Cari..." />
        </div>
      </div>

      <div class="filter-group">
        <label>Periode</label>
        <select v-model="selectedPeriod">
          <option value="">Semua Periode</option>
          <option value="2026-05">Mei 2026</option>
          <option value="2026-04">April 2026</option>
          <option value="2026-03">Maret 2026</option>
        </select>
      </div>

      <div class="filter-group">
        <label>Status Verifikasi</label>
        <select v-model="selectedVerification">
          <option value="">Semua</option>
          <option value="pending">Menunggu</option>
          <option value="verified">Terverifikasi</option>
          <option value="rejected">Ditolak</option>
        </select>
      </div>

      <div class="filter-group">
        <label>Status Pembayaran</label>
        <select v-model="selectedPayment">
          <option value="">Semua</option>
          <option value="unpaid">Belum Dibayar</option>
          <option value="processing">Diproses</option>
          <option value="paid">Selesai</option>
        </select>
      </div>
    </div>

    <!-- Table Card -->
    <div class="table-card">
      <div class="table-wrapper">
        <table>
          <thead>
            <tr>
              <th class="no-column">No</th>
              <th>Pegawai</th>
              <th>No. Perjalanan</th>
              <th>Tujuan</th>
              <th>Estimasi</th>
              <th>Aktual</th>
              <th>Status Verifikasi</th>
              <th>Status Bayar</th>
              <th class="action-column">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in filteredExpenses" :key="item.id">
              <td>{{ index + 1 }}</td>
              <td>{{ item.employee }}</td>
              <td>{{ item.tripNumber }}</td>
              <td>{{ item.destination }}</td>
              <td>{{ formatCurrency(item.estimated) }}</td>
              <td>{{ formatCurrency(item.actual) }}</td>
              <td><span class="status-badge" :class="item.verificationClass">{{ item.verification }}</span></td>
              <td><span class="status-badge" :class="item.paymentClass">{{ item.payment }}</span></td>
              <td>
                <NuxtLink :to="`/finance/verifikasi/${item.id}`" class="detail-button">Detail</NuxtLink>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Mobile Cards -->
      <div class="expense-cards">
        <article v-for="(item, index) in filteredExpenses" :key="`card-${item.id}`" class="expense-card">
          <div class="expense-card-header">
            <span class="expense-card-number">#{{ index + 1 }}</span>
            <span class="status-badge" :class="item.verificationClass">{{ item.verification }}</span>
          </div>
          <div class="expense-card-title">{{ item.employee }}</div>
          <div class="expense-card-subtitle">{{ item.tripNumber }} - {{ item.destination }}</div>
          <dl class="expense-card-details">
            <div>
              <dt>Estimasi</dt>
              <dd>{{ formatCurrency(item.estimated) }}</dd>
            </div>
            <div>
              <dt>Aktual</dt>
              <dd>{{ formatCurrency(item.actual) }}</dd>
            </div>
            <div>
              <dt>Status Bayar</dt>
              <dd><span class="status-badge" :class="item.paymentClass">{{ item.payment }}</span></dd>
            </div>
          </dl>
          <div class="expense-card-actions">
            <NuxtLink :to="`/finance/verifikasi/${item.id}`" class="detail-button">Detail Verifikasi</NuxtLink>
          </div>
        </article>
        <p v-if="filteredExpenses.length === 0" class="empty-state">Tidak ada data pengeluaran.</p>
      </div>

      <!-- Pagination -->
      <div class="table-footer">
        <span class="showing-text">Menampilkan {{ filteredExpenses.length }} dari {{ expenses.length }} data</span>
        <div class="pagination">
          <button class="page-button active">1</button>
          <button class="page-button">2</button>
          <button class="page-button">3</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

const search = ref('')
const selectedPeriod = ref('')
const selectedVerification = ref('')
const selectedPayment = ref('')

const stats = ref({
  total: 125000000,
  pending: 25000000,
  verified: 45000000,
  paid: 55000000,
})

const expenses = ref([
  { id: 1, employee: 'Andi Saputra', tripNumber: 'TRV-2026-001', destination: 'Jakarta - Bandung', estimated: 5000000, actual: 5500000, verification: 'Menunggu', verificationClass: 'waiting', payment: 'Belum Dibayar', paymentClass: 'pending' },
  { id: 2, employee: 'Sinta Maharani', tripNumber: 'TRV-2026-002', destination: 'Jakarta - Surabaya', estimated: 8000000, actual: 8200000, verification: 'Terverifikasi', verificationClass: 'verified', payment: 'Diproses', paymentClass: 'processing' },
  { id: 3, employee: 'Budi Santoso', tripNumber: 'TRV-2026-003', destination: 'Jakarta - Semarang', estimated: 4500000, actual: 4800000, verification: 'Terverifikasi', verificationClass: 'verified', payment: 'Selesai', paymentClass: 'paid' },
  { id: 4, employee: 'Dewi Lestari', tripNumber: 'TRV-2026-004', destination: 'Jakarta - Yogyakarta', estimated: 6000000, actual: 6500000, verification: 'Ditolak', verificationClass: 'rejected', payment: '-', paymentClass: 'pending' },
  { id: 5, employee: 'Rudi Hartono', tripNumber: 'TRV-2026-005', destination: 'Jakarta - Medan', estimated: 12000000, actual: 11800000, verification: 'Terverifikasi', verificationClass: 'verified', payment: 'Selesai', paymentClass: 'paid' },
  { id: 6, employee: 'Maya Putri', tripNumber: 'TRV-2026-006', destination: 'Jakarta - Bali', estimated: 15000000, actual: 16200000, verification: 'Menunggu', verificationClass: 'waiting', payment: 'Belum Dibayar', paymentClass: 'pending' },
])

const filteredExpenses = computed(() => {
  return expenses.value.filter(expense => {
    const searchMatch = !search.value ||
      expense.employee.toLowerCase().includes(search.value.toLowerCase()) ||
      expense.tripNumber.toLowerCase().includes(search.value.toLowerCase())

    const periodMatch = !selectedPeriod.value
    const verificationMatch = !selectedVerification.value || expense.verificationClass === selectedVerification.value
    const paymentMatch = !selectedPayment.value || expense.paymentClass === selectedPayment.value

    return searchMatch && periodMatch && verificationMatch && paymentMatch
  })
})

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(value)
}
</script>

<style scoped>
.page {
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

/* STATS GRID */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;
  margin-bottom: 24px;
}

.stat-card {
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

.stat-icon {
  width: 36px; height: 36px;
  flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
  border-radius: 8px; font-size: 16px;
}

.stat-icon.blue { background: #e9f0ff; color: var(--primary); }
.stat-icon.orange { background: #fff3df; color: #f59e0b; }
.stat-icon.cyan { background: #e5f7fc; color: #0891b2; }
.stat-icon.green { background: #e3f8ef; color: #10b981; }

.stat-card > div:last-child { min-width: 0; }
.stat-card p { margin: 0 0 3px; font-size: 9px; color: #7b8799; }
.stat-card h2 { margin: 0; font-size: 15px; line-height: 1.1; color: var(--text); font-weight: 700; }

/* FILTER CARD */
.filter-card {
  display: grid;
  grid-template-columns: minmax(280px, 1fr) 195px 195px 195px;
  gap: 14px;
  padding: 16px;
  margin-bottom: 24px;
  background: var(--white);
  border: 1px solid var(--border);
  border-radius: 10px;
}

.filter-group { display: flex; flex-direction: column; gap: 6px; }
.filter-group label { font-size: 9px; font-weight: 600; color: #667085; }

.search-input, .date-input {
  height: 31px; display: flex; align-items: center;
  border: 1px solid #dce2eb; border-radius: 6px; background: var(--white);
}
.search-input svg, .date-input svg { width: 14px; height: 14px; margin: 0 8px; fill: #718096; flex-shrink: 0; }
.search-input input, .date-input input, .filter-group select {
  width: 100%; height: 31px; box-sizing: border-box;
  border: 1px solid #dce2eb; border-radius: 6px;
  background: var(--white); color: var(--text);
  outline: none; font-family: inherit; font-size: 10px;
}
.search-input input { border: none; }
.date-input input { border: none; padding: 0 0 0 4px; }
.filter-group select { padding: 0 10px; }
.search-input input:focus, .date-input input:focus, .filter-group select:focus { outline: none; }

/* TABLE */
.table-card {
  background: var(--white);
  border: 1px solid var(--border);
  border-radius: 11px;
  overflow: hidden;
}

.table-wrapper { padding: 18px; overflow-x: auto; }

table { width: 100%; border-collapse: collapse; table-layout: fixed; }
thead { background: #f3f4f6; }
th { padding: 10px 12px; text-align: left; font-size: 9px; font-weight: 600; color: #718096; }
td { padding: 14px 12px; border-bottom: 1px solid #e5e8ee; font-size: 10px; color: #344054; vertical-align: middle; }
tbody tr:last-child td { border-bottom: none; }
.no-column { width: 30px; }
.action-column { width: 70px; text-align: center; }

.status-badge {
  display: inline-flex; align-items: center;
  padding: 4px 9px; border-radius: 5px;
  font-size: 9px; font-weight: 600; white-space: nowrap;
}
.waiting, .pending { background: #fff3df; color: #ef9b16; }
.verified, .approved { background: #dff7ef; color: #18a77c; }
.rejected { background: #ffe8e8; color: #ef5350; }
.processing { background: #e8efff; color: var(--primary); }
.paid, .completed { background: #dff7ef; color: #18a77c; }

.detail-button, .detail-link {
  display: inline-block; margin: auto;
  border: none; background: transparent;
  color: #1769ff; font-family: inherit; font-size: 10px; font-weight: 600; cursor: pointer; text-decoration: none;
}
.detail-button:hover, .detail-link:hover { text-decoration: underline; }

/* MOBILE CARDS */
.expense-cards { display: none; }
.expense-card {
  padding: 14px; background: var(--white); border: 1px solid var(--border); border-radius: 10px;
}
.expense-card-header { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 8px; margin-bottom: 10px; }
.expense-card-number { font-size: 10px; color: #9aa4b5; }
.expense-card-title { display: block; color: var(--text); font-size: 14px; font-weight: 700; line-height: 1.35; }
.expense-card-subtitle { margin-top: 4px; font-size: 11px; color: var(--text-muted); }
.expense-card-details { display: grid; grid-template-columns: 1fr; gap: 8px; margin: 12px 0; }
.expense-card-details > div { display: flex; align-items: baseline; justify-content: space-between; gap: 12px; }
.expense-card-details dt { font-size: 10px; color: #8792a5; }
.expense-card-details dd { margin: 0; font-size: 11px; font-weight: 500; color: var(--text); text-align: right; }
.expense-card-actions { display: flex; justify-content: flex-end; padding-top: 10px; border-top: 1px solid #eef1f5; }
.expense-card-actions .detail-button { width: 100%; min-height: 40px; border: 1px solid var(--primary); border-radius: 7px; background: #f5f8ff; }

.empty-state { padding: 28px 16px; text-align: center; font-size: 12px; color: #8792a5; }

/* FOOTER */
.table-footer { display: flex; align-items: center; justify-content: space-between; padding: 12px 18px 18px; }
.showing-text { font-size: 9px; color: #718096; }
.pagination { display: flex; gap: 6px; }
.page-button { width: 25px; height: 25px; border: 1px solid #dce2eb; border-radius: 5px; background: var(--white); color: var(--text); font-family: inherit; font-size: 9px; cursor: pointer; }
.page-button.active { border-color: var(--primary); background: var(--primary); color: var(--white); }

/* RESPONSIVE */
@media (max-width: 1023px) {
  .page { padding: 20px; }
  .stats-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .filter-card { grid-template-columns: 1fr 1fr; }
  .search-group { grid-column: 1 / -1; }
  table { min-width: 0; table-layout: fixed; }
  th { padding: 9px 6px; } td { padding: 11px 6px; font-size: 9px; }
  .status-badge { padding: 3px 7px; font-size: 8.5px; }
  .detail-button { font-size: 9px; }
}

@media (max-width: 767px) {
  .page { padding: 16px; }
  .filter-card { grid-template-columns: 1fr; padding: 14px; gap: 12px; margin-bottom: 16px; }
  .page-header h1 { font-size: 20px; }
  .filter-group input, .filter-group select { font-size: 16px; }
  .date-input svg { display: none; }
  .table-wrapper { display: none; }
  .table-footer { flex-direction: column; align-items: flex-start; gap: 10px; padding: 0 14px 14px; }
  .pagination { flex-wrap: wrap; }
  .page-button { width: 36px; height: 36px; }
  .expense-cards { display: flex; flex-direction: column; gap: 12px; padding: 14px; }
  .table-card { border: none; background: transparent; overflow: visible; }
  .stats-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; }
  .stat-card { padding: 12px; gap: 10px; }
  .stat-card h2 { font-size: 14px; }
}

@media (max-width: 540px) {
  .stats-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}

@media (max-width: 374px) {
  .page { padding: 12px; }
  .stats-grid { grid-template-columns: 1fr; }
  .expense-cards { padding: 10px; }
}
</style>