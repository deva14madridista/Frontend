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
  min-height: 100vh;
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
  margin-bottom: 24px;
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
  gap: 16px;
  margin-top: 24px;
}

.dashboard-middle > :first-child {
  flex: 1;
}

/* =========================
   RESPONSIVE
========================= */

@media (max-width: 1000px) {
  .summary-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 700px) {
  .dashboard {
    padding: 16px;
  }

  .dashboard-header {
    align-items: flex-start;
  }

  .dashboard-header h1 {
    font-size: 21px;
  }

  .header-actions button {
    width: 34px;
    height: 34px;
  }

  .summary-grid {
    grid-template-columns: 1fr;
  }

  .dashboard-middle {
    flex-direction: column;
  }
}
</style>