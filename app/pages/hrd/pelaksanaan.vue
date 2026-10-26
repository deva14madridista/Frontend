<template>
  <div class="hrd-pelaksanaan-page">
    <!-- Breadcrumb -->
    <div class="breadcrumb">
      <NuxtLink to="/dashboard">Dashboard</NuxtLink>
      <span>›</span>
      <NuxtLink to="/hrd/dashboard">HRD</NuxtLink>
      <span>›</span>
      <strong>Pelaksanaan Perjalanan</strong>
    </div>

    <!-- Header -->
    <div class="page-header">
      <h1>Pelaksanaan Perjalanan Dinas</h1>
    </div>

    <!-- Summary Stats -->
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon cyan">▣</div>
        <div>
          <p>Total Perjalanan</p>
          <h2>{{ totalTrips }}</h2>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon orange">⏳</div>
        <div>
          <p>Menunggu Perhatian</p>
          <h2>{{ pendingCount }}</h2>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon green">✅</div>
        <div>
          <p>Selesai</p>
          <h2>{{ completedCount }}</h2>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon blue">📊</div>
        <div>
          <p>Memerlukan Perhatian</p>
          <h2>{{ attentionCount }}</h2>
        </div>
      </div>
    </div>

    <!-- Filter Card -->
    <div class="filter-card">
      <div class="filter-group search-group">
        <label>Cari Pegawai / Tujuan</label>
        <div class="search-input">
          <svg viewBox="0 0 24 24"><path d="M10.5 4a6.5 6.5 0 1 0 4.08 11.56l4.43 4.43 1.41-1.41-4.43-4.43A6.5 6.5 0 0 0 10.5 4Zm0 2a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9Z"/></svg>
          <input v-model="search" type="text" placeholder="Cari..." />
        </div>
      </div>

      <div class="filter-group">
        <label>Status</label>
        <select v-model="selectedStatus">
          <option value="">Semua</option>
          <option value="menunggu">Menunggu</option>
          <option value="berlangsung">Berlangsung</option>
          <option value="selesai">Selesai</option>
        </select>
      </div>

      <div class="filter-group">
        <label>Departemen</label>
        <select v-model="selectedDepartment">
          <option value="">Semua</option>
          <option value="Marketing">Marketing</option>
          <option value="Sales">Sales</option>
          <option value="HRD">HRD</option>
          <option value="Finance">Finance</option>
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
              <th>Tujuan</th>
              <th>Tanggal Berangkat</th>
              <th>Tanggal Kembali</th>
              <th>Status</th>
              <th class="action-column">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(trip, index) in filteredTrips" :key="trip.id">
              <td>{{ index + 1 }}</td>
              <td>{{ trip.employee }}</td>
              <td>{{ trip.destination }}</td>
              <td>{{ trip.startDate }}</td>
              <td>{{ trip.endDate }}</td>
              <td><span class="status-badge" :class="trip.statusClass">{{ trip.status }}</span></td>
              <td>
                <NuxtLink :to="`/hrd/detail-perjalanan/${trip.id}`" class="detail-button">Detail</NuxtLink>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Mobile Cards -->
      <div class="trip-cards">
        <article v-for="(trip, index) in filteredTrips" :key="`card-${trip.id}`" class="trip-card">
          <div class="trip-card-header">
            <span class="trip-card-number">Perjalanan #{{ index + 1 }}</span>
            <span class="status-badge" :class="trip.statusClass">{{ trip.status }}</span>
          </div>
          <div class="trip-card-title">{{ trip.destination }}</div>
          <dl class="trip-card-details">
            <div>
              <dt>Pegawai</dt>
              <dd>{{ trip.employee }}</dd>
            </div>
            <div>
              <dt>Tanggal Berangkat</dt>
              <dd>{{ trip.startDate }}</dd>
            </div>
            <div>
              <dt>Tanggal Kembali</dt>
              <dd>{{ trip.endDate }}</dd>
            </div>
          </dl>
          <div class="trip-card-actions">
            <NuxtLink :to="`/hrd/detail-perjalanan/${trip.id}`" class="detail-button">Detail</NuxtLink>
          </div>
        </article>
        <p v-if="filteredTrips.length === 0" class="empty-state">Tidak ada data perjalanan.</p>
      </div>

      <!-- Pagination -->
      <div class="table-footer">
        <span class="showing-text">Menampilkan {{ filteredTrips.length }} dari {{ trips.length }} data</span>
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
const selectedStatus = ref('')
const selectedDepartment = ref('')

const trips = ref([
  { id: 1, employee: 'Andi Saputra', destination: 'Jakarta - Bandung', startDate: '10 Mei 2026', endDate: '12 Mei 2026', status: 'Menunggu', statusClass: 'waiting' },
  { id: 2, employee: 'Sinta Maharani', destination: 'Jakarta - Surabaya', startDate: '15 Mei 2026', endDate: '18 Mei 2026', status: 'Berlangsung', statusClass: 'ongoing' },
  { id: 3, employee: 'Dewi Lestari', destination: 'Jakarta - Yogyakarta', startDate: '20 Mei 2026', endDate: '22 Mei 2026', status: 'Selesai', statusClass: 'completed' },
  { id: 4, employee: 'Budi Santoso', destination: 'Jakarta - Semarang', startDate: '25 Mei 2026', endDate: '27 Mei 2026', status: 'Menunggu', statusClass: 'waiting' },
  { id: 5, employee: 'Rudi Hartono', destination: 'Jakarta - Medan', startDate: '01 Juni 2026', endDate: '03 Juni 2026', status: 'Berlangsung', statusClass: 'ongoing' },
  { id: 6, employee: 'Maya Putri', destination: 'Jakarta - Bali', startDate: '05 Juni 2026', endDate: '07 Juni 2026', status: 'Selesai', statusClass: 'completed' },
  { id: 7, employee: 'Joko Widodo', destination: 'Jakarta - Bandung', startDate: '10 Mei 2026', endDate: '12 Mei 2026', status: 'Menunggu', statusClass: 'waiting' },
  { id: 8, employee: 'Fitriani', destination: 'Jakarta - Surabaya', startDate: '15 Mei 2026', endDate: '18 Mei 2026', status: 'Berlangsung', statusClass: 'ongoing' },
])

