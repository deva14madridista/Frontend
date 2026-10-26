<template>
  <div class="data-pegawai-page">
    <!-- Breadcrumb -->
    <div class="breadcrumb">
      <NuxtLink to="/dashboard">Dashboard</NuxtLink>
      <span>›</span>
      <NuxtLink to="/hrd/dashboard">HRD</NuxtLink>
      <span>›</span>
      <strong>Data Pegawai</strong>
    </div>

    <!-- Header -->
    <div class="page-header">
      <h1>Data Pegawai</h1>
    </div>

    <!-- Filter Card -->
    <div class="filter-card">
      <div class="filter-group search-group">
        <label>Cari Pegawai / ID</label>
        <div class="search-input">
          <svg viewBox="0 0 24 24"><path d="M10.5 4a6.5 6.5 0 1 0 4.08 11.56l4.43 4.43 1.41-1.41-4.43-4.43A6.5 6.5 0 0 0 10.5 4Zm0 2a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9Z"/></svg>
          <input v-model="search" type="text" placeholder="Cari pegawai..." />
        </div>
      </div>

      <div class="filter-group">
        <label>Departemen</label>
        <select v-model="selectedDepartment">
          <option value="">Semua Departemen</option>
          <option value="Marketing">Marketing</option>
          <option value="Sales">Sales</option>
          <option value="HRD">HRD</option>
          <option value="Finance">Finance</option>
          <option value="IT">IT</option>
        </select>
      </div>

      <div class="filter-group">
        <label>Status</label>
        <select v-model="selectedStatus">
          <option value="">Semua</option>
          <option value="active">Aktif</option>
          <option value="nonaktif">Nonaktif</option>
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
              <th>ID Pegawai</th>
              <th>Nama</th>
              <th>Departemen</th>
              <th>Jabatan</th>
              <th>Email</th>
              <th>Status</th>
              <th class="action-column">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(pegawai, index) in filteredPegawai" :key="pegawai.id">
              <td>{{ index + 1 }}</td>
              <td>PG-{{ pegawai.id }}</td>
              <td>{{ pegawai.name }}</td>
              <td>{{ pegawai.department }}</td>
              <td>{{ pegawai.position }}</td>
              <td>{{ pegawai.email }}</td>
              <td><span class="status-badge" :class="pegawai.statusClass">{{ pegawai.statusLabel }}</span></td>
              <td>
                <NuxtLink :to="`/hrd/pegawai-detail/${pegawai.id}`" class="detail-button">Detail</NuxtLink>
                <button class="edit-button">Edit</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Mobile Cards -->
      <div class="pegawai-cards">
        <article v-for="(pegawai, index) in filteredPegawai" :key="`card-${pegawai.id}`" class="pegawai-card">
          <div class="pegawai-card-header">
            <span class="pegawai-card-number">#{{ index + 1 }}</span>
            <span class="status-badge" :class="pegawai.statusClass">{{ pegawai.statusLabel }}</span>
          </div>
          <div class="pegawai-card-title">{{ pegawai.name }}</div>
          <div class="pegawai-card-subtitle">{{ pegawai.position }} - {{ pegawai.department }}</div>
          <dl class="pegawai-card-details">
            <div>
              <dt>ID Pegawai</dt>
              <dd>PG-{{ pegawai.id }}</dd>
            </div>
            <div>
              <dt>Email</dt>
              <dd>{{ pegawai.email }}</dd>
            </div>
            <div>
              <dt>Departemen</dt>
              <dd>{{ pegawai.department }}</dd>
            </div>
          </dl>
          <div class="pegawai-card-actions">
            <NuxtLink :to="`/hrd/pegawai-detail/${pegawai.id}`" class="detail-button">Detail</NuxtLink>
          </div>
        </article>
        <p v-if="filteredPegawai.length === 0" class="empty-state">Tidak ada data pegawai.</p>
      </div>

      <!-- Pagination -->
      <div class="table-footer">
        <span class="showing-text">Menampilkan {{ filteredPegawai.length }} dari {{ pegawai.length }} data</span>
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
const selectedDepartment = ref('')
const selectedStatus = ref('')

const pegawai = ref([
  { id: 1, name: 'Andi Saputra', department: 'Marketing', position: 'Staff Marketing', email: 'andi@company.com', status: 'active', statusClass: 'active', statusLabel: 'Aktif' },
  { id: 2, name: 'Sinta Maharani', department: 'Sales', position: 'Staff Sales', email: 'sinta@company.com', status: 'active', statusClass: 'active', statusLabel: 'Aktif' },
  { id: 3, name: 'Dewi Lestari', department: 'HRD', position: 'Staff HRD', email: 'dewi@company.com', status: 'active', statusClass: 'active', statusLabel: 'Aktif' },
  { id: 4, name: 'Budi Santoso', department: 'Finance', position: 'Staff Keuangan', email: 'budi@company.com', status: 'active', statusClass: 'active', statusLabel: 'Aktif' },
  { id: 5, name: 'Rudi Hartono', department: 'IT', position: 'Staff IT', email: 'rudi@company.com', status: 'active', statusClass: 'active', statusLabel: 'Aktif' },
  { id: 6, name: 'Maya Putri', department: 'Marketing', position: 'Staff Marketing', email: 'maya@company.com', status: 'nonaktif', statusClass: 'nonactive', statusLabel: 'Nonaktif' },
  { id: 7, name: 'Joko Widodo', department: 'Sales', position: 'Sales Manager', email: 'joko@company.com', status: 'active', statusClass: 'active', statusLabel: 'Aktif' },
  { id: 8, name: 'Fitriani', department: 'HRD', position: 'HR Officer', email: 'fitri@company.com', status: 'active', statusClass: 'active', statusLabel: 'Aktif' },
])

