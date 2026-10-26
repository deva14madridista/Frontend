<template>
  <div class="atasan-page">
    <div class="breadcrumb"><NuxtLink to="/atasan/dashboard">Dashboard</NuxtLink><span>›</span><strong>Perjalanan Tim</strong></div>

    <header class="page-header">
      <div><h1>Perjalanan Tim</h1><p>Pantau jadwal dan status perjalanan dinas anggota tim.</p></div>
      <label class="period-control"><span>Periode</span><select v-model="period" aria-label="Periode perjalanan tim"><option value="">Semua periode</option><option value="month">Bulan ini</option><option value="quarter">Kuartal ini</option><option value="year">Tahun ini</option></select></label>
    </header>

    <AtasanDataNotice message="Data perjalanan tim memerlukan API perjalanan dengan pembatasan berdasarkan cakupan atasan." />

    <section class="metrics">
      <AtasanMetricCard title="Total Perjalanan Tim" value="—" icon="▤" />
      <AtasanMetricCard title="Menunggu Keberangkatan" value="—" icon="◷" />
      <AtasanMetricCard title="Sedang Berlangsung" value="—" icon="➤" />
      <AtasanMetricCard title="Perjalanan Selesai" value="—" icon="✓" />
    </section>

    <section class="panel">
      <div class="filters">
        <label><span class="sr-only">Cari pegawai atau tujuan</span><input v-model="search" type="search" placeholder="Cari pegawai atau tujuan" /></label>
        <select v-model="status" aria-label="Status perjalanan"><option value="">Semua status</option><option value="Menunggu keberangkatan">Menunggu keberangkatan</option><option value="Berlangsung">Berlangsung</option><option value="Selesai">Selesai</option></select>
        <select v-model="department" aria-label="Departemen"><option value="">Semua departemen</option></select>
      </div>
      <div class="table-wrap">
        <table>
          <thead><tr><th>ID Perjalanan</th><th>Nama Pegawai</th><th>Tujuan</th><th>Tanggal Berangkat</th><th>Tanggal Kembali</th><th>Estimasi Biaya</th><th>Status Perjalanan</th><th>Aksi</th></tr></thead>
          <tbody>
            <tr v-if="filteredTrips.length === 0"><td colspan="8" class="empty-cell">{{ search || status || department ? 'Tidak ada perjalanan yang cocok dengan filter.' : 'Belum ada data perjalanan tim untuk ditampilkan.' }}</td></tr>
            <tr v-for="trip in filteredTrips" :key="trip.id"><td>{{ trip.id }}</td><td>{{ trip.employee }}</td><td>{{ trip.destination }}</td><td>{{ trip.departure }}</td><td>{{ trip.returnDate }}</td><td>{{ trip.estimate }}</td><td><span class="status">{{ trip.status }}</span></td><td><NuxtLink :to="`/atasan/perjalanan-tim/${trip.id}`" class="detail-link">Detail</NuxtLink></td></tr>
          </tbody>
        </table>
      </div>
    </section>

    <section class="panel schedule-panel">
      <div class="panel-heading"><div><h2>Jadwal Perjalanan Terdekat</h2><p>Agenda perjalanan tim yang akan datang.</p></div></div>
      <div class="empty-schedule">Belum ada jadwal yang dapat ditampilkan.</div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

definePageMeta({ layout: 'atasan' })

interface TeamTrip {
  id: string
  employee: string
  destination: string
  departure: string
  returnDate: string
  estimate: string
  status: string
  department: string
}

const trips = ref<TeamTrip[]>([])
const search = ref('')
const status = ref('')
const period = ref('')
const department = ref('')
const filteredTrips = computed(() => trips.value.filter((trip) => {
  const query = search.value.toLocaleLowerCase()
  return (!query || `${trip.employee} ${trip.destination}`.toLocaleLowerCase().includes(query))
    && (!status.value || trip.status === status.value)
    && (!department.value || trip.department === department.value)
}))
</script>

<style scoped>
.atasan-page { min-height: calc(100vh - 70px); padding: 26px 28px; background: #f5f6f8; }
.breadcrumb { display: flex; gap: 9px; margin-bottom: 8px; color: #8792a3; font-size: 11px; }
.breadcrumb a, .detail-link { color: var(--primary); }
.breadcrumb strong { color: var(--text); font-weight: 600; }
.page-header { display: flex; align-items: flex-end; justify-content: space-between; gap: 18px; margin-bottom: 18px; }
.page-header h1 { margin: 0; color: var(--text); font-size: 24px; }
.page-header p, .panel-heading p { margin: 6px 0 0; color: var(--text-muted); font-size: 12px; }
.period-control { display: flex; flex-direction: column; gap: 6px; color: var(--text-muted); font-size: 11px; }
.period-control select, .filters input, .filters select { min-height: 38px; padding: 0 11px; border: 1px solid var(--border); border-radius: 7px; background: #fff; color: var(--text); font: inherit; font-size: 11px; }
.metrics { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 14px; margin: 18px 0; }
.panel { padding: 18px; border: 1px solid var(--border); border-radius: 10px; background: var(--white); }
.filters { display: grid; grid-template-columns: minmax(220px, 1.4fr) repeat(2, minmax(160px, 1fr)); gap: 10px; margin-bottom: 16px; }
.filters input, .filters select { width: 100%; }
.table-wrap { overflow-x: auto; }
table { width: 100%; min-width: 920px; border-collapse: collapse; text-align: left; }
th { padding: 11px 9px; background: #f8fafc; color: #788397; font-size: 10px; font-weight: 600; }
td { padding: 13px 9px; border-bottom: 1px solid #edf0f4; color: var(--text); font-size: 11px; }
.empty-cell { height: 100px; color: var(--text-muted); text-align: center; }
.status { padding: 5px 8px; border-radius: 20px; background: #eaf0ff; color: #315bb5; font-size: 10px; white-space: nowrap; }
.detail-link { font-size: 11px; font-weight: 600; }
.schedule-panel { margin-top: 16px; }
.panel-heading h2 { margin: 0; color: var(--text); font-size: 14px; }
.empty-schedule { padding: 14px 0 5px; color: var(--text-muted); font-size: 11px; }
.sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0; }
@media (max-width: 1050px) { .metrics { grid-template-columns: repeat(2, minmax(0, 1fr)); } .filters { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
@media (max-width: 650px) { .atasan-page { padding: 18px 15px; } .page-header { align-items: flex-start; flex-direction: column; } .page-header h1 { font-size: 21px; } .filters { grid-template-columns: 1fr; } }
@media (max-width: 390px) { .metrics { grid-template-columns: 1fr; } }
</style>
