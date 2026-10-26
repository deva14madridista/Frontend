<template>
  <div class="pegawai-pengeluaran-page">
    <!-- Breadcrumb -->
    <div class="breadcrumb">
      <NuxtLink to="/dashboard">Dashboard</NuxtLink>
      <span>›</span>
      <NuxtLink to="/pegawai/dashboard">Pegawai</NuxtLink>
      <span>›</span>
      <strong>Pengeluaran Perjalanan</strong>
    </div>

    <!-- Header -->
    <div class="page-header">
      <h1>Pengeluaran Perjalanan Saya</h1>
    </div>

    <!-- Summary -->
    <div class="summary">
      <div class="summary-item">
        <div class="summary-icon blue">💰</div>
        <div>
          <p>Total Pengeluaran</p>
          <h2>{{ formatCurrency(totalExpense) }}</h2>
        </div>
      </div>
      <div class="summary-item">
        <div class="summary-icon orange">⏳</div>
        <div>
          <p>Belum Diverifikasi</p>
          <h2>{{ formatCurrency(unverified) }}</h2>
        </div>
      </div>
      <div class="summary-item">
        <div class="summary-icon green">✅</div>
        <div>
          <p>Terverifikasi</p>
          <h2>{{ formatCurrency(verified) }}</h2>
        </div>
      </div>
    </div>

    <!-- Filter Card -->
    <div class="filter-card">
      <div class="filter-group search-group">
        <label>Cari Kategori / Keterangan</label>
        <div class="search-input">
          <svg viewBox="0 0 24 24"><path d="M10.5 4a6.5 6.5 0 1 0 4.08 11.56l4.43 4.43 1.41-1.41-4.43-4.43A6.5 6.5 0 0 0 10.5 4Zm0 2a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9Z"/></svg>
          <input v-model="search" type="text" placeholder="Cari..." />
        </div>
      </div>

      <div class="filter-group">
        <label>Kategori</label>
        <select v-model="selectedCategory">
          <option value="">Semua</option>
          <option value="Transportasi">Transportasi</option>
          <option value="Makanan">Makanan</option>
          <option value="Penginapan">Penginapan</option>
          <option value="Tiket">Tiket</option>
          <option value="Lainnya">Lainnya</option>
        </select>
      </div>

      <div class="filter-group">
        <label>Status</label>
        <select v-model="selectedStatus">
          <option value="">Semua</option>
          <option value="menunggu">Menunggu Verifikasi</option>
          <option value="verifikasi">Terverifikasi</option>
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
              <th>Kategori</th>
              <th>Tanggal Transaksi</th>
              <th>Nominal</th>
              <th>Keterangan</th>
              <th>Bukti</th>
              <th class="action-column">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(expense, index) in filteredExpenses" :key="expense.id">
              <td>{{ index + 1 }}</td>
              <td>{{ expense.category }}</td>
              <td>{{ expense.date }}</td>
              <td>{{ formatCurrency(expense.amount) }}</td>
              <td>{{ expense.keterangan }}</td>
              <td>
                <div v-if="expense.bukti" class="file-name">
                  <span>{{ expense.bukti }}</span>
                </div>
                <span v-else class="no-file">Belum ada file</span>
              </td>
              <td>
                <NuxtLink class="detail-button">Detail</NuxtLink>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Mobile Cards -->
      <div class="expense-cards">
        <article v-for="(expense, index) in filteredExpenses" :key="`card-${expense.id}`" class="expense-card">
          <div class="expense-card-header">
            <span class="expense-card-number">#{{ index + 1 }}</span>
            <span class="status-badge" v-if="expense.status === 'verified'">Terverifikasi</span>
          </div>
          <div class="expense-card-title">{{ expense.category }}</div>
          <div class="expense-card-subtitle">{{ expense.date }}</div>
          <dl class="expense-card-details">
            <div>
              <dt>Nominal</dt>
              <dd>{{ formatCurrency(expense.amount) }}</dd>
            </div>
            <div>
              <dt>Keterangan</dt>
              <dd>{{ expense.keterangan }}</dd>
            </div>
            <div v-if="expense.bukti">
              <dt>Bukti Transaksi</dt>
              <dd>{{ expense.bukti }}</dd>
            </div>
          </dl>
          <div class="expense-card-actions">
            <NuxtLink class="detail-button">Detail</NuxtLink>
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
const selectedCategory = ref('')
const selectedStatus = ref('')

