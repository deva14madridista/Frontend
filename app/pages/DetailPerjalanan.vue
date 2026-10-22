<template>
  <div class="detail-page">
    <div class="breadcrumb">
      <NuxtLink to="/dashboard">Dashboard</NuxtLink>
      <span>›</span>
      <strong>Detail Perjalanan</strong>
    </div>

    <div class="page-header">
      <h1>Detail Perjalanan</h1>

      <LayoutPageactions />
    </div>

    <div class="placeholder-card">
      <p>
        Halaman detail perjalanan belum memiliki isi. Silakan lengkapi
        komponen sesuai kebutuhan tanpa mengubah rute ini.
      </p>

      <NuxtLink to="/perjalanan-dinas" class="back-link">
        Kembali ke Perjalanan Dinas
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped>
.detail-page {
  width: 100%;
  min-height: calc(100vh - 70px);
  padding: 24px 28px;
  background: #f5f6f8;
}

.breadcrumb {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
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

.placeholder-card {
  padding: 24px;

  background: var(--white);
  border: 1px solid var(--border);
  border-radius: 12px;
}

.placeholder-card p {
  margin: 0 0 16px;

  font-size: 13px;
  line-height: 1.6;
  color: var(--text-muted);
}

.back-link {
  display: inline-flex;
  align-items: center;

  min-height: 40px;
  padding: 0 16px;

  border-radius: 7px;

  background: var(--primary);
  color: var(--white);

  font-size: 13px;
  font-weight: 600;
}

@media (max-width: 767px) {
  .detail-page {
    padding: 16px;
  }

  .page-header h1 {
    font-size: 20px;
  }

  .placeholder-card {
    padding: 16px;
  }
}

@media (max-width: 374px) {
  .detail-page {
    padding: 12px;
  }
}
</style>
