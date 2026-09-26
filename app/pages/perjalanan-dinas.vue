<template>
  <div class="perjalanan-page">

    <!-- Breadcrumb -->
    <div class="breadcrumb">
      <NuxtLink to="/dashboard">Dashboard</NuxtLink>
      <span>›</span>
      <strong>Perjalanan Dinas</strong>
    </div>

    <!-- Header -->
    <div class="page-header">
      <h1>Daftar Perjalanan Dinas</h1>

      <LayoutPageactions />
    </div>

    <!-- Filter -->
    <div class="filter-card">

      <!-- Search -->
      <div class="filter-group search-group">
        <label>Cari Kota / Keperluan</label>

        <div class="search-input">
          <svg viewBox="0 0 24 24">
            <path
              d="M10.5 4a6.5 6.5 0 1 0 4.08 11.56l4.43 4.43 1.41-1.41-4.43-4.43A6.5 6.5 0 0 0 10.5 4Zm0 2a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9Z"
            />
          </svg>

          <input
            v-model="search"
            type="text"
            placeholder="Cari perjalanan..."
          />
        </div>
      </div>

      <!-- Status -->
      <div class="filter-group status-group">
        <label>Status</label>

        <select v-model="selectedStatus">
          <option value="">Semua Status</option>
          <option value="Disetujui">Disetujui</option>
          <option value="Menunggu">Menunggu</option>
          <option value="Ditolak">Ditolak</option>
          <option value="Selesai">Selesai</option>
          <option value="Dalam Perjalanan">Dalam Perjalanan</option>
        </select>
      </div>

      <!-- Date -->
      <div class="filter-group date-group">
        <label>Rentang Tanggal</label>

        <div class="date-input">
          <input
            v-model="selectedDate"
            type="date"
          />

          <svg viewBox="0 0 24 24">
            <path
              d="M7 2v2H5a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-2V2h-2v2H9V2H7Zm12 17H5V9h14v10ZM7 11h3v3H7v-3Z"
            />
          </svg>
        </div>
      </div>

    </div>

    <!-- Table Card -->
    <div class="table-card">

      <div class="table-wrapper">

        <table>
          <thead>
            <tr>
              <th class="no-column">No</th>
              <th>Tujuan Kota</th>
              <th>Tanggal Berangkat</th>
              <th>Tanggal Kembali</th>
              <th>Jenis Perjalanan</th>
              <th>Status</th>
              <th class="action-column">Aksi</th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="(trip, index) in filteredTrips"
              :key="trip.id"
            >
              <td>{{ index + 1 }}</td>

              <td>
                <a href="#" class="destination">
                  {{ trip.destination }}
                </a>
              </td>

              <td>{{ trip.startDate }}</td>

              <td>{{ trip.endDate }}</td>

              <td class="travel-type">
                {{ trip.type }}
              </td>

              <td>
                <span
                  class="status-badge"
                  :class="trip.statusClass"
                >
                  {{ trip.status }}
                </span>
              </td>

              <td>
                <button class="detail-button">
                  Detail
                </button>
              </td>
            </tr>
          </tbody>
        </table>

      </div>

      <!-- Table Footer -->
      <div class="table-footer">

        <span class="showing-text">
          Menampilkan {{ filteredTrips.length }} dari 24 perjalanan
        </span>

        <div class="pagination">

          <button class="page-button active">
            1
          </button>

          <button class="page-button">
            2
          </button>

          <button class="page-button">
            3
          </button>

        </div>

      </div>

    </div>

  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const search = ref('')
const selectedStatus = ref('')
const selectedDate = ref('')

const trips = [
  {
    id: 1,
    destination: 'Jakarta - Bandung',
    startDate: '12 Mei 2026',
    endDate: '15 Mei 2026',
    type: 'Kereta Api',
    status: 'Disetujui',
    statusClass: 'approved'
  },
  {
    id: 2,
    destination: 'Jakarta - Surabaya',
    startDate: '20 Mei 2026',
    endDate: '24 Mei 2026',
    type: 'Pesawat Terbang',
    status: 'Menunggu',
    statusClass: 'waiting'
  },
  {
    id: 3,
    destination: 'Jakarta - Semarang',
    startDate: '28 Mei 2026',
    endDate: '31 Mei 2026',
    type: 'Mobil Dinas',
    status: 'Ditolak',
    statusClass: 'rejected'
  },
  {
    id: 4,
    destination: 'Jakarta - Yogyakarta',
    startDate: '02 Juni 2026',
    endDate: '06 Juni 2026',
    type: 'Kereta Api',
    status: 'Selesai',
    statusClass: 'completed'
  },
  {
    id: 5,
    destination: 'Jakarta - Medan',
    startDate: '10 Juni 2026',
    endDate: '15 Juni 2026',
    type: 'Pesawat Terbang',
    status: 'Dalam Perjalanan',
    statusClass: 'ongoing'
  }
]

