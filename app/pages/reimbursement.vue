<template>
  <div class="reimbursement-page">

    <!-- Breadcrumb -->
    <div class="breadcrumb">
      <NuxtLink to="/dashboard">Dashboard</NuxtLink>
      <span>›</span>
      <NuxtLink to="/reimbursement">Reimbursement</NuxtLink>
      <span>›</span>
      <strong>Ajukan Baru</strong>
    </div>

    <!-- Header -->
    <div class="page-header">
      <h1>Pengajuan Reimbursement</h1>

      <LayoutPageactions />
    </div>

    <!-- Form Card -->
    <div class="form-card">

      <h2>Formulir Klaim Pengeluaran</h2>

      <form @submit.prevent="submitForm">

        <!-- Perjalanan + Tanggal -->
        <div class="form-row">

          <div class="form-group">
            <label>
              Pilih Perjalanan
              <span>*</span>
            </label>

            <select v-model="form.trip">
              <option value="Jakarta - Bandung (12 Mei 2026)">
                Jakarta - Bandung (12 Mei 2026)
              </option>

              <option value="Jakarta - Surabaya (20 Mei 2026)">
                Jakarta - Surabaya (20 Mei 2026)
              </option>

              <option value="Jakarta - Yogyakarta (25 Mei 2026)">
                Jakarta - Yogyakarta (25 Mei 2026)
              </option>
            </select>
          </div>

          <div class="form-group">
            <label>
              Tanggal Pengeluaran
              <span>*</span>
            </label>

            <input
              v-model="form.date"
              type="date"
            />
          </div>

        </div>

        <!-- Kategori -->
        <div class="form-group full">
          <label>
            Kategori Pengeluaran
            <span>*</span>
          </label>

          <select v-model="form.category">
            <option value="Penginapan">Penginapan</option>
            <option value="Transportasi">Transportasi</option>
            <option value="Makanan">Makanan</option>
            <option value="Tiket">Tiket</option>
            <option value="Lainnya">Lainnya</option>
          </select>
        </div>

        <!-- Deskripsi -->
        <div class="form-group full">
          <label>
            Deskripsi
            <span>*</span>
          </label>

          <textarea
            v-model="form.description"
            placeholder="Masukkan deskripsi pengeluaran"
          ></textarea>
        </div>

        <!-- Jumlah + Upload -->
        <div class="form-row">

          <div class="form-group">
            <label>
              Jumlah
              <span>*</span>
            </label>

            <input
              v-model="form.amount"
              type="text"
              placeholder="Rp 0"
            />
          </div>

          <div class="form-group">
            <label>
              Upload Bukti
              <span>*</span>
            </label>

            <div class="upload-area">

              <label class="file-button">
                Pilih File

                <input
                  type="file"
                  accept=".jpg,.jpeg,.png,.pdf"
                  @change="handleFile"
                />
              </label>

              <div
                v-if="form.file"
                class="file-name"
              >
                <span>{{ form.file.name }}</span>

                <button
                  type="button"
                  @click="removeFile"
                >
                  ×
                </button>
              </div>

              <span
                v-else
                class="no-file"
              >
                Belum ada file dipilih
              </span>

            </div>
          </div>

        </div>

        <!-- Divider -->
        <div class="divider"></div>

        <!-- Actions -->
        <div class="form-actions">

          <button
            type="button"
            class="cancel-button"
            @click="cancelForm"
          >
            Batal
          </button>

          <button
            type="submit"
            class="submit-button"
          >
            Kirim
          </button>

        </div>

      </form>

    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'

const form = ref({
  trip: 'Jakarta - Bandung (12 Mei 2026)',
  date: '2026-05-13',
  category: 'Penginapan',
  description: 'Biaya hotel selama perjalanan dinas',
  amount: 'Rp 750.000',
  file: null
})

const handleFile = (event) => {
  const file = event.target.files[0]

  if (file) {
    form.value.file = file
  }
}

const removeFile = () => {
  form.value.file = null
}

const submitForm = () => {
  console.log('Data reimbursement:', form.value)

  alert('Pengajuan reimbursement berhasil dikirim.')
}

const cancelForm = () => {
  form.value = {
    trip: 'Jakarta - Bandung (12 Mei 2026)',
    date: '2026-05-13',
    category: 'Penginapan',
    description: 'Biaya hotel selama perjalanan dinas',
    amount: 'Rp 750.000',
    file: null
  }
}
</script>

<style scoped>
/* =========================
   PAGE
========================= */

.reimbursement-page {
  width: 100%;
  min-height: calc(100vh - 70px);

  padding: 24px 28px;

  background: #f5f6f8;
}

/* =========================
   BREADCRUMB
========================= */

.breadcrumb {
  display: flex;
  align-items: center;

  gap: 8px;

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
  flex-wrap: wrap;
  gap: 12px;

  margin-bottom: 24px;
}

