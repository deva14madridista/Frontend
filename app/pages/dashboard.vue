<template>
  <div class="dashboard">
    <div class="dashboard-header">
      <div>
        <h1>Dashboard</h1>
        <p>Selamat datang kembali, Deva Fauzan</p>
      </div>
    </div>

    <div class="summary-grid">
      <DashboardSummaryCard
        title="Total Perjalanan"
        :value="12"
        icon="✈️"
      />

      <DashboardSummaryCard
        title="Menunggu Persetujuan"
        :value="5"
        icon="🕐"
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
    <div class="dashboard-middle">
      <DashboardTravelSummary />
      <DashboardUpcomingTrips />
    </div>
      <DashboardRecentActivities />
    
  </div>
</template>

<style scoped>
.dashboard {
  width: 100%;
}

.dashboard-header {
  margin-bottom: 24px;
}

.dashboard-header h1 {
  margin: 0;
  font-size: 28px;
  color: var(--text);
}

.dashboard-header p {
  margin: 4px 0 0;
  font-size: 13px;
  color: var(--text-muted);
}

.summary-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}
.dashboard-middle {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 280px;
  gap: 20px;
  margin-top: 24px;
}

</style>