const expenses = ref([
  { id: 1, category: 'Transportasi', date: '10 Mei 2026', amount: 500000, keterangan: 'Tiket pesawat Jakarta-Surabaya', status: 'verified', bukti: 'tiket.pdf' },
  { id: 2, category: 'Makanan', date: '11 Mei 2026', amount: 250000, keterangan: 'Makan siang selama perjalanan', status: 'verified', bukti: '' },
  { id: 3, category: 'Penginapan', date: '12 Mei 2026', amount: 750000, keterangan: 'Hotel 1 malam Bandung', status: 'menunggu', bukti: '' },
  { id: 4, category: 'Tiket', date: '13 Mei 2026', amount: 300000, keterangan: 'Tiket kereta api', status: 'verified', bukti: 'tiket.pdf' },
  { id: 5, category: 'Lainnya', date: '14 Mei 2026', amount: 100000, keterangan: 'Biaya administrasi', status: 'menunggu', bukti: '' },
])

const filteredExpenses = computed(() => {
  return expenses.value.filter(exp => {
    const searchMatch = !search.value ||
      exp.category.toLowerCase().includes(search.value.toLowerCase()) ||
      exp.keterangan.toLowerCase().includes(search.value.toLowerCase())

    const categoryMatch = !selectedCategory.value || exp.category === selectedCategory.value
    const statusMatch = !selectedStatus.value || exp.status === selectedStatus.value

    return searchMatch && categoryMatch && statusMatch
  })
})

// Computed values
const totalExpense = computed(() => expenses.value.reduce((sum, e) => sum + e.amount, 0))
const unverified = computed(() => expenses.value.filter(e => e.status === 'menunggu').reduce((sum, e) => sum + e.amount, 0))
const verified = computed(() => expenses.value.filter(e => e.status === 'verified').reduce((sum, e) => sum + e.amount, 0))

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(value)
}
</script>

<style scoped>
.pegawai-pengeluaran-page {
  width: 100%;
  min-height: calc(100vh - 70px);
  padding: 24px 28px;
  background: #f5f6f8;
}

