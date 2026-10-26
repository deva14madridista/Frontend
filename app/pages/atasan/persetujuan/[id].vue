<template>
  <div class="atasan-page">
    <div class="breadcrumb">
      <NuxtLink to="/atasan/dashboard">Dashboard</NuxtLink><span>›</span>
      <NuxtLink to="/atasan/persetujuan">Persetujuan</NuxtLink><span>›</span>
      <strong>Detail Pengajuan</strong>
    </div>

    <header class="page-header">
      <div>
        <p class="eyebrow">ID Pengajuan: {{ requestId }}</p>
        <h1>Detail Pengajuan Perjalanan</h1>
        <p>Tinjau informasi pengajuan sebelum memberikan keputusan.</p>
      </div>
      <span class="status">Status belum tersedia</span>
    </header>

    <AtasanDataNotice message="Detail pengajuan tidak dapat dimuat karena API pengajuan belum tersedia. Tidak ada keputusan yang dikirim atau disimpan." />

    <div class="detail-grid">
      <section class="panel">
        <h2>Informasi Pegawai dan Perjalanan</h2>
        <dl class="info-grid">
          <div><dt>Nama Pegawai</dt><dd>—</dd></div>
          <div><dt>NIP</dt><dd>—</dd></div>
          <div><dt>Departemen</dt><dd>—</dd></div>
          <div><dt>Jabatan</dt><dd>—</dd></div>
          <div><dt>Tujuan Perjalanan</dt><dd>—</dd></div>
          <div><dt>Durasi</dt><dd>—</dd></div>
          <div><dt>Tanggal Keberangkatan</dt><dd>—</dd></div>
          <div><dt>Tanggal Kembali</dt><dd>—</dd></div>
          <div class="wide"><dt>Keperluan Perjalanan</dt><dd>—</dd></div>
          <div><dt>Transportasi</dt><dd>—</dd></div>
          <div><dt>Penginapan</dt><dd>—</dd></div>
        </dl>
      </section>

      <div class="side-column">
        <section class="panel">
          <h2>Estimasi Biaya</h2>
          <dl class="cost-list">
            <div><dt>Transportasi</dt><dd>—</dd></div>
            <div><dt>Penginapan</dt><dd>—</dd></div>
            <div><dt>Konsumsi</dt><dd>—</dd></div>
            <div><dt>Lainnya</dt><dd>—</dd></div>
            <div class="total"><dt>Total Estimasi</dt><dd>—</dd></div>
          </dl>
          <p class="cost-note">Nilai estimasi belum tersedia.</p>
        </section>

        <section class="panel">
          <h2>Informasi Pengajuan</h2>
          <dl class="cost-list">
            <div><dt>Pemohon</dt><dd>—</dd></div>
            <div><dt>Waktu Pengajuan</dt><dd>—</dd></div>
            <div><dt>Atasan Peninjau</dt><dd>—</dd></div>
            <div><dt>Status Keputusan</dt><dd>Belum tersedia</dd></div>
          </dl>
        </section>
      </div>

      <section class="panel decision-panel">
        <h2>Keputusan Atasan</h2>
        <label for="decision-note">Catatan keputusan</label>
        <textarea id="decision-note" v-model="note" rows="4" placeholder="Tuliskan catatan untuk pengajuan ini..." disabled></textarea>
        <p class="decision-note">Aksi persetujuan dinonaktifkan hingga detail pengajuan dan endpoint keputusan tersedia.</p>
        <div class="actions">
          <button type="button" class="reject-button" disabled>Tolak Pengajuan</button>
          <button type="button" class="approve-button" disabled>Setujui Pengajuan</button>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

definePageMeta({ layout: 'atasan' })

const route = useRoute()
const requestId = computed(() => String(route.params.id ?? ''))
const note = ref('')
</script>

<style scoped>
.atasan-page { min-height: calc(100vh - 70px); padding: 26px 28px; background: #f5f6f8; }
.breadcrumb { display: flex; flex-wrap: wrap; gap: 9px; margin-bottom: 8px; color: #8792a3; font-size: 11px; }
.breadcrumb a { color: var(--primary); }
.breadcrumb strong { color: var(--text); font-weight: 600; }
.page-header { display: flex; align-items: center; justify-content: space-between; gap: 16px; margin-bottom: 18px; }
.page-header h1 { margin: 3px 0 6px; color: var(--text); font-size: 24px; }
.page-header p { margin: 0; color: var(--text-muted); font-size: 12px; }
.eyebrow { color: var(--text-muted); font-size: 11px !important; }
.status { padding: 7px 10px; border-radius: 20px; background: #edf1f7; color: #667085; font-size: 10px; white-space: nowrap; }
.detail-grid { display: grid; grid-template-columns: minmax(0, 1.35fr) minmax(270px, 0.8fr); gap: 16px; margin-top: 16px; }
.panel { min-width: 0; padding: 19px; border: 1px solid var(--border); border-radius: 10px; background: var(--white); }
.panel h2 { margin: 0 0 18px; color: var(--text); font-size: 14px; }
.info-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 18px 20px; }
dt { color: var(--text-muted); font-size: 10px; }
dd { margin: 6px 0 0; color: var(--text); font-size: 12px; font-weight: 500; }
.wide { grid-column: 1 / -1; }
.side-column { display: grid; gap: 16px; align-content: start; }
.cost-list { display: grid; gap: 13px; }
.cost-list > div { display: flex; justify-content: space-between; gap: 12px; }
.cost-list dd { margin: 0; }
.cost-list .total { padding-top: 13px; border-top: 1px solid var(--border); font-weight: 700; }
.cost-list .total dt, .cost-list .total dd { color: var(--text); font-weight: 700; }
.cost-note, .decision-note { margin: 13px 0 0; color: var(--text-muted); font-size: 10px; line-height: 1.5; }
.decision-panel { grid-column: 1 / -1; }
.decision-panel label { display: block; margin-bottom: 7px; color: var(--text); font-size: 11px; font-weight: 600; }
textarea { width: 100%; resize: vertical; padding: 11px; border: 1px solid var(--border); border-radius: 7px; background: #f8fafc; color: var(--text); font: inherit; font-size: 11px; }
.actions { display: flex; justify-content: flex-end; gap: 10px; margin-top: 16px; }
.actions button { min-height: 39px; padding: 0 15px; border-radius: 7px; font: inherit; font-size: 11px; font-weight: 600; }
.reject-button { border: 1px solid #efc7c7; background: #fff7f7; color: #b42318; }
.approve-button { border: 1px solid var(--primary); background: var(--primary); color: #fff; }
.actions button:disabled { cursor: not-allowed; opacity: 0.55; }
@media (max-width: 900px) { .detail-grid { grid-template-columns: 1fr; } .decision-panel { grid-column: auto; } .side-column { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
@media (max-width: 650px) { .atasan-page { padding: 18px 15px; } .page-header { align-items: flex-start; flex-direction: column; } .page-header h1 { font-size: 21px; } .side-column { grid-template-columns: 1fr; } .info-grid { gap: 15px; } .actions { flex-direction: column-reverse; } .actions button { width: 100%; min-height: 44px; } }
</style>