.page-header h1 {
  margin: 0;

  font-size: 23px;

  font-weight: 700;

  color: var(--text);
}

/* =========================
   FORM CARD
========================= */

.form-card {
  padding: 24px;

  background: var(--white);

  border: 1px solid var(--border);

  border-radius: 11px;
}

.form-card h2 {
  margin: 0 0 22px;

  font-size: 14px;

  font-weight: 700;

  color: var(--text);
}

/* =========================
   FORM
========================= */

form {
  display: flex;
  flex-direction: column;

  gap: 18px;
}

.form-row {
  display: grid;

  grid-template-columns: 1fr 1fr;

  gap: 18px;
}

.form-group {
  display: flex;

  flex-direction: column;

  gap: 7px;
}

.form-group.full {
  width: 100%;
}

.form-group label {
  font-size: 9px;

  font-weight: 600;

  color: #667085;
}

.form-group label span {
  color: #ef4444;
}

/* =========================
   INPUT
========================= */

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;

  box-sizing: border-box;

  border: 1px solid #dce2eb;

  border-radius: 6px;

  background: var(--white);

  color: var(--text);

  font-family: inherit;

  font-size: 10px;

  outline: none;

  transition: 0.2s;
}

.form-group input,
.form-group select {
  height: 32px;

  padding: 0 10px;
}

.form-group textarea {
  min-height: 74px;

  padding: 10px;

  resize: vertical;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  border-color: var(--primary);
}

.form-group input::placeholder,
.form-group textarea::placeholder {
  color: #a6afbd;
}

/* =========================
   UPLOAD
========================= */

.upload-area {
  min-height: 32px;

  display: flex;

  align-items: center;

  gap: 8px;
}

.file-button {
  position: relative;

  height: 32px;

  display: flex;

  align-items: center;

  padding: 0 12px;

  box-sizing: border-box;

  border-radius: 6px;

  background: #f1f3f6;

  color: #4b5563;

  font-size: 9px;

  font-weight: 600;

  cursor: pointer;
}

.file-button input {
  position: absolute;

  width: 1px;
  height: 1px;

  opacity: 0;

  pointer-events: none;
}

.file-name {
  height: 28px;

  display: flex;

  align-items: center;

  gap: 7px;

  padding: 0 8px;

  border-radius: 5px;

  background: #edf3ff;

  color: var(--primary);

  font-size: 9px;
}

.file-name span {
  max-width: 120px;

  overflow: hidden;

  text-overflow: ellipsis;

  white-space: nowrap;
}

.file-name button {
  padding: 0;

  border: none;

  background: transparent;

  color: #ef4444;

  font-size: 14px;

  line-height: 1;

  cursor: pointer;
}

.no-file {
  font-size: 9px;

  color: #9aa4b5;
}

/* =========================
   DIVIDER
========================= */

.divider {
  width: 100%;

  height: 1px;

  background: #e5e8ee;

  margin-top: 2px;
}

/* =========================
   ACTION
========================= */

.form-actions {
  display: flex;

  align-items: center;

  justify-content: flex-end;

  gap: 10px;
}

.form-actions button {
  height: 31px;

  padding: 0 16px;

  border-radius: 6px;

  font-family: inherit;

  font-size: 9px;

  font-weight: 600;

  cursor: pointer;
}

.cancel-button {
  border: 1px solid var(--primary);

  background: var(--white);

  color: var(--primary);
}

.cancel-button:hover {
  background: #f4f7ff;
}

.submit-button {
  border: 1px solid var(--primary);

  background: var(--primary);

  color: var(--white);
}

.submit-button:hover {
  opacity: 0.9;
}

/* =========================
   RESPONSIVE
========================= */

@media (max-width: 767px) {
  .reimbursement-page {
    padding: 16px;
  }

  .page-header h1 {
    font-size: 20px;
  }

  .form-card {
    padding: 16px;
  }

  .form-card h2 {
    font-size: 15px;
    margin-bottom: 16px;
  }

  .form-row {
    grid-template-columns: 1fr;
    gap: 14px;
  }

  .form-group label {
    font-size: 11px;
  }

  .form-group input,
  .form-group select {
    height: 40px;

    font-size: 16px;
  }

  .form-group textarea {
    font-size: 16px;
  }

  .upload-area {
    flex-wrap: wrap;
    align-items: flex-start;
  }

  .file-button,
  .no-file,
  .file-name {
    font-size: 11px;
  }

  .file-button {
    height: 40px;
    padding: 0 14px;
  }

  .file-name span {
    max-width: 180px;
  }

  .form-actions {
    justify-content: stretch;
    gap: 8px;
  }

  .form-actions button {
    flex: 1;

    height: 44px;

    font-size: 13px;
  }
}

@media (max-width: 374px) {
  .reimbursement-page {
    padding: 12px;
  }

  .form-card {
    padding: 14px;
  }
}
</style>