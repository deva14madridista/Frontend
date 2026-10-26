<template>
  <div class="page">
    <!-- Breadcrumb -->
    <div class="breadcrumb">
      <NuxtLink to="/dashboard">Dashboard</NuxtLink>
      <span>›</span>
      <NuxtLink to="/finance/dashboard">Finance</NuxtLink>
      <span>›</span>
      <strong>Pembayaran</strong>
    </div>

    <!-- Header -->
    <div class="page-header">
      <h1>Pembayaran Pengeluaran</h1>
    </div>

    <!-- Summary Stats -->
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon cyan">▣</div>
        <div>
          <p>Menunggu Pembayaran</p>
          <h2>{{ formatCurrency(pendingCount) }}</h2>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon green">✅</div>
        <div>
          <p>Selesai Dibayar</p>
          <h2>{{ formatCurrency(paidCount) }}</h2>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon blue">💰</div>
        <div>
          <p>Total Pembayaran</p>
          <h2>{{ formatCurrency(totalPayments) }}</h2>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon purple">📋</div>
        <div>
          <p>Terkonfirmasi</p>
          <h2>{{ formatCurrency(confirmedCount) }}</h2>
        </div>
      </div>
    </div>

    <!-- Filter Card -->
    <div class="filter-card">
      <div class="filter-group search-group">
        <label>Cari Transaksi / Pegawai</label>
        <div class="search-input">
          <svg viewBox="0 0 24 24"><path d="M10.5 4a6.5 6.5 0 1 0 4.08 11.56l4.43 4.43 1.41-1.41-4.43-4.43A6.5 6.5 0 0 0 10.5 4Zm0 2a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9Z"/></svg>
          <input v-model="search" type="text" placeholder="Cari..." />
        </div>
      </div>

      <div class="filter-group">
        <label>Status Pembayaran</label>
        <select v-model="selectedStatus">
          <option value="">Semua</option>
          <option value="pending">Menunggu</option>
          <option value="processing">Diproses</option>
          <option value="paid">Selesai</option>
        </select>
      </div>

      <div class="filter-group">
        <label>Metode Pembayaran</label>
        <select v-model="selectedMethod">
          <option value="">Semua</option>
          <option value="Transfer Bank">Transfer Bank</option>
          <option value="Virtual Account">Virtual Account</option>
          <option value="Tunai">Tunai</option>
        </select>
      </div>

      <div class="filter-group">
        <label>Periode</label>
        <select v-model="selectedPeriod">
          <option value="">Semua Periode</option>
          <option value="2026-05">Mei 2026</option>
          <option value="2026-04">April 2026</option>
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
              <th>No. Transaksi</th>
              <th>Pegawai</th>
              <th>No. Perjalanan</th>
              <th>Metode</th>
              <th>Tanggal</th>
              <th>Nominal</th>
              <th>Status</th>
              <th class="action-column">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in filteredPayments" :key="item.id">
              <td>{{ index + 1 }}</td>
              <td>{{ item.refNumber }}</td>
              <td>{{ item.employee }}</td>
              <td>{{ item.tripNumber }}</td>
              <td>{{ item.method }}</td>
              <td>{{ item.date }}</td>
              <td>{{ formatCurrency(item.amount) }}</td>
              <td><span class="status-badge" :class="item.statusClass">{{ item.status }}</span></td>
              <td>
                <div class="table-actions">
                  <NuxtLink :to="`/finance/detail-pembayaran/${item.id}`" class="detail-button">Detail</NuxtLink>
                  <button
                    v-if="item.status !== 'Selesai'"
                    type="button"
                    class="detail-button"
                    @click="openPaymentModal(item)"
                  >
                    Proses
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Mobile Cards -->
      <div class="payment-cards">
        <article v-for="(item, index) in filteredPayments" :key="`card-${item.id}`" class="payment-card">
          <div class="payment-card-header">
            <span class="payment-card-number">#{{ index + 1 }}</span>
            <span class="status-badge" :class="item.statusClass">{{ item.status }}</span>
          </div>
          <div class="payment-card-title">{{ item.employee }}</div>
          <div class="payment-card-subtitle">{{ item.tripNumber }} - {{ item.method }}</div>
          <dl class="payment-card-details">
            <div>
              <dt>Tanggal Pembayaran</dt>
              <dd>{{ item.date }}</dd>
            </div>
            <div>
              <dt>Nominal</dt>
              <dd>{{ formatCurrency(item.amount) }}</dd>
            </div>
            <div>
              <dt>Metode</dt>
              <dd>{{ item.method }}</dd>
            </div>
          </dl>
          <div class="payment-card-actions">
            <NuxtLink :to="`/finance/detail-pembayaran/${item.id}`" class="detail-button">Detail</NuxtLink>
            <button
              v-if="item.status !== 'Selesai'"
              type="button"
              class="detail-button"
              @click="openPaymentModal(item)"
            >
              Proses
            </button>
          </div>
        </article>
        <p v-if="filteredPayments.length === 0" class="empty-state">Tidak ada data pembayaran.</p>
      </div>

      <!-- Pagination -->
      <div class="table-footer">
        <span class="showing-text">Menampilkan {{ filteredPayments.length }} dari {{ payments.length }} data</span>
        <div class="pagination">
          <button class="page-button active">1</button>
          <button class="page-button">2</button>
          <button class="page-button">3</button>
        </div>
      </div>
    </div>

    <!-- Payment Processing Modal -->
    <ConfirmationModal
      v-if="showModal"
      :title=" 'Konfirmasi Pembayaran ' + modalRefNumber"
      :confirm-text=" 'Proses Pembayaran'"
      @confirm="processPayment"
      @cancel="hideModal"
    >
      <template #confirm-description>
        <p>Apakah Anda yakin ingin memproses pembayaran untuk pemohon <strong>{{ modalEmployee }}</strong> dengan total <strong>{{ formatCurrency(modalAmount) }}</strong>?</p>
        <p>Transaksi ini akan memerlukan verifikasi Finance.</p>
      </template>
    </ConfirmationModal>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import ConfirmationModal from '~/components/confirmation-modal/ConfirmationModal.vue'

