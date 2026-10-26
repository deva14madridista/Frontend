<template>
  <div class="atasan-page">
    <div class="breadcrumb"><NuxtLink to="/atasan/dashboard">Dashboard</NuxtLink><span>›</span><strong>Persetujuan</strong></div>

    <header class="page-header">
      <div>
        <h1>Persetujuan Perjalanan</h1>
        <p>Tinjau pengajuan perjalanan yang berada dalam kewenangan Anda.</p>
      </div>
    </header>

    <AtasanDataNotice message="Daftar pengajuan memerlukan endpoint API pengajuan berdasarkan cakupan atasan. Tidak ada data contoh yang ditampilkan." />

    <section class="metrics">
      <AtasanMetricCard title="Total Pengajuan" value="—" icon="▤" />
      <AtasanMetricCard title="Menunggu Persetujuan" value="—" icon="◷" />
      <AtasanMetricCard title="Disetujui" value="—" icon="✓" />
      <AtasanMetricCard title="Ditolak" value="—" icon="×" />
    </section>

    <section class="panel">
      <div class="filters">
        <label class="search-field">
          <span class="sr-only">Cari nama pegawai atau tujuan</span>
          <input v-model="search" type="search" placeholder="Cari pegawai atau tujuan" />
        </label>
        <select v-model="status" aria-label="Filter status">
          <option value="">Semua status</option>
          <option value="Menunggu">Menunggu</option>
          <option value="Disetujui">Disetujui</option>
          <option value="Ditolak">Ditolak</option>
        </select>
        <select v-model="period" aria-label="Filter periode">
          <option value="">Semua periode</option>
          <option value="month">Bulan ini</option>
          <option value="quarter">Kuartal ini</option>
          <option value="year">Tahun ini</option>
        </select>
        <select v-model="department" aria-label="Filter departemen">
          <option value="">Semua departemen</option>
        </select>
      </div>

      <div class="table-wrap">
        <table>
          <thead>
            <tr><th>ID Pengajuan</th><th>Nama Pegawai</th><th>Departemen</th><th>Tujuan</th><th>Tanggal Perjalanan</th><th>Estimasi Biaya</th><th>Status</th><th>Aksi</th></tr>
          </thead>
          <tbody>
            <tr v-if="filteredRequests.length === 0">
              <td colspan="8" class="empty-cell">
                {{ search || status || period || department ? 'Tidak ada pengajuan yang cocok dengan filter.' : 'Belum ada data pengajuan untuk ditampilkan.' }}
              </td>
            </tr>
            <tr v-for="request in filteredRequests" :key="request.id">
              <td>{{ request.id }}</td><td>{{ request.employee }}</td><td>{{ request.department }}</td><td>{{ request.destination }}</td><td>{{ request.date }}</td><td>{{ request.estimate }}</td>
              <td><span class="status">{{ request.status }}</span></td>
              <td><NuxtLink :to="`/atasan/persetujuan/${request.id}`" class="detail-link">Tinjau</NuxtLink></td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

definePageMeta({ layout: 'atasan' })

interface ApprovalRequest {
  id: string
  employee: string
  department: string
  destination: string
  date: string
  estimate: string
  status: string
}

const requests = ref<ApprovalRequest[]>([])
const search = ref('')
const status = ref('')
const period = ref('')
const department = ref('')
const filteredRequests = computed(() => requests.value.filter((request) => {
  const query = search.value.toLocaleLowerCase()
  return (!query || `${request.employee} ${request.destination}`.toLocaleLowerCase().includes(query))
    && (!status.value || request.status === status.value)
    && (!department.value || request.department === department.value)
}))
</script>

<style scoped>
.atasan-page { min-height: calc(100vh - 70px); padding: 26px 28px; background: #f5f6f8; }
.breadcrumb { display: flex; gap: 9px; margin-bottom: 8px; color: #8792a3; font-size: 11px; }
.breadcrumb a, .detail-link { color: var(--primary); }
.breadcrumb strong { color: var(--text); font-weight: 600; }
.page-header { margin-bottom: 18px; }
.page-header h1 { margin: 0; color: var(--text); font-size: 24px; }
.page-header p { margin: 6px 0 0; color: var(--text-muted); font-size: 12px; }
.metrics { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 14px; margin: 18px 0; }
.panel { padding: 18px; border: 1px solid var(--border); border-radius: 10px; background: var(--white); }
.filters { display: grid; grid-template-columns: minmax(220px, 1.5fr) repeat(3, minmax(140px, 1fr)); gap: 10px; margin-bottom: 16px; }
.filters input, .filters select { width: 100%; min-height: 39px; padding: 0 11px; border: 1px solid var(--border); border-radius: 7px; background: #fff; color: var(--text); font: inherit; font-size: 11px; }
.table-wrap { overflow-x: auto; }
table { width: 100%; min-width: 930px; border-collapse: collapse; text-align: left; }
th { padding: 11px 9px; background: #f8fafc; color: #788397; font-size: 10px; font-weight: 600; }
td { padding: 13px 9px; border-bottom: 1px solid #edf0f4; color: var(--text); font-size: 11px; }
.empty-cell { height: 120px; color: var(--text-muted); text-align: center; }
.status { padding: 5px 8px; border-radius: 20px; background: #fff5dc; color: #9a6a08; font-size: 10px; }
.detail-link { font-size: 11px; font-weight: 600; }
.sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0; }
@media (max-width: 1050px) { .metrics { grid-template-columns: repeat(2, minmax(0, 1fr)); } .filters { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
@media (max-width: 650px) { .atasan-page { padding: 18px 15px; } .page-header h1 { font-size: 21px; } .filters { grid-template-columns: 1fr; } }
@media (max-width: 390px) { .metrics { grid-template-columns: 1fr; } }
</style>