const filteredTrips = computed(() => {
  return trips.filter((trip) => {

    const searchMatch =
      trip.destination
        .toLowerCase()
        .includes(search.value.toLowerCase()) ||
      trip.type
        .toLowerCase()
        .includes(search.value.toLowerCase())

    const statusMatch =
      !selectedStatus.value ||
      trip.status === selectedStatus.value

    return searchMatch && statusMatch
  })
})
</script>

<style scoped>
/* =========================
   PAGE
========================= */

.perjalanan-page {
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
  gap: 9px;

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

  margin-bottom: 24px;
}

.page-header h1 {
  margin: 0;

  font-size: 23px;
  font-weight: 700;

  color: var(--text);
}



.header-button svg {
  width: 15px;
  height: 15px;

  fill: currentColor;
}

.header-button span {
  font-size: 13px;
  font-weight: 600;
}

/* =========================
   FILTER
========================= */

.filter-card {
  display: grid;
  grid-template-columns: minmax(280px, 1fr) 195px 225px;
  gap: 14px;

  padding: 16px;

  margin-bottom: 24px;

  background: var(--white);
  border: 1px solid var(--border);
  border-radius: 10px;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.filter-group label {
  font-size: 9px;
  font-weight: 600;
  color: #667085;
}

/* Search */

.search-input,
.date-input {
  height: 31px;

  display: flex;
  align-items: center;

  border: 1px solid #dce2eb;
  border-radius: 6px;

  background: var(--white);
}

.search-input svg,
.date-input svg {
  width: 14px;
  height: 14px;

  margin: 0 8px;

  fill: #718096;
  flex-shrink: 0;
}

.search-input input,
.date-input input,
.filter-group select {
  width: 100%;
  height: 31px;

  box-sizing: border-box;

  border: 1px solid #dce2eb;
  border-radius: 6px;

  background: var(--white);
  color: var(--text);

  outline: none;

  font-family: inherit;
  font-size: 10px;
}

.search-input input {
  border: none;
}

.date-input input {
  border: none;
  padding: 0 0 0 4px;
}

.search-input input:focus,
.date-input input:focus,
.filter-group select:focus {
  outline: none;
}

.filter-group select {
  padding: 0 10px;
}

/* =========================
   TABLE
========================= */

.table-card {
  background: var(--white);

  border: 1px solid var(--border);
  border-radius: 11px;

  overflow: hidden;
}

.table-wrapper {
  padding: 18px;
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
  padding: 14px 12px;

  border-bottom: 1px solid #e5e8ee;

  font-size: 10px;
  color: #344054;

  vertical-align: middle;
}

tbody tr:last-child td {
  border-bottom: none;
}

.no-column {
  width: 30px;
}

.action-column {
  width: 55px;
  text-align: center;
}

/* Destination */

.destination {
  display: inline-block;

  max-width: 70px;

  color: #1769ff;
  text-decoration: none;

  font-size: 10px;
  font-weight: 600;

  line-height: 1.15;
  word-break: break-word;
}

.destination:hover {
  text-decoration: underline;
}

/* Travel type */

.travel-type {
  color: #718096;
}

/* =========================
   STATUS
========================= */

.status-badge {
  display: inline-flex;
  align-items: center;

  padding: 4px 9px;

  border-radius: 5px;

  font-size: 9px;
  font-weight: 600;

  white-space: nowrap;
}

.approved {
  background: #dff7ef;
  color: #18a77c;
}

.waiting {
  background: #fff3df;
  color: #ef9b16;
}

.rejected {
  background: #ffe8e8;
  color: #ef5350;
}

.completed {
  background: #dff7ef;
  color: #18a77c;
}

.ongoing {
  background: #fff3df;
  color: #ef9b16;
}

/* =========================
   DETAIL
========================= */

.detail-button {
  display: block;

  margin: auto;

  border: none;
  background: transparent;

  color: #1769ff;

  font-family: inherit;
  font-size: 10px;
  font-weight: 600;

  cursor: pointer;
}

.detail-button:hover {
  text-decoration: underline;
}

/* =========================
   FOOTER
========================= */

.table-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 12px 18px 18px;
}

.showing-text {
  font-size: 9px;
  color: #718096;
}

.pagination {
  display: flex;
  gap: 6px;
}

.page-button {
  width: 25px;
  height: 25px;

  border: 1px solid #dce2eb;
  border-radius: 5px;

  background: var(--white);
  color: var(--text);

  font-family: inherit;
  font-size: 9px;

  cursor: pointer;
}

.page-button.active {
  border-color: var(--primary);
  background: var(--primary);
  color: var(--white);
}

/* =========================
   RESPONSIVE
========================= */

@media (max-width: 900px) {
  .filter-card {
    grid-template-columns: 1fr 1fr;
  }

  .search-group {
    grid-column: 1 / -1;
  }
}

@media (max-width: 700px) {
  .perjalanan-page {
    padding: 16px;
  }

  .filter-card {
    grid-template-columns: 1fr;
  }

  .search-group {
    grid-column: auto;
  }

  .page-header h1 {
    font-size: 20px;
  }

  .table-wrapper {
    padding: 12px;
  }

  table {
    min-width: 800px;
  }
}
</style>