const search = ref('')
const selectedStatus = ref('')
const selectedMethod = ref('')
const selectedPeriod = ref('')

interface Payment {
  id: number
  refNumber: string
  employee: string
  tripNumber: string
  method: string
  date: string
  amount: number
  status: string
  statusClass: string
}

const payments = ref<Payment[]>([
  { id: 1, refNumber: 'PAY-2026-001', employee: 'Andi Saputra', tripNumber: 'TRV-2026-001', method: 'Transfer Bank', date: '15 Mei 2026', amount: 5500000, status: 'Selesai', statusClass: 'paid' },
  { id: 2, refNumber: 'PAY-2026-002', employee: 'Dewi Lestari', tripNumber: 'TRV-2026-002', method: 'Transfer Bank', date: '18 Mei 2026', amount: 4800000, status: 'Selesai', statusClass: 'paid' },
  { id: 3, refNumber: 'PAY-2026-003', employee: 'Budi Santoso', tripNumber: 'TRV-2026-003', method: 'Virtual Account', date: '20 Mei 2026', amount: 7200000, status: 'Diproses', statusClass: 'processing' },
  { id: 4, refNumber: 'PAY-2026-004', employee: 'Sinta Maharani', tripNumber: 'TRV-2026-004', method: 'Transfer Bank', date: '22 Mei 2026', amount: 3500000, status: 'Selesai', statusClass: 'paid' },
  { id: 5, refNumber: 'PAY-2026-005', employee: 'Andi Saputra', tripNumber: 'TRV-2026-005', method: 'Transfer Bank', date: '25 Mei 2026', amount: 6200000, status: 'Menunggu', statusClass: 'pending' },
  { id: 6, refNumber: 'PAY-2026-006', employee: 'Maya Putri', tripNumber: 'TRV-2026-006', method: 'Virtual Account', date: '28 Mei 2026', amount: 4500000, status: 'Menunggu', statusClass: 'pending' },
])

const filteredPayments = computed(() => {
  return payments.value.filter(payment => {
    const searchMatch = !search.value ||
      payment.employee.toLowerCase().includes(search.value.toLowerCase()) ||
      payment.refNumber.toLowerCase().includes(search.value.toLowerCase())

    const statusMatch = !selectedStatus.value || payment.statusClass === selectedStatus.value
    const methodMatch = !selectedMethod.value || payment.method === selectedMethod.value
    const periodMatch = !selectedPeriod.value || (
      selectedPeriod.value === '2026-05'
        ? payment.date.includes('Mei 2026')
        : payment.date.includes('April 2026')
    )

    return searchMatch && statusMatch && methodMatch && periodMatch
  })
})

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(value)
}

