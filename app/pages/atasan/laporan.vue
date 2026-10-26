<template>
  <div class="atasan-page">
    <div class="breadcrumb"><NuxtLink to="/atasan/dashboard">Dashboard</NuxtLink><span>›</span><strong>Laporan</strong></div>

    <header class="page-header">
      <div><h1>Laporan Perjalanan Tim</h1><p>Ringkasan perjalanan dan estimasi biaya tim Anda.</p></div>
      <div class="header-actions">
        <label class="period-control"><span>Periode</span><select v-model="period" aria-label="Periode laporan"><option value="">Semua periode</option><option value="month">Bulan ini</option><option value="quarter">Kuartal ini</option><option value="year">Tahun ini</option></select></label>
        <button class="export-button" type="button" disabled title="Ekspor tersedia setelah API laporan terhubung">Ekspor Laporan</button>
      </div>
    </header>

    <AtasanDataNotice message="Laporan memerlukan API perjalanan tim dan ringkasan biaya. Estimasi maupun biaya aktual tidak direka atau dihitung dari data contoh." />

    <section class="metrics">
      <AtasanMetricCard title="Total Perjalanan" value="—" icon="▤" />
      <AtasanMetricCard title="Perjalanan Selesai" value="—" icon="✓" />
      <AtasanMetricCard title="Perjalanan Berlangsung" value="—" icon="➤" />
      <AtasanMetricCard title="Total Estimasi Biaya" value="—" icon="Rp" />
    </section>

    <section class="charts">
      <article class="panel chart-panel">
        <div class="panel-heading"><div><h2>Perjalanan per Bulan</h2><p>Jumlah perjalanan berdasarkan periode.</p></div></div>
        <div class="chart-empty">Grafik akan ditampilkan setelah data laporan tersedia.</div>
      </article>
      <article class="panel chart-panel">
        <div class="panel-heading"><div><h2>Distribusi Status Perjalanan</h2><p>Ringkasan status perjalanan tim.</p></div></div>
        <div class="chart-empty">Belum ada data status untuk diringkas.</div>
      </article>
    </section>

    <section class="panel cost-panel">
      <div class="panel-heading"><div><h2>Ringkasan Biaya</h2><p>Biaya yang ditampilkan adalah estimasi; data realisasi belum tersedia.</p></div></div>
      <div class="cost-empty">Rincian estimasi per kategori atau departemen belum tersedia.</div>
    </section>

    <section class="panel report-panel">
      <div class="panel-heading"><div><h2>Rincian Perjalanan</h2><p>Data perjalanan tim sesuai periode dan status terpilih.</p></div></div>
      <div class="filters">
        <label><span class="sr-only">Cari pegawai atau tujuan</span><input v-model="search" type="search" placeholder="Cari pegawai atau tujuan" /></label>
        <select v-model="status" aria-label="Status laporan"><option value="">Semua status</option><option value="Menunggu keberangkatan">Menunggu keberangkatan</option><option value="Berlangsung">Berlangsung</option><option value="Selesai">Selesai</option></select>
      </div>
      <div class="table-wrap">
        <table>
          <thead><tr><th>ID Perjalanan</th><th>Nama Pegawai</th><th>Departemen</th><th>Tujuan</th><th>Tanggal Perjalanan</th><th>Estimasi Biaya</th><th>Status</th><th>Aksi</th></tr></thead>
          <tbody>
            <tr v-if="filteredTrips.length === 0"><td colspan="8" class="empty-cell">{{ search || status ? 'Tidak ada laporan yang cocok dengan filter.' : 'Belum ada laporan perjalanan untuk ditampilkan.' }}</td></tr>
            <tr v-for="trip in filteredTrips" :key="trip.id"><td>{{ trip.id }}</td><td>{{ trip.employee }}</td><td>{{ trip.department }}</td><td>{{ trip.destination }}</td><td>{{ trip.date }}</td><td>{{ trip.estimate }}</td><td><span class="status">{{ trip.status }}</span></td><td><NuxtLink :to="`/atasan/perjalanan-tim/${trip.id}`" class="detail-link">Detail</NuxtLink></td></tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

definePageMeta({ layout: 'atasan' })

interface ReportTrip {
  id: string
  employee: string
  department: string
  destination: string
  date: string
  estimate: string
  status: string
}

const trips = ref<ReportTrip[]>([])
const period = ref('')
const status = ref('')
const search = ref('')
const filteredTrips = computed(() => trips.value.filter((trip) => {
  const query = search.value.toLocaleLowerCase()
  return (!query || `${trip.employee} ${trip.destination}`.toLocaleLowerCase().includes(query))
    && (!status.value || trip.status === status.value)
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
.header-actions { display: flex; align-items: flex-end; gap: 10px; }
.period-control { display: flex; flex-direction: column; gap: 6px; color: var(--text-muted); font-size: 11px; }
.period-control select, .filters input, .filters select { min-height: 38px; padding: 0 11px; border: 1px solid var(--border); border-radius: 7px; background: #fff; color: var(--text); font: inherit; font-size: 11px; }
.export-button { min-height: 38px; padding: 0 13px; border: 1px solid var(--primary); border-radius: 7px; background: var(--primary); color: #fff; font: inherit; font-size: 11px; font-weight: 600; }
.export-button:disabled { cursor: not-allowed; opacity: 0.55; }
.metrics { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 14px; margin: 18px 0; }
.charts { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px; }
.panel { min-width: 0; padding: 18px; border: 1px solid var(--border); border-radius: 10px; background: #fff; }
.panel-heading { margin-bottom: 15px; }
.panel-heading h2 { margin: 0; color: var(--text); font-size: 14px; }
.chart-empty { display: grid; min-height: 160px; place-items: center; padding: 18px; border: 1px dashed #d9e0ea; border-radius: 8px; color: var(--text-muted); font-size: 11px; text-align: center; }
.cost-panel, .report-panel { margin-top: 16px; }
.cost-empty { padding: 16px 0 4px; color: var(--text-muted); font-size: 11px; }
.filters { display: grid; grid-template-columns: minmax(220px, 1.4fr) minmax(160px, 0.7fr); gap: 10px; margin-bottom: 15px; }
.filters input, .filters select { width: 100%; }
.table-wrap { overflow-x: auto; }
table { width: 100%; min-width: 900px; border-collapse: collapse; text-align: left; }
th { padding: 11px 9px; background: #f8fafc; color: #788397; font-size: 10px; font-weight: 600; }
td { padding: 13px 9px; border-bottom: 1px solid #edf0f4; color: var(--text); font-size: 11px; }
.empty-cell { height: 105px; color: var(--text-muted); text-align: center; }
.status { padding: 5px 8px; border-radius: 20px; background: #edf1f7; color: #667085; font-size: 10px; white-space: nowrap; }
.detail-link { font-size: 11px; font-weight: 600; }
.sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0; }
@media (max-width: 1050px) { .metrics { grid-template-columns: repeat(2, minmax(0, 1fr)); } .charts { grid-template-columns: 1fr; } }
@media (max-width: 650px) { .atasan-page { padding: 18px 15px; } .page-header { align-items: flex-start; flex-direction: column; } .page-header h1 { font-size: 21px; } .header-actions { width: 100%; align-items: stretch; flex-direction: column; } .filters { grid-template-columns: 1fr; } }
@media (max-width: 390px) { .metrics { grid-template-columns: 1fr; } }
</style>