const filteredTrips = computed(() => {
  return trips.value.filter(trip => {
    const searchMatch = !search.value ||
      trip.employee.toLowerCase().includes(search.value.toLowerCase()) ||
      trip.destination.toLowerCase().includes(search.value.toLowerCase())

    const statusMatch = !selectedStatus.value || trip.status === selectedStatus.value
    const deptMatch = !selectedDepartment.value || true // Filter departemen bisa ditambahkan

    return searchMatch && statusMatch
  })
})

// Computed summary values
const totalTrips = computed(() => trips.value.length)
const pendingCount = computed(() => trips.value.filter(t => t.status === 'Menunggu').length)
const completedCount = computed(() => trips.value.filter(t => t.status === 'Selesai').length)
const attentionCount = computed(() => trips.value.filter(t => t.status === 'Menunggu').length)
</script>

<style scoped>
.hrd-pelaksanaan-page {
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
.stat-icon.orange { background: #fff3df; color: #f59e0b; }
.stat-icon.green { background: #e3f8ef; color: #16a34a; }
.stat-icon.blue { background: #e9f0ff; color: var(--primary); }

.stat-card > div:last-child { min-width: 0; }
.stat-card p { margin: 0 0 3px; font-size: 9px; color: #7b8799; }
.stat-card h2 { margin: 0; font-size: 15px; line-height: 1.1; color: var(--text); font-weight: 700; }

/* FILTER CARD */
.filter-card {
  display: grid;
  grid-template-columns: minmax(280px, 1fr) 195px 195px;
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
.waiting { background: #fff3df; color: #ef9b16; }
.ongoing { background: #e8efff; color: var(--primary); }
.completed { background: #dff7ef; color: #18a77c; }

.detail-button {
  display: inline-block; margin: auto;
  border: none; background: transparent;
  color: #1769ff; font-family: inherit; font-size: 10px; font-weight: 600; cursor: pointer; text-decoration: none;
}
.detail-button:hover { text-decoration: underline; }

/* MOBILE CARDS */
.trip-cards { display: none; }
.trip-card {
  padding: 14px; background: var(--white); border: 1px solid var(--border); border-radius: 10px;
}
.trip-card-header { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 8px; margin-bottom: 10px; }
.trip-card-number { font-size: 10px; color: #9aa4b5; }
.trip-card-title { display: block; color: var(--text); font-size: 14px; font-weight: 700; line-height: 1.35; overflow-wrap: anywhere; }
.trip-card-details { display: grid; grid-template-columns: 1fr; gap: 8px; margin: 12px 0; }
.trip-card-details > div { display: flex; align-items: baseline; justify-content: space-between; gap: 12px; }
.trip-card-details dt { font-size: 10px; color: #8792a5; }
.trip-card-details dd { margin: 0; font-size: 11px; font-weight: 500; color: var(--text); text-align: right; }
.trip-card-actions { display: flex; justify-content: flex-end; padding-top: 10px; border-top: 1px solid #eef1f5; }
.trip-card-actions .detail-button { width: 100%; min-height: 40px; border: 1px solid var(--primary); border-radius: 7px; background: #f5f8ff; }

.empty-state { padding: 28px 16px; text-align: center; font-size: 12px; color: #8792a5; }

/* FOOTER */
.table-footer { display: flex; align-items: center; justify-content: space-between; padding: 12px 18px 18px; }
.showing-text { font-size: 9px; color: #718096; }
.pagination { display: flex; gap: 6px; }
.page-button { width: 25px; height: 25px; border: 1px solid #dce2eb; border-radius: 5px; background: var(--white); color: var(--text); font-family: inherit; font-size: 9px; cursor: pointer; }
.page-button.active { border-color: var(--primary); background: var(--primary); color: var(--white); }

/* RESPONSIVE */
@media (max-width: 1023px) {
  .hrd-pelaksanaan-page { padding: 20px; }
  table { min-width: 0; table-layout: fixed; }
  th { padding: 9px 6px; } td { padding: 11px 6px; font-size: 9px; }
  .status-badge { padding: 3px 7px; font-size: 8.5px; }
  .detail-button { font-size: 9px; }
}

@media (max-width: 767px) {
  .hrd-pelaksanaan-page { padding: 16px; }
  .page-header h1 { font-size: 20px; }
  .filter-card { grid-template-columns: 1fr; padding: 14px; gap: 12px; margin-bottom: 16px; }
  .page-header h1 { font-size: 20px; }
  .filter-group input, .filter-group select { font-size: 16px; }
  .table-wrapper { display: none; }
  .table-footer { flex-direction: column; align-items: flex-start; gap: 10px; padding: 0 14px 14px; }
  .pagination { flex-wrap: wrap; }
  .trip-cards { display: flex; flex-direction: column; gap: 12px; padding: 14px; }
  .table-card { border: none; background: transparent; overflow: visible; }
  .trip-card { padding: 12px; }
  .stats-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; }
  .stat-card { padding: 12px; gap: 10px; }
  .stat-card h2 { font-size: 14px; }
}

@media (max-width: 540px) {
  .stats-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}

@media (max-width: 374px) {
  .hrd-pelaksanaan-page { padding: 12px; }
  .trip-cards { padding: 10px; }
}
</style>