// Computed values for summary stats
const pendingCount = computed(() => filteredPayments.value
  .filter(p => p.status === 'Menunggu')
  .reduce((sum, p) => sum + p.amount, 0))
const paidCount = computed(() => filteredPayments.value
  .filter(p => p.status === 'Selesai')
  .reduce((sum, p) => sum + p.amount, 0))
const totalPayments = computed(() => filteredPayments.value.reduce((sum, p) => sum + p.amount, 0))
const confirmedCount = computed(() => filteredPayments.value
  .filter(p => p.status === 'Selesai' || p.status === 'Diproses')
  .reduce((sum, p) => sum + p.amount, 0))

// Confirmation modal
const showModal = ref(false)
const activePayment = ref<Payment | null>(null)

const modalRefNumber = computed(() => activePayment.value?.refNumber ?? '')
const modalEmployee = computed(() => activePayment.value?.employee ?? '')
const modalAmount = computed(() => activePayment.value?.amount ?? 0)

const openPaymentModal = (payment: Payment) => {
  activePayment.value = payment
  showModal.value = true
}

const hideModal = () => {
  showModal.value = false
  activePayment.value = null
}

const processPayment = () => {
  if (!activePayment.value) return

  const target = payments.value.find(p => p.id === activePayment.value?.id)

  if (target) {
    target.status = 'Selesai'
    target.statusClass = 'paid'
  }

  hideModal()
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

.stat-icon.cyan { background: #e5f7fc; color: #0891b2; }
.stat-icon.green { background: #e3f8ef; color: #16a34a; }
.stat-icon.blue { background: #e9f0ff; color: var(--primary); }
.stat-icon.purple { background: #f5f3ff; color: #8b5cf6; }

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
.action-column { width: 110px; text-align: center; }

.table-actions { display: flex; align-items: center; justify-content: center; gap: 10px; }

.status-badge {
  display: inline-flex; align-items: center;
  padding: 4px 9px; border-radius: 5px;
  font-size: 9px; font-weight: 600; white-space: nowrap;
}
.waiting, .pending { background: #fff3df; color: #ef9b16; }
.paid, .completed { background: #dff7ef; color: #16a34a; }
.processing { background: #e8efff; color: var(--primary); }

.detail-button {
  display: inline-block; margin: auto;
  border: none; background: transparent;
  color: #1769ff; font-family: inherit; font-size: 10px; font-weight: 600; cursor: pointer; text-decoration: none;
}
.detail-button:hover { text-decoration: underline; }

/* MOBILE CARDS */
.payment-cards { display: none; }
.payment-card {
  padding: 14px; background: var(--white); border: 1px solid var(--border); border-radius: 10px;
}
.payment-card-header { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 8px; margin-bottom: 10px; }
.payment-card-number { font-size: 10px; color: #9aa4b5; }
.payment-card-title { display: block; color: var(--text); font-size: 14px; font-weight: 700; line-height: 1.35; }
.payment-card-subtitle { margin-top: 4px; font-size: 11px; color: var(--text-muted); }
.payment-card-details { display: grid; grid-template-columns: 1fr; gap: 8px; margin: 12px 0; }
.payment-card-details > div { display: flex; align-items: baseline; justify-content: space-between; gap: 12px; }
.payment-card-details dt { font-size: 10px; color: #8792a5; }
.payment-card-details dd { margin: 0; font-size: 11px; font-weight: 500; color: var(--text); text-align: right; }
.payment-card-actions { display: flex; justify-content: flex-end; gap: 8px; padding-top: 10px; border-top: 1px solid #eef1f5; }
.payment-card-actions .detail-button { flex: 1; min-height: 40px; border: 1px solid var(--primary); border-radius: 7px; background: #f5f8ff; }

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
  .table-wrapper { display: none; }
  .table-footer { flex-direction: column; align-items: flex-start; gap: 10px; padding: 0 14px 14px; }
  .pagination { flex-wrap: wrap; }
  .page-button { width: 36px; height: 36px; }
  .payment-cards { display: flex; flex-direction: column; gap: 12px; padding: 14px; }
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
  .payment-cards { padding: 10px; }
}
</style>