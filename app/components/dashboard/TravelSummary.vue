<template>
  <div class="travel-summary">
    <div class="summary-header">
      <h2>Ringkasan Perjalanan Tahun 2026</h2>

      <button class="more-button">•••</button>
    </div>

    <div class="chart">
      <div
        v-for="item in monthlyData"
        :key="item.month"
        class="chart-item"
      >
        <div class="bar-wrapper">
          <div
            class="bar"
            :style="{ height: item.value * 10 + 'px' }"
          ></div>
        </div>

        <span class="month">{{ item.month }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
const monthlyData = [
  { month: 'Jan', value: 2 },
  { month: 'Feb', value: 4 },
  { month: 'Mar', value: 5 },
  { month: 'Apr', value: 3 },
  { month: 'Mei', value: 7 },
  { month: 'Jun', value: 4 },
  { month: 'Jul', value: 8 },
  { month: 'Agt', value: 5 },
  { month: 'Sep', value: 6 },
  { month: 'Okt', value: 5 },
  { month: 'Nov', value: 4 },
  { month: 'Des', value: 7 }
]
</script>

<style scoped>
.travel-summary {
  background: var(--white);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 20px;
  flex: 1;
}

.summary-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.summary-header h2 {
  margin: 0;
  font-size: 16px;
  color: var(--text);
}

.more-button {
  border: none;
  background: transparent;
  color: var(--text-muted);
  cursor: pointer;
  font-size: 16px;
}

.chart {
  height: 170px;
  margin-top: 25px;

  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 10px;
}

.chart-item {
  height: 100%;
  flex: 1;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
}

.bar-wrapper {
  height: 130px;

  display: flex;
  align-items: flex-end;
}

.bar {
  width: 20px;
  background: var(--primary);
  border-radius: 4px 4px 0 0;
}

.month {
  font-size: 10px;
  color: var(--text-muted);
}
</style>