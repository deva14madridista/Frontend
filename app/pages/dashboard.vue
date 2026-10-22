<template>
  <div class="dashboard">

    <!-- Header -->
    <div class="dashboard-header">
      <div>
        <h1>Dashboard</h1>
        <p>Selamat datang kembali, Deva Fauzan Nuraqli</p>
      </div>

      <LayoutPageactions />
    </div>

    <!-- Summary Cards -->
    <div class="summary-grid">
      <DashboardSummaryCard
        title="Total Perjalanan"
        :value="12"
        icon="✈"
      />

      <DashboardSummaryCard
        title="Menunggu Persetujuan"
        :value="5"
        icon="◷"
      />

      <DashboardSummaryCard
        title="Dalam Perjalanan"
        :value="3"
        icon="➤"
      />

      <DashboardSummaryCard
        title="Selesai"
        :value="8"
        icon="✓"
      />
    </div>

    <!-- Chart & Upcoming Trips -->
    <div class="dashboard-middle">
      <DashboardTravelSummary />

      <DashboardUpcomingTrips />
    </div>

    <!-- Recent Activities -->
    <DashboardRecentActivities />

  </div>
</template>

<style scoped>
.dashboard {
  width: 100%;
  min-height: calc(100vh - 70px);
  padding: 28px;
  background: #f5f6f8;
}

/* =========================
   HEADER
========================= */

.dashboard-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 24px;
}

.dashboard-header > div {
  min-width: 0;
}

.dashboard-header h1 {
  margin: 0;
  font-size: 24px;
  font-weight: 700;
  color: var(--text);
}

.dashboard-header p {
  margin: 5px 0 0;
  font-size: 12px;
  color: var(--text-muted);
}

/* =========================
   SUMMARY CARDS
========================= */

.summary-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;
}

/* =========================
   MIDDLE SECTION
========================= */

.dashboard-middle {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  margin-top: 24px;
}

.dashboard-middle > :first-child {
  flex: 1;
  min-width: 0;
}

/* =========================
   RESPONSIVE
========================= */

@media (max-width: 1023px) {
  .dashboard {
    padding: 22px;
  }

  .summary-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .dashboard-middle {
    flex-direction: column;
    align-items: stretch;
  }
}

@media (max-width: 700px) {
  .dashboard {
    padding: 16px;
  }

  .dashboard-header {
    align-items: flex-start;
    flex-wrap: wrap;
    gap: 12px;
    margin-bottom: 18px;
  }

  .dashboard-header h1 {
    font-size: 21px;
  }

  .header-actions button {
    width: 34px;
    height: 34px;
  }

  .summary-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 12px;
  }

  .dashboard-middle {
    gap: 12px;
    margin-top: 18px;
  }
}

@media (max-width: 540px) {
  .summary-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 374px) {
  .dashboard {
    padding: 12px;
  }
}
</style>