const filteredPegawai = computed(() => {
  return pegawai.value.filter(p => {
    const searchMatch = !search.value ||
      p.name.toLowerCase().includes(search.value.toLowerCase()) ||
      p.id.toString().includes(search.value) ||
      p.email.toLowerCase().includes(search.value.toLowerCase())

    const deptMatch = !selectedDepartment.value || p.department === selectedDepartment.value
    const statusMatch = !selectedStatus.value || p.status === selectedStatus.value

    return searchMatch && deptMatch && statusMatch
  })
})
</script>

<style scoped>
.data-pegawai-page {
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
.action-column { width: 80px; text-align: center; }

.status-badge {
  display: inline-flex; align-items: center;
  padding: 4px 9px; border-radius: 5px;
  font-size: 9px; font-weight: 600; white-space: nowrap;
}
.active { background: #dff7ef; color: #18a77c; }
.nonactive { background: #ffe8e8; color: #ef5350; }

.detail-button {
  display: inline-block; margin: auto;
  border: none; background: transparent;
  color: #1769ff; font-family: inherit; font-size: 10px; font-weight: 600; cursor: pointer; text-decoration: none;
}
.detail-button:hover { text-decoration: underline; }

/* MOBILE CARDS */
.pegawai-cards { display: none; }
.pegawai-card {
  padding: 14px; background: var(--white); border: 1px solid var(--border); border-radius: 10px;
}
.pegawai-card-header { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 8px; margin-bottom: 10px; }
.pegawai-card-number { font-size: 10px; color: #9aa4b5; }
.pegawai-card-title { display: block; color: var(--text); font-size: 14px; font-weight: 700; line-height: 1.35; }
.pegawai-card-subtitle { margin-top: 4px; font-size: 11px; color: var(--text-muted); }
.pegawai-card-details { display: grid; grid-template-columns: 1fr; gap: 8px; margin: 12px 0; }
.pegawai-card-details > div { display: flex; align-items: baseline; justify-content: space-between; gap: 12px; }
.pegawai-card-details dt { font-size: 10px; color: #8792a5; }
.pegawai-card-details dd { margin: 0; font-size: 11px; font-weight: 500; color: var(--text); text-align: right; }
.pegawai-card-actions { display: flex; justify-content: flex-end; padding-top: 10px; border-top: 1px solid #eef1f5; }
.pegawai-card-actions .detail-button { width: 100%; min-height: 40px; border: 1px solid var(--primary); border-radius: 7px; background: #f5f8ff; }

.empty-state { padding: 28px 16px; text-align: center; font-size: 12px; color: #8792a5; }

/* FOOTER */
.table-footer { display: flex; align-items: center; justify-content: space-between; padding: 12px 18px 18px; }
.showing-text { font-size: 9px; color: #718096; }
.pagination { display: flex; gap: 6px; }
.page-button { width: 25px; height: 25px; border: 1px solid #dce2eb; border-radius: 5px; background: var(--white); color: var(--text); font-family: inherit; font-size: 9px; cursor: pointer; }
.page-button.active { border-color: var(--primary); background: var(--primary); color: var(--white); }

/* RESPONSIVE */
@media (max-width: 1023px) {
  .data-pegawai-page { padding: 20px; }
  table { min-width: 0; table-layout: fixed; }
  th { padding: 9px 6px; } td { padding: 11px 6px; font-size: 9px; }
  .status-badge { padding: 3px 7px; font-size: 8.5px; }
  .detail-button { font-size: 9px; }
}

@media (max-width: 767px) {
  .data-pegawai-page { padding: 16px; }
  .filter-card { grid-template-columns: 1fr; padding: 14px; gap: 12px; margin-bottom: 16px; }
  .page-header h1 { font-size: 20px; }
  .filter-group input, .filter-group select { font-size: 16px; }
  .table-wrapper { display: none; }
  .table-footer { flex-direction: column; align-items: flex-start; gap: 10px; padding: 0 14px 14px; }
  .pagination { flex-wrap: wrap; }
  .pegawai-cards { display: flex; flex-direction: column; gap: 12px; padding: 14px; }
  .table-card { border: none; background: transparent; overflow: visible; }
  .pegawai-card { padding: 12px; }
}

@media (max-width: 540px) {
  .filter-group input, .filter-group select { font-size: 14px; }
}

@media (max-width: 374px) {
  .data-pegawai-page { padding: 12px; }
  .pegawai-cards { padding: 10px; }
}
</style>