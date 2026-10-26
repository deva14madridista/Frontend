<template>
  <div class="atasan-page">
    <div class="breadcrumb"><NuxtLink to="/atasan/dashboard">Dashboard</NuxtLink><span>›</span><NuxtLink to="/atasan/perjalanan-tim">Perjalanan Tim</NuxtLink><span>›</span><strong>Detail</strong></div>
    <header class="page-header"><div><p class="eyebrow">ID Perjalanan: {{ tripId }}</p><h1>Detail Perjalanan Tim</h1></div><span class="status">Status belum tersedia</span></header>
    <AtasanDataNotice message="Detail perjalanan belum dapat dimuat karena API perjalanan tim belum tersedia. Data tidak dibuat dari contoh." />
    <section class="panel">
      <h2>Informasi Pegawai dan Perjalanan</h2>
      <dl class="info-grid">
        <div><dt>Nama Pegawai</dt><dd>—</dd></div><div><dt>Departemen</dt><dd>—</dd></div>
        <div><dt>Tujuan</dt><dd>—</dd></div><div><dt>Status Pelaksanaan</dt><dd>—</dd></div>
        <div><dt>Tanggal Berangkat</dt><dd>—</dd></div><div><dt>Tanggal Kembali</dt><dd>—</dd></div>
        <div><dt>Estimasi Biaya</dt><dd>—</dd></div><div><dt>Transportasi / Penginapan</dt><dd>—</dd></div>
        <div class="wide"><dt>Keperluan Perjalanan</dt><dd>—</dd></div>
      </dl>
      <NuxtLink to="/atasan/perjalanan-tim" class="back-link">Kembali ke Perjalanan Tim</NuxtLink>
    </section>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'atasan' })
const route = useRoute()
const tripId = computed(() => String(route.params.id ?? ''))
</script>

<style scoped>
.atasan-page { min-height: calc(100vh - 70px); padding: 26px 28px; background: #f5f6f8; }
.breadcrumb { display: flex; flex-wrap: wrap; gap: 9px; margin-bottom: 8px; color: #8792a3; font-size: 11px; }
.breadcrumb a, .back-link { color: var(--primary); }
.breadcrumb strong { color: var(--text); font-weight: 600; }
.page-header { display: flex; align-items: center; justify-content: space-between; gap: 15px; margin-bottom: 18px; }
.eyebrow { margin: 0 0 5px; color: var(--text-muted); font-size: 11px; }
h1 { margin: 0; color: var(--text); font-size: 24px; }
.status { padding: 7px 10px; border-radius: 20px; background: #edf1f7; color: #667085; font-size: 10px; }
.panel { margin-top: 16px; padding: 20px; border: 1px solid var(--border); border-radius: 10px; background: #fff; }
.panel h2 { margin: 0 0 20px; color: var(--text); font-size: 14px; }
.info-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 20px; }
dt { color: var(--text-muted); font-size: 10px; }
dd { margin: 6px 0 0; color: var(--text); font-size: 12px; }
.wide { grid-column: 1 / -1; }
.back-link { display: inline-flex; margin-top: 24px; font-size: 11px; font-weight: 600; }
@media (max-width: 650px) { .atasan-page { padding: 18px 15px; } .page-header { align-items: flex-start; flex-direction: column; } h1 { font-size: 21px; } }
</style>