.breadcrumb {
  display: flex; align-items: center; gap: 8px; margin-bottom: 4px; font-size: 9px; color: #9aa4b5;
}
.breadcrumb a { color: #9aa4b5; text-decoration: none; }
.breadcrumb a:hover { color: var(--primary); }
.breadcrumb strong { color: var(--text); font-weight: 600; }

.page-header { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; margin-bottom: 24px; }
.page-header h1 { margin: 0; font-size: 23px; font-weight: 700; color: var(--text); }

/* SUMMARY */
.summary { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; margin-bottom: 24px; }
.summary-item { min-width: 0; min-height: 78px; display: flex; align-items: center; gap: 12px; padding: 14px; background: var(--white); border: 1px solid var(--border); border-radius: 9px; }
.summary-icon { width: 36px; height: 36px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; border-radius: 8px; font-size: 16px; }
.summary-icon.blue { background: #e9f0ff; color: var(--primary); }
.summary-icon.orange { background: #fff3df; color: #f59e0b; }
.summary-icon.green { background: #e3f8ef; color: #16a34a; }
.summary-item > div:last-child { min-width: 0; }
.summary-item p { margin: 0 0 3px; font-size: 9px; color: #7b8799; }
.summary-item h2 { margin: 0; font-size: 15px; line-height: 1.1; color: var(--text); font-weight: 700; }

/* FILTER CARD */
.filter-card { display: grid; grid-template-columns: minmax(280px, 1fr) 195px 195px; gap: 14px; padding: 16px; margin-bottom: 24px; background: var(--white); border: 1px solid var(--border); border-radius: 10px; }
.filter-group { display: flex; flex-direction: column; gap: 6px; }
.filter-group label { font-size: 9px; font-weight: 600; color: #667085; }
.search-input, .date-input { height: 31px; display: flex; align-items: center; border: 1px solid #dce2eb; border-radius: 6px; background: var(--white); }
.search-input svg, .date-input svg { width: 14px; height: 14px; margin: 0 8px; fill: #718096; flex-shrink: 0; }
.search-input input, .date-input input, .filter-group select { width: 100%; height: 31px; box-sizing: border-box; border: 1px solid #dce2eb; border-radius: 6px; background: var(--white); color: var(--text); outline: none; font-family: inherit; font-size: 10px; }
.search-input input { border: none; }
.date-input input { border: none; padding: 0 0 0 4px; }
.filter-group select { padding: 0 10px; }
.search-input input:focus, .date-input input:focus, .filter-group select:focus { outline: none; }

/* TABLE */
.table-card { background: var(--white); border: 1px solid var(--border); border-radius: 11px; overflow: hidden; }
.table-wrapper { padding: 18px; overflow-x: auto; }
table { width: 100%; border-collapse: collapse; table-layout: fixed; }
thead { background: #f3f4f6; }
th { padding: 10px 12px; text-align: left; font-size: 9px; font-weight: 600; color: #718096; }
td { padding: 14px 12px; border-bottom: 1px solid #e5e8ee; font-size: 10px; color: #344054; vertical-align: middle; }
tbody tr:last-child td { border-bottom: none; }
.no-column { width: 30px; }
.action-column { width: 70px; text-align: center; }

.status-badge { display: inline-flex; align-items: center; padding: 4px 9px; border-radius: 5px; font-size: 9px; font-weight: 600; white-space: nowrap; }
.waiting { background: #fff3df; color: #ef9b16; }
.verified { background: #dff7ef; color: #18a77c; }

.detail-button { display: inline-block; margin: auto; border: none; background: transparent; color: #1769ff; font-family: inherit; font-size: 10px; font-weight: 600; cursor: pointer; text-decoration: none; }
.detail-button:hover { text-decoration: underline; }

/* MOBILE CARDS */
.expense-cards { display: none; }
.expense-card { padding: 14px; background: var(--white); border: 1px solid var(--border); border-radius: 10px; }
.expense-card-header { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 8px; margin-bottom: 10px; }
.expense-card-number { font-size: 10px; color: #9aa4b5; }
.expense-card-title { display: block; color: var(--text); font-size: 14px; font-weight: 700; line-height: 1.35; overflow-wrap: anywhere; }
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
@media (max-width: 1023px) { .pegawai-pengeluaran-page { padding: 20px; } table { min-width: 0; table-layout: fixed; } th { padding: 9px 6px; } td { padding: 11px 6px; font-size: 9px; } .status-badge { padding: 3px 7px; font-size: 8.5px; } .detail-button { font-size: 9px; } }

@media (max-width: 767px) { .pegawai-pengeluaran-page { padding: 16px; } .filter-card { grid-template-columns: 1fr; padding: 14px; gap: 12px; margin-bottom: 16px; } .page-header h1 { font-size: 20px; } .filter-group input, .filter-group select { font-size: 16px; } .table-wrapper { display: none; } .table-footer { flex-direction: column; align-items: flex-start; gap: 10px; padding: 0 14px 14px; } .pagination { flex-wrap: wrap; } .expense-cards { display: flex; flex-direction: column; gap: 12px; padding: 14px; } .table-card { border: none; background: transparent; overflow: visible; } .summary { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; } .summary-item { padding: 12px; gap: 10px; } .summary-item h2 { font-size: 14px; } .stats-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } .expense-card { padding: 12px; } .empty-state { padding: 20px 12px; font-size: 11px; } }

@media (max-width: 540px) { .summary { grid-template-columns: 1fr; } }

@media (max-width: 374px) { .pegawai-pengeluaran-page { padding: 12px; } }
</style>