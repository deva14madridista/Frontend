<template>
  <div class="upcoming-trips">

    <div class="section-header">
      <h2>Perjalanan Mendatang</h2>
      <a href="#">Lihat Semua</a>
    </div>

    <div class="trip-list">

      <div
        v-for="trip in trips"
        :key="trip.id"
        class="trip-item"
      >
        <div class="trip-top">
          <span class="route">
            {{ trip.route }}
          </span>

          <span class="date">
            {{ trip.date }}
          </span>
        </div>

        <p>{{ trip.description }}</p>
      </div>

    </div>

  </div>
</template>

<script setup>
const trips = [
  {
    id: 1,
    route: 'Jakarta - Bandung',
    date: '24 Jan 2026',
    description: 'Pertemuan dengan Direksi & Vendor lokal.'
  },
  {
    id: 2,
    route: 'Jakarta - Surabaya',
    date: '05 Feb 2026',
    description: 'Training regional & evaluasi kuartal.'
  }
]
</script>

<style scoped>
.upcoming-trips {
  width: 280px;
  padding: 20px;

  background: var(--white);
  border: 1px solid var(--border);
  border-radius: 12px;
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.section-header h2 {
  margin: 0;
  font-size: 16px;
  color: var(--text);
}

.section-header a {
  font-size: 11px;
  color: var(--primary);
  text-decoration: none;
}

.trip-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.trip-item {
  padding: 12px;
  background: #f6f7f9;
  border-radius: 8px;
}

.trip-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.route {
  padding: 4px 7px;
  background: #e8f0ff;
  border-radius: 4px;

  font-size: 10px;
  color: var(--primary);
}

.date {
  font-size: 9px;
  color: var(--text-muted);
}

.trip-item p {
  margin: 9px 0 0;
  font-size: 11px;
  line-height: 1.5;
  color: var(--text);
}
</style>