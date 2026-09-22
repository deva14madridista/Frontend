<template>
  <div class="travel-summary">

    <div class="summary-header">
      <div>
        <h2>Ringkasan Perjalanan</h2>
        <p>Jumlah perjalanan sepanjang tahun 2026</p>
      </div>

      <button class="more-button">
        •••
      </button>
    </div>

    <div class="chart">

      <div
        v-for="item in monthlyData"
        :key="item.month"
        class="chart-item"
      >

        <div class="bar-area">
          <div
            class="bar"
            :style="{ height: `${item.value * 12}px` }"
          ></div>
        </div>

        <span class="month">
          {{ item.month }}
        </span>

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
  flex: 1;

  padding: 20px;

  background: var(--white);
  border: 1px solid var(--border);
  border-radius: 12px;
}

/* HEADER */

.summary-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}

.summary-header h2 {
  margin: 0;

  font-size: 16px;
  font-weight: 600;
  color: var(--text);
}

.summary-header p {
  margin: 5px 0 0;

  font-size: 11px;
  color: var(--text-muted);
}

.more-button {
  border: none;
  background: transparent;

  font-size: 16px;
  color: var(--text-muted);

  cursor: pointer;
}

/* CHART */

.chart {
  height: 180px;

  margin-top: 24px;

  display: flex;
  align-items: flex-end;
  gap: 12px;
}

.chart-item {
  flex: 1;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;

  gap: 8px;
}

.bar-area {
  width: 100%;
  height: 140px;

  display: flex;
  align-items: flex-end;
  justify-content: center;
}

.bar {
  width: 18px;

  max-height: 140px;

  background: var(--primary);

  border-radius: 5px 5px 0 0;

  transition: height 0.2s ease;
}

.month {
  font-size: 10px;
  color: var(--text-muted);
}